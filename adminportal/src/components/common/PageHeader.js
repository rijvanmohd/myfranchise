import React, { useContext } from 'react'
import { Paper, Card, Typography, makeStyles, Button, Grid, Container, CssBaseline } from '@material-ui/core'
import { InfoContext } from "../../context/authContext";

/**
Common page header used in dashboard for links
 */

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#fdfdff',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(2)
        }
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1',
        height:'fit-content'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    },
    action: {
        display:'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft:theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width:'80%'
        }
    },
    text: {
        [theme.breakpoints.down('sm')]: {
            fontSize:'0.7rem'
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        
    }
}))

function PageHeader(props) {
    const classes = useStyles();
    const { title, subTitle, icon } = props;
    const {info, setInfo} = useContext(InfoContext);

    const handleLogOut = (event) => {
        event.preventDefault();
        setInfo(null)
    }
    return (
        
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
                <Grid container justify="flex-end">
                    <Typography
                        variant="subtitle2"
                        className={classes.action}
                        component="div">
                        Hello, {info.user.name ? info.user.name : info.user.email}
                    </Typography>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                        className={classes.action}
                        onClick={handleLogOut}
                    >
                        Log Out
                    </Button>
                </Grid>
            </div>
        </Paper>
    )
}

export default PageHeader