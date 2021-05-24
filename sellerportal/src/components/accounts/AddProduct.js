import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';
import { ProductAPI } from "../../api/product";
import { InfoContext } from "../../context/authContext";

/**
Used for adding new product 
 */

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
        height:'12',
        width:'12',
    }
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        width:'60%',
        fontSize:'1rem'
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddProduct(props) {
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [quantity, setQuantity] = React.useState(0)
  const {info, setInfo} = useContext(InfoContext);

  const classes = useStyles();


  const handleSubmit = (event) => {
      event.preventDefault()
      if(name.trim().length === 0){
          props.enqueueSnackbar('Please Enter Product Name',{ variant: 'error' })
      }
      else if(quantity.trim().length === 0){
          props.enqueueSnackbar('Please Enter Quantity',{ variant: 'error' })
      }
      else {
          const data = {'name':name,'description':desc,'total_quantity':quantity,'current_quantity':quantity,'seller':info.seller.id}
          ProductAPI.create(data)
          .then((response)=> {
                  if(response.status === 201){
                      props.enqueueSnackbar('Product Added Successfully',{ variant: 'success' })
                      props.setOpen(false)
                  }
                  else{
                      props.enqueueSnackbar(response.data.message,{ variant: 'error' })
                  }
              }
          )
          .catch((err)=>{
            //   console.log('err',err.response)
              props.enqueueSnackbar(err.response.data.message,{ variant: 'error' })
          })
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddShoppingCartTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Product Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={(event)=>{setName(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
                type="number"
                onChange={(event)=>{setQuantity(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                rows={3}
                multiline
                id="desc"
                label="Description"
                name="desc"
                onChange={(event)=>{setDesc(event.target.value)}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withSnackbar(AddProduct)