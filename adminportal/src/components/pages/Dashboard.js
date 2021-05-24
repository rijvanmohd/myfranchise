import React, { useState, useEffect } from 'react'
import { Paper, Card, Typography, makeStyles, Button, Grid,Container, CssBaseline } from '@material-ui/core'
import PageHeader from '../common/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Dialog from '@material-ui/core/Dialog';
import SimpleCard from '../common/Card';
import AddSeller from '../accounts/AddSeller';
import { SellerAPI } from "../../api/seller";
import { ProductAPI } from "../../api/seller";
import ProductList  from "../common/ProductList";
import { withSnackbar } from 'notistack';

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
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight:theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize:'0.5rem'
        }
    },
    card: {
        display:'flex',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cards: {
        display:'flex',
        flexDirection:'row',
        marginTop:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            flexDirection:'column',
            maxWidth:'100%'
        },
    },
    text: {
        [theme.breakpoints.down('sm')]: {
            fontSize:'0.7rem'
        }
    },
    title: {
        margin:theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        
    }
}))

function Dashboard(props) {
    const [addSeller, setAddSeller] = useState(false)
    const [openProducts, setOpenProducts] = useState(false)
    const [sellers, setSellers] = useState([])
    const [products, setProducts] = useState([])
    const [currentSeller, setCurrentSeller] = useState({})
    const classes = useStyles();

    useEffect(() => {
        if(!addSeller){
            getSellers()
        }
    }, [addSeller])

    const getSellers = () => {
        SellerAPI.getAll()
            .then((response)=>{
                setSellers(response.data)
            })
    }

    const getProducts = (seller_id) => {
        ProductAPI.getBySeller(seller_id)
            .then((response)=>{
                console.log('response',response.data)
                if(response.data.length > 0 ){
                    setProducts(response.data)
                    setOpenProducts(true)
                }
                else{
                    props.enqueueSnackbar('No Products Available',{ variant: 'warning' })
                }
                
            })
    }

    const onProductClick = (seller) => {
        console.log('dashboard seller',seller)
        setCurrentSeller(seller)
        if(seller.active_products > 0 || seller.sold_products > 0){
            getProducts(seller.id)
        }
        else{
            props.enqueueSnackbar('No Products Available',{ variant: 'warning' })
        }
    }

    const deleteSeller = (seller_id) => {
        SellerAPI.delete(seller_id)
        .then((response)=>{
            console.log('response',response.data)
            if(response.status === 201){
                props.enqueueSnackbar(response.data.message,{ variant: 'success' })
                getSellers()
            }  
        })
        .catch(err=>{
            props.enqueueSnackbar(err.response.data.detail,{ variant: 'error' })
        })
    }

    const handleDelete = (seller) => {
        setCurrentSeller({})
        deleteSeller(seller.id)
    }


    const handleAddSeller = (event) => {
        setAddSeller(true)
    }

    const handleClose = (event) => {
        setAddSeller(false)
        setOpenProducts(false)
    }
    return (
        <>
            <CssBaseline/>
            <PageHeader
                title="Franchise Admin"
                subTitle="Manage the sellers from here "
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Grid container direction="column">
                <Grid item xs={3} className={classes.action}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.text}
                        onClick={handleAddSeller}
                    >
                        Add Seller
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2} className={classes.cards}>
                {   sellers && sellers.length > 0 ?
                    sellers.map(seller=>(
                    <Grid key={seller.id} item xs={12} lg={3} md={4} sm={6} className={classes.card}>
                        <SimpleCard seller={seller} key={seller.id} onProductClick={onProductClick} onDelete={handleDelete}/>
                    </Grid>
                    ))
                    :
                    <Grid item xs={12} lg={3} md={4} sm={6} className={classes.card}>
                        <h1>No Sellers Added Yet</h1>
                    </Grid>
                }
            </Grid>
            {
                addSeller &&
                <Dialog onClose={handleClose} open={addSeller} fullWidth>
                    <AddSeller setOpen={setAddSeller}/>
                </Dialog>
            }

            {
                openProducts &&
                <Dialog onClose={handleClose} open={openProducts} fullWidth>
                    <Typography variant="h5" component="h3" className={classes.title}>
                        Seller Name - {currentSeller.name}
                    </Typography>
                    <ProductList rows={products}/>
                </Dialog>
            }
            {/* <AddSeller/> */}
        </>
    )
}

export default withSnackbar(Dashboard)
