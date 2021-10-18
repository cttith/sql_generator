import { FilterRowDropdownStates } from "../App";
import { Operator } from "../data-models/Operator";

/*
 column: string;
  operator: Operator;
  valueOne?: string;
  valueTwo?: string;
  syntheticKeyIndex: number;
*/
export function filterToSQL(filter: FilterRowDropdownStates): string {
  let res = "SELECT * FROM SESSION WHERE ";
  const filterRows = filter.filterRow;

  for (const filter of filterRows) {
    if (!filter.valueOne) return "";
    if (filter.operator === Operator.BETWEEN && !filter.valueTwo) return "";

    res += operatorToSql(
      filter.operator,
      filter.metadataName,
      filter.valueOne,
      filter.valueTwo
    );
    res += "AND ";
  }

  return res.substring(0, res.length - 4) + ";";
}

function operatorToSql(
  op: Operator,
  metadataName: string,
  value: string,
  valueTwo?: string
): string {
  let res = "";
  if (op === Operator.EQUALS) {
    if (isNaN(parseInt(value))) {
      res = `${metadataName} = '${value}' `;
    } else {
      res = `${metadataName} = ${value} `;
    }
  } else if (op === Operator.CONTAINS) {
    res = `CONTAINS (${metadataName}, '${value}') `;
  } else if (op === Operator.GREATER_THAN) {
    res = `${metadataName} > ${value} `;
  } else if (op === Operator.IN_LIST) {
    const values = value.split(",");
    res = `${metadataName} IN (`;
    if (isNaN(parseInt(value))) {
      for (const val of values) {
        res += `'${val}',`;
      }
    } else {
      for (const val of values) {
        res += `'${val}',`;
      }
    }
    res = res.substring(0, res.length - 1) + ") ";
  } else if (op === Operator.STARTS_WITH) {
    res = `LIKE ${value}% `;
  } else if (op === Operator.BETWEEN) {
    res = `${metadataName} BETWEEN ${value} AND ${valueTwo} `;
  } else if (op === Operator.LESS_THAN) {
    res = `${metadataName} < ${value} `;
  }

  return res;
}
