export enum Operator {
  EQUALS = "EQUALS",
  CONTAINS = "CONTAINS",
  STARTS_WITH = "STARTS WITH",
  IN_LIST = "IN LIST",
  BETWEEN = "between",
  GREATER_THAN = "greater than",
  LESS_THAN = "less than"
}

export const STRING_OPERATORS = [
  Operator.EQUALS,
  Operator.CONTAINS,
  Operator.STARTS_WITH,
  Operator.IN_LIST
];
export const INTEGER_OPERATORS = [
  Operator.EQUALS,
  Operator.BETWEEN,
  Operator.GREATER_THAN,
  Operator.LESS_THAN,
  Operator.IN_LIST
];
