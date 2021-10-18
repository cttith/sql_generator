import React, { useEffect, useState } from "react";
import { mockColumns } from "../resources/MockData";
import Dropdown from "./Dropdown";
import useDropdown from "../util/useDropdown";
import {
  Operator,
  STRING_OPERATORS,
  INTEGER_OPERATORS
} from "../data-models/Operator";
import { SessionTable } from "../resources/SessionTable";
import { DataType } from "../data-models/Column";
import styles from "./FilterRow.module.css";
import { FilterRowDropdownStates } from "../App";
import useInput from "../util/useInput";
import { updateFilterRow } from "../util/FilterRowUtil";

type FilterRowProps = {
  removeRow: Function;
  index: number;
  filterRows: FilterRowDropdownStates;
  updateFilterRows: Function;
};
/*

Render special FilterRow based on
- selected values of dropdown
- dropdown operator dependent on this as well
- how should we handle knowing dataType based on
    selected? Do we change prop to receive ANY
        or create two dropdowns
            one for operators, one for columns


*/
const FilterRow = (props: FilterRowProps) => {
  const { removeRow, index, filterRows, updateFilterRows } = props;

  const {
    // selectedIndex: selectedColumnIdx,
    selectedValue: selectedColumn,
    handleChange: handleColumnChange
  } = useDropdown({ defaultValue: mockColumns[0].metadataName });
  const {
    // selectedIndex: selectedOperatorIdx,
    selectedValue: selectedOperator,
    handleChange: handleOperatorChange
  } = useDropdown({ defaultValue: Operator.EQUALS });

  const { value: inputValueOne, handleChange: handleInputChangeOne } = useInput(
    { defaultValue: "" }
  );

  const { value: inputValueTwo, handleChange: handleInputChangeTwo } = useInput(
    { defaultValue: "" }
  );

  const [operators, setOperators] = useState<Operator[]>(STRING_OPERATORS);
  const [inputType, setInputType] = useState<string>("text");
  const [widthPct, setWidthPct] = useState<number>(35);

  // when new column is selected
  // could be string -> string
  // integer -> string
  // string -> integer
  // what should we do with inputted value?
  // if same dataType, preserve
  // if different, clear
  // what should we do with selected operator?
  // reset to first selected op found in op arr
  useEffect(() => {
    const dataType = SessionTable.columns.find((column) => column.metadataName === selectedColumn)?.dataType;
    let newOp = null;
    switch (dataType) {
        case DataType.STRING:
            setOperators(STRING_OPERATORS);
            setInputType("text");
            newOp = STRING_OPERATORS[0];
            break;
        case DataType.INTEGER:
            setOperators(INTEGER_OPERATORS);
            setInputType("number");
            newOp = INTEGER_OPERATORS[0];
            break;
        default:
            setOperators(STRING_OPERATORS);
            setInputType("text");
            newOp = STRING_OPERATORS[0];
            break;
    }
    const updatedOp = updateFilterRow(
      { ...filterRows },
      index,
      "operator",
      newOp
    );
    const updatedColumn = updateFilterRow(
      { ...updatedOp },
      index,
      "metadataName",
      selectedColumn
    );
    updateFilterRows(updatedColumn);
    handleOperatorChange(newOp);
  }, [selectedColumn]);

  useEffect(() => {
    const updatedOp = updateFilterRow(
      { ...filterRows },
      index,
      "operator",
      selectedOperator
    );
    if (selectedOperator === Operator.BETWEEN) setWidthPct(20);
    updateFilterRows(updatedOp);
  }, [selectedOperator]);

  useEffect(() => {
    const updatedValOne = updateFilterRow(
      { ...filterRows },
      index,
      "valueOne",
      inputValueOne
    );
    updateFilterRows(updatedValOne);
  }, [inputValueOne]);

  useEffect(() => {
    const updatedValTwo = updateFilterRow(
      { ...filterRows },
      index,
      "valueTwo",
      inputValueTwo
    );
    updateFilterRows(updatedValTwo);
  }, [inputValueTwo]);

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.FilterRowContainer}>
        <button className={styles.removeBtn} onClick={() => removeRow(index)}>
          X
        </button>
        <div className={styles.FilterRow}>
          <Dropdown
            handleChange={handleColumnChange}
            options={mockColumns}
            widthPct={35}
            selectedValue={selectedColumn}
          />
          {selectedOperator === Operator.BETWEEN && (
            <div className={styles.spanContainer}> is </div>
          )}
          <Dropdown
            handleChange={handleOperatorChange}
            options={operators}
            widthPct={widthPct}
            selectedValue={selectedOperator}
          />
          <div className={styles.inputContainer}>
            <input
              type={inputType}
              onChange={e => handleInputChangeOne(e.target.value)}
            />
            {selectedOperator === Operator.BETWEEN && (
              <>
                <div className={styles.spanContainer}> and </div>
                <input
                  type={inputType}
                  onChange={e => handleInputChangeTwo(e.target.value)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterRow;
