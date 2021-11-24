import React, { useEffect } from 'react';
import '../css/styles.css';
import { family } from '../data';

const emptyCellsRender = (array, empty, field, className) => {
  return array.map((obj) => {
    return (
      <td key={`${obj.role}-${obj.results.field}`} className={className}>
        {!empty ? obj.results.length > 0 ? obj.results[0][field].toFixed(2) : '' : ''}
      </td>
    );
  });
};

const RowsTableRender = ({ parents, children, rowText, colSpan, empty, className }) => {
  return (
    <tr>
      <td colSpan={colSpan}>{rowText}</td>
      {emptyCellsRender(
        parents,
        empty ? empty : '',
        !empty ? rowText.toLowerCase() : ''
      )}
      {emptyCellsRender(
        children,
        empty ? empty : '',
        !empty ? rowText.toLowerCase() : '',
        !empty ? className : ''
      )}
    </tr>
  );
};

const Table = ({parents, children}) => {
  return (
    <table className="charts-table" bordercollapse="collapse">
      <thead>
        <tr>
          <th rowSpan={2} colSpan={2}>
            INDICATORS
          </th>
          <th colSpan={parents.length}>PARENTS</th>
          {children.length > 0 && <th colSpan={children.length}>CHILDREN</th>}
        </tr>
        <tr>
          {parents.map((parent, index) => {
            return <td key={`parent-${index}`}>{parent.role}</td>;
          })}

          {children.map((child, index) => {
            return <td key={`child-${index}`}>{child.role}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        <RowsTableRender parents={parents} children={children} rowText="PROCESS" colSpan={2} />
        <RowsTableRender parents={parents} children={children} rowText="CONTENT" colSpan={2} />

        <tr>
          <td rowSpan={6} className="b">
            <span
              style={{
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
              }}
            >
              PROCESS SUBSCALES
            </span>
          </td>
        </tr>
        <RowsTableRender parents={parents} children={children} rowText="CS" />
        <RowsTableRender parents={parents} children={children} rowText="PS" />
        <RowsTableRender parents={parents} children={children} rowText="RFC" />
        <RowsTableRender parents={parents} children={children} rowText="Cstra" />
        <RowsTableRender parents={parents} children={children} rowText="RB" />

        <tr>
          <td rowSpan={8}>
            <span
              style={{
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
              }}
            >
              CONTENT SUBSCALES
            </span>
          </td>
        </tr>
        <RowsTableRender parents={parents} children={children} rowText="JE" />
        <RowsTableRender parents={parents} children={children} rowText="TT" />
        <RowsTableRender parents={parents} children={children} rowText="FS" />
        <RowsTableRender parents={parents} children={children} rowText="AP" />
        <RowsTableRender parents={parents} children={children} rowText="PP" />
        <RowsTableRender parents={parents} children={children} rowText="LS" />
        <RowsTableRender parents={parents} children={children} rowText="EF" />
      </tbody>
    </table>
  );
};

export default Table;
