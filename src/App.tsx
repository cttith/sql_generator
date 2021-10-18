import FilterRow from "./components/FilterRow";
import React, { useState, useRef, useEffect } from "react";
import { Operator } from "./data-models/Operator";
import { SessionTable } from "./resources/SessionTable";
import styles from "./App.module.css";
import SQLGenerator from "./components/SQLGenerator";
import { filterToSQL } from "./util/SQLGeneratorUtil";

/*
What identifying props can we hold in filter rows array
  - synthetic key
  - when we remove one of the rows, we need to remove only this one
    - (all other rows keep their column name and value and operator)

*/

export type FilterRowType = {
  [columns: string]: any;
  metadataName: string;
  operator: Operator;
  valueOne?: string;
  valueTwo?: string;
  syntheticKeyIndex: number;
};

export type FilterRowDropdownStates = {
  filterRow: FilterRowType[];
};

const first_readable_column = SessionTable.columns.find(
  column => column.displayName
);

const default_filter = {
  operator: Operator.EQUALS,
  metadataName: first_readable_column?.metadataName!
};

/*
Maybe all rows represented as an object?

*/
function App() {
  const syntheticIndex = useRef<number>(0);
  const [filterRows, setFilterRows] = useState<FilterRowDropdownStates>({
    filterRow: [
      {
        ...default_filter,
        syntheticKeyIndex: syntheticIndex.current
      }
    ]
  });

  const [sqlStatement, setSQLStatement] = useState<string>(
    "Your generated SQL statement here"
  );

  const removeRow = (index: number) => {
    if (filterRows.filterRow.length > 1) {
      const newRows = filterRows.filterRow.filter(
        row => row.syntheticKeyIndex !== index
      );
      setFilterRows({ filterRow: newRows });
    }
  };

  const addRow = () => {
    syntheticIndex.current += 1;
    const newRows = [
      ...filterRows.filterRow,
      {
       ...default_filter,
       syntheticKeyIndex: syntheticIndex.current
      }
    ];
    setFilterRows({ filterRow: newRows });
  };

  const resetFilter = () => {
    syntheticIndex.current += 1;
    setSQLStatement("Your generated SQL statement here");
    setFilterRows({
      filterRow: [
        { ...default_filter, syntheticKeyIndex: syntheticIndex.current }
      ]
    });
  };

  const generateSQL = () => {
    const sql = filterToSQL(filterRows);
    if (sql.length) {
      setSQLStatement(sql);
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(filterRows, null, 2));
  }, [filterRows]);

  return (
    <div className={styles.appContainer}>
    <h1> Search for Sessions </h1>
      {filterRows.filterRow.map(row => {
        return (
          <FilterRow
            removeRow={removeRow}
            index={row.syntheticKeyIndex}
            filterRows={filterRows}
            updateFilterRows={setFilterRows}
            key={row.syntheticKeyIndex}
          />
        );
      })}
      <button onClick={() => addRow()} className={styles.ctaBtn}>
        AND
      </button>
      <hr />
      <button
        className={styles.ctaBtn + " " + styles.searchBtn}
        onClick={() => generateSQL()}
      >
        {" "}
        Search{" "}
      </button>
      <button className={styles.resetBtn} onClick={() => resetFilter()}>
        Reset{" "}
      </button>
      <SQLGenerator sql={sqlStatement} />
    </div>
  );
}

export default App;
