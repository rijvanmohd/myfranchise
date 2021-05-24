import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

/**
Common card component for seller details
 */

const useStyles = makeStyles(theme=>({
  root: {
    maxWidth: 275,
    flex: "calc(50% - 4px)",
    "@media (max-width: 500px)": {
        flex: "100%"
    },
    '&:hover': {
        transform: 'scale(1.01)',
        boxShadow: '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)'
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    color: theme.palette.secondary.main,
  },
  label: {
      whiteSpace:'no-wrap'
  },
  attr: {
      display:'flex',
      wordBreak:'break-word',
      justifyContent:'center',
      
  },
  pos: {
    display:'flex',
    marginTop: 12,
  },
  products: {
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
    //   padding:theme.spacing(1),
  },
  product: {
      marginTop: 12,
      justifyContent:'space-between',
  },
  actions: {
      justifyContent:'space-between'
  },
  delete: {
      color:'red'
  }
}));

export default function SimpleCard({seller,onProductClick,onDelete}) {
  const classes = useStyles();
  
  const handleCardClick = () => {
      onProductClick(seller)
  }

  const handleDelete = () => {
      onDelete(seller)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {seller.name}
        </Typography>
        <div className={classes.pos}>
            <Typography className={classes.label}>
                Email - &nbsp;
            </Typography>
            <Typography color="textSecondary" className={classes.attr}>
                {seller.email}
            </Typography>
        </div>
        <div className={classes.pos}>
            <Typography className={classes.label}>
                Contact Number - &nbsp;
            </Typography>
            <Typography color="textSecondary" className={classes.attr}>
                {seller.mobile_no}
            </Typography>
        </div>

        <Grid container className={classes.product}>
            <Grid item>
                <div className={classes.products}>
                    <Typography className={classes.label} color='primary'>
                        Active Products
                    </Typography>
                    <Typography color="textSecondary" className={classes.attr}>
                        {seller.active_products}
                    </Typography>
                </div>
            </Grid>
            <Grid item>
                <div className={classes.products}>
                    <Typography className={classes.label} color='primary'>
                        Sold Products
                    </Typography>
                    <Typography color="textSecondary" className={classes.attr}>
                        {seller.sold_products}
                    </Typography>
                </div>
            </Grid>
        </Grid>
        
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" onClick={handleCardClick}>View Products</Button>
        <Button size="small" className={classes.delete} onClick={handleDelete}>
            <DeleteTwoToneIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
