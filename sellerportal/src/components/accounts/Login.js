import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';
import { InfoContext } from "../../context/authContext";
import { SellerAPI } from "../../api/seller";

/**
Login form 
 */

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        width:'60%',
        fontSize:'1rem'
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {info, setInfo} = useContext(InfoContext);
  const classes = useStyles();
  

  const handleSubmit = (event) => {
      event.preventDefault()
      if(email.trim().length === 0){
          props.enqueueSnackbar('Please Enter Email',{ variant: 'error' })
      }
      else if(password.trim().length === 0){
          props.enqueueSnackbar('Please Enter Password',{ variant: 'error' })
      }
      else {
          const data = {'email':email,'password':password}
          SellerAPI.login(data)
          .then((response)=> {
                  console.log('respomse',response)
                  if(response.status === 201){
                      setInfo({'seller':response.data.seller,'token':response.data.token,'isLoggedIn':true})
                  }
                  else{
                      props.enqueueSnackbar(response.data.message,{ variant: 'error' })
                  }
              }
          )
          .catch((err)=>{
            //   console.log('err',err.response)
              if(err.response){
                props.enqueueSnackbar(err.response.data.message,{ variant: 'error' })
              }
              else{
                props.enqueueSnackbar(err.message,{ variant: 'error' })
              }
          })
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withSnackbar(Login)