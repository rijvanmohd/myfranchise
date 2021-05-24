import React, { useState, useEffect, useContext } from 'react'
import { Paper, Card, Typography, makeStyles, Button, Grid,Container, CssBaseline } from '@material-ui/core'
import PageHeader from '../common/PageHeader';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import Dialog from '@material-ui/core/Dialog';
import AddProduct from '../accounts/AddProduct';
import { ProductAPI } from "../../api/product";
import ProductList  from "../common/ProductList";
import { InfoContext } from "../../context/authContext";
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
    },
    table: {
        justifyContent:'center',
        marginTop:theme.spacing(2)
    }
}))

function Dashboard(props) {
    const [addProduct, setAddProduct] = useState(false)
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})
    const {info, setInfo} = useContext(InfoContext);
    const classes = useStyles();

    useEffect(() => {
        if(!addProduct){
            getProducts()
        }
    }, [addProduct])

    const getProducts = () => {
        ProductAPI.getAll(info.seller.id)
            .then((response)=>{
                setProducts(response.data)
            })
    }

    const sellProduct = (product_id) => {
        ProductAPI.sell(product_id)
            .then((response)=>{
                props.enqueueSnackbar(response.data.message,{ variant: 'success' })
                getProducts()
            })
    }

    const onSellClick = (product) => {
        setCurrentProduct(product)
        if(product.current_quantity > 0){
            sellProduct(product.id)
        }
        else{
            props.enqueueSnackbar('Product is out of stock',{ variant: 'warning' })
        }
    }

    const deleteProduct = (product_id) => {
        ProductAPI.delete(product_id)
        .then((response)=>{
            console.log('response',response.data)
            if(response.status === 201){
                props.enqueueSnackbar(response.data.message,{ variant: 'success' })
                getProducts()
            }  
        })
        .catch(err=>{
            props.enqueueSnackbar(err.response.data.detail,{ variant: 'error' })
        })
    }

    const handleDelete = (product) => {
        setCurrentProduct({})
        deleteProduct(product.id)
    }

    const handleAddProduct = (event) => {
        setAddProduct(true)
    }

    const handleClose = (event) => {
        setAddProduct(false)
    }
    return (
        <>
            <CssBaseline/>
            <PageHeader
                title="Seller Portal"
                subTitle="Manage the products from here "
                icon={<LocalMallTwoToneIcon fontSize="large" />}
            />
            <Grid container direction="column">
                <Grid item xs={3} className={classes.action}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.text}
                        onClick={handleAddProduct}
                    >
                        Add New Product
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2} className={classes.table}>
                {   products && products.length > 0 ?
                    <Grid item xs={10} lg={8} md={10} xl={8} sm={10}>
                        <ProductList rows={products} onSell={onSellClick} onDelete={handleDelete}/>
                    </Grid>
                    :
                    <Grid item xs={10} lg={8} md={10} xl={8} sm={10}>
                        <h1>No Product Added Yet</h1>
                    </Grid>
                }
            </Grid>
            {
                addProduct &&
                <Dialog onClose={handleClose} open={addProduct} fullWidth>
                    <AddProduct setOpen={setAddProduct}/>
                </Dialog>
            }
        </>
    )
}

export default withSnackbar(Dashboard)
