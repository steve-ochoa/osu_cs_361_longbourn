import React from "react";
import MaterialTable from "material-table";

export default function Table(props) {
  return (
    <div className={props.title}>
      <MaterialTable
        options={{...props.options, ...{showTitle: false, toolbar: false}}}
        columns={props.tableCols}
        data={props.data}
        title={props.title}
      />
    </div>
  );
}