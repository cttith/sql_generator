import { Table } from "../data-models/Table";
import { DataType } from "../data-models/Column";


export const SessionTable: Table = {
    name: "Session",
    columns: [
        {
            metadataName: "id",
            dataType: DataType.STRING,
        },
        {
            metadataName: "user_email",
            dataType: DataType.STRING,
            displayName: "User Email"
        },
        {
            metadataName: "user_first_name",
            dataType: DataType.STRING,
            displayName: "First name"
        },
        {
            metadataName: "user_last_name",
            dataType: DataType.STRING,
            displayName: "Last Name"
        },
        {
            metadataName: "screen_width",
            dataType: DataType.INTEGER,
            displayName: "Screen Width"
        },
        {
            metadataName: "screen_height",
            dataType: DataType.INTEGER,
            displayName: "Screen Height"
        },
        {
            metadataName: "visits",
            dataType: DataType.INTEGER,
            displayName: "# of Visits"
        },
        {
            metadataName: "page_response",
            dataType: DataType.INTEGER,
            displayName: "Page Response time (ms)"
        },
        {
            metadataName: "domain",
            dataType: DataType.STRING,
            displayName: "Domain"
        },
        {
            metadataName: "path",
            dataType: DataType.STRING,
            displayName: "Page Path"
        }
    ]
}