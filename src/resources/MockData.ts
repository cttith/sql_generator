import { SessionTable } from "./SessionTable";

export const mockColumns = SessionTable.columns.filter(
  column => column.displayName
);
//   .map(column => column.displayName!);
