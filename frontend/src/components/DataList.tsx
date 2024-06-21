import { Table, TableBody, TableCell, TableHead, TableRow, Container, Grid } from '@mui/material';
import { ReactNode } from 'react';

interface DataListProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  renderCell?: (item: T, key: keyof T) => ReactNode;
}

const DataList = <T extends unknown>({ data, columns, renderCell }: DataListProps<T>) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.key as string}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map(column => (
                    <TableCell key={column.key as string}>
                      {renderCell ? renderCell(item, column.key) : String(item[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataList;
