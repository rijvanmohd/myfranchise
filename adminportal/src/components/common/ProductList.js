import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

/**
list used for product details 
 */

const useStyles = makeStyles({
  table: {
  },
  soldOut: {
      backgroundColor:'red'
  }
});


export default function ProductList({rows}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Total Quantity</TableCell>
            <TableCell align="center">Current Quantity</TableCell>
            <TableCell align="center">Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows && rows.length > 0 &&
            rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                      {row.name}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.total_quantity}</TableCell>
                  <TableCell align="center">{row.current_quantity}</TableCell>
                  <TableCell align="center">
                    {
                      row.current_quantity > 0 ?
                      <Chip label='Available' color='primary'/>
                      :
                      <Chip label='Sold Out' color='secondary'/>
                    }
                  </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
