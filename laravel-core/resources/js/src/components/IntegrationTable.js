import React from 'react';
import '../css/styles.css';

const IntegrationTable = (props) => {
  return (
    <>
      <table className="charts-table" bordercollapse="collapse">
        <thead>
          <tr>
            <th colSpan={2}>
              INDICATORS
            </th>
            <th>INTEGRATION</th>
          </tr>
        </thead>
        <tbody>
          {props.parents.length > 1 && (
            <>
            <tr>
              <td  rowSpan={props.parents.length}>P/P</td>
            </tr>
              <tr>
                {props.integration.map((integration, index) => {
                  (index <= 0 && <td>{integration.role}</td>)
                })}
              </tr>
            </>
          )}

          {props.children.length > 0 && (
            <>
              <tr>
                <td rowSpan={props.children.length * props.parents.length + 1}>P/C</td>
              </tr>
              {props.integration.map((integration, index) => {
                let parentNumber = 0;
                if(props.parents.length > 1)  parentNumber = 1;
                return (index >= parentNumber && index < props.children.length * props.parents.length + parentNumber && <tr>
                  <td  key={`parent-children-role-${index}`}>{integration.role}</td>
                  <td key={`parent-children-data-${index}`}>{integration.integration}</td>
                </tr>)
              })}
            </>
          )}

          {props.children.length > 1 && (
            <>
              <tr>
                <td rowSpan={(props.children.length * (props.children.length - 1))}>C/C</td>
              </tr>
              {props.integration.map((integration, index) => {
                let parentNumber = 0;
                if(props.parents.length > 1)  parentNumber = 1;
                return (index >= props.children.length * props.parents.length + parentNumber && index < props.children.length * props.parents.length + parentNumber + ((props.children.length * (props.children.length - 1)) / 2) && <tr>
                  <td  key={`parent-children-role-${index}`}>{integration.role}</td>
                  <td key={`parent-children-data-${index}`}>{integration.integration}</td>
                </tr>)
              })}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default IntegrationTable;
