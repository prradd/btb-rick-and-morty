'use client';
import React from 'react';
import { Typography, Card, CardMedia, CardContent, Grid, Box } from '@mui/material';

interface DataListProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
}

const DataList = <T extends { image?: string }>({ data, columns }: DataListProps<T>) => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <Box display="flex" alignItems="center">
              {item.image && (
                <CardMedia
                  component="img"
                  sx={{ width: 140, height: 160, objectFit: 'cover' }}
                  image={item.image}
                  alt="character"
                />
              )}
              <CardContent>
                {columns.map(column => (
                  <Typography key={column.key as string}>
                    <strong>{column.label}:</strong> {String(item[column.key])}
                  </Typography>
                ))}
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DataList;
