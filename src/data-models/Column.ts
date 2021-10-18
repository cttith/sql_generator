export enum DataType {
  STRING,
  INTEGER
}

export type Column = {
  metadataName: string;
  dataType: DataType;
  displayName?: string;
};
