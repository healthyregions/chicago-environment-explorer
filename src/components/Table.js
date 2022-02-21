import { useTable } from 'react-table';
import styled from 'styled-components';

const TableContainer = styled.div`
  @media (max-width: 768px) {
    overflow-x: scroll;
  }
`

const Table = styled.table`
  border-collapse: collapse;
  
  tr, th, td {
    padding:0.25em 0.5em;
  }
  tr:nth-child(even) {
    background:rgba(0,0,0,0.05);
  }
  tr{
    td:nth-of-type(n+2){
      border-left:1px solid rgba(0,0,0,0.25);
    }
  }
`

export default function TableComponent({ columns, data, tableProps, rowProps, overflowThreshold = 768 }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <TableContainer {...{overflowThreshold}}>
        <Table {...getTableProps()} {...tableProps}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} {...rowProps}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </TableContainer>
    )
  }
  