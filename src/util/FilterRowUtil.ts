import { FilterRowDropdownStates } from "../App";

export function updateFilterRow(
  filterRows: FilterRowDropdownStates,
  syntheticIndex: number,
  key: string,
  newValue: any
): FilterRowDropdownStates {
  const newFilterRuleIdx = filterRows.filterRow.findIndex(
    row => row.syntheticKeyIndex === syntheticIndex
  )!;
  const newFilterRows = { ...filterRows };
  newFilterRows.filterRow[newFilterRuleIdx][key] = newValue;
  return newFilterRows;
}
