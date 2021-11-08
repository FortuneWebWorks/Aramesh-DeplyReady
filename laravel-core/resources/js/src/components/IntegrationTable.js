import React, { useEffect } from 'react';
import '../css/styles.css';

const emptyCellsRender = (array, field, empty) => {
  return array.map((obj, index) => {
    return <td key={`data-fields-${index}`}>{!empty ? obj[field] : ''}</td>;
  });
};

const EmptyRowsTableRender = ({ object, field, rowText, colSpan, empty }) => {
  return (
    <tr>
      <td colSpan={colSpan}>{rowText}</td>
      {emptyCellsRender(object.integration, field, empty ? empty : '')}
    </tr>
  );
};

const IntegrationTable = (props) => {

  return (
    <>
      <table className="charts-table" bordercollapse="collapse">
        <thead>
          <tr>
            <th rowSpan={2} colSpan={2}>
              INDICATORS
            </th>
            {props.parents.length > 1 && <th colSpan={1}>P/P</th>}
            {props.children.length > 0 && <th colSpan={props.children.length * props.parents.length}>P/C</th>}
            {props.children.length > 1 && <th colSpan={(props.children.length * (props.children.length - 1)) / 2}>C/C</th>}
          </tr>

          <tr>
            {props.integration.map((integration, index) => {
              return <td key={`parent-parent-${index}`}>{integration.role}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          <EmptyRowsTableRender
            object={props}
            field="integration"
            rowText="PROCESS"
            colSpan={2}
          />
          <EmptyRowsTableRender
            object={props}
            field="family-integration"
            rowText="CONTENT"
            colSpan={2}
          />
        </tbody>
      </table>
    </>
  );
};

export default IntegrationTable;
