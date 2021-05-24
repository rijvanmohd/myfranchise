import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';
import { SellerAPI } from "../../api/seller";

/**
Form used to add new seller
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
    width: '100%', // Fix IE 11 issue.
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

function AddSeller(props) {
  const [name, setName] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const classes = useStyles();


  const handleSubmit = (event) => {
      event.preventDefault()
      if(name.trim().length === 0){
          props.enqueueSnackbar('Please Enter Name',{ variant: 'error' })
      }
      else if(email.trim().length === 0){
          props.enqueueSnackbar('Please Enter Email',{ variant: 'error' })
      }
      else if(number.trim().length === 0){
          props.enqueueSnackbar('Please Enter Contact Number',{ variant: 'error' })
      }
      else if(password.trim().length === 0){
          props.enqueueSnackbar('Please Enter Password',{ variant: 'error' })
      }
      else {
          const data = {'name':name,'mobile_no':number,'email':email,'password':password}
          SellerAPI.create(data)
          .then((response)=> {
                  if(response.status === 201){
                      props.enqueueSnackbar('Seller Added Successfully',{ variant: 'success' })
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
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Seller
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event)=>{setEmail(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="number"
                label="Contact Number"
                name="number"
                type="number"
                autoComplete="number"
                onChange={(event)=>{setNumber(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>{setPassword(event.target.value)}}
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

export default withSnackbar(AddSeller)