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
              <td  rowSpan={props.parents.length}>
                PARENT<br/>/<br/>PARENT
              </td>
            </tr>
              <tr>
                {props.integration.map((integration, index) => {
                  (index <= 0 && <td key={`parent-parent-role-${index}`}>{integration.role}</td>)
                })}
              </tr>
            </>
          )}

          {props.children.length > 0 && (
            <>
              <tr>
                <td rowSpan={props.children.length * props.parents.length + 1}>
                  PARENT<br/>/<br/>CHILD
                </td>
              </tr>
              {props.integration.map((integration, index) => {
                let parentNumber = 0;
                if(props.parents.length > 1)  parentNumber = 1;
                return (index >= parentNumber && index < props.children.length * props.parents.length + parentNumber && <tr key={`parent-children-role-${index}`}>
                  <td>{integration.role}</td>
                  <td>{integration.integration}</td>
                </tr>)
              })}
            </>
          )}

          {props.children.length > 1 && (
            <>
              <tr>
                <td rowSpan={(props.children.length * (props.children.length - 1))}>
                  CHILD<br/>/<br/>CHILD
                </td>
              </tr>
              {props.integration.map((integration, index) => {
                let parentNumber = 0;
                if(props.parents.length > 1)  parentNumber = 1;
                return (index >= props.children.length * props.parents.length + parentNumber && index < props.children.length * props.parents.length + parentNumber + ((props.children.length * (props.children.length - 1)) / 2) && <tr key={`children-children-role-${index}`}>
                  <td>{integration.role}</td>
                  <td>{integration.integration}</td>
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
