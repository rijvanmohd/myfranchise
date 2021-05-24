import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Chip from '@material-ui/core/Chip';

/**
List to show product details with availability 
 */

const useStyles = makeStyles(theme=>({
  table: {
  },
  soldOut: {
      opacity:'0.5'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  text:{
    color:'white'
  },
  sell: {
    backgroundColor:'green'
  }
}));


export default function ProductList({rows,onDelete,onSell}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.text}>Product Name</TableCell>
            <TableCell align="center" className={classes.text}>Description</TableCell>
            <TableCell align="center" className={classes.text}>Total Quantity</TableCell>
            <TableCell align="center" className={classes.text}>Current Quantity</TableCell>
            <TableCell align="center" className={classes.text}>Availability</TableCell>
            <TableCell align="center" className={classes.text}>Sell</TableCell>
            <TableCell align="center" className={classes.text}>Delete</TableCell>
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
                <TableCell align="center">
                  <Button 
                    disabled={row.current_quantity > 0 ? false : true}
                    variant="contained"
                    onClick={()=>{onSell(row)}}
                    className={classes.sell}>
                    Sell
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained"
                    onClick={()=>{onDelete(row)}}
                    color="secondary">
                    <DeleteTwoToneIcon/>
                  </Button>
                </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
