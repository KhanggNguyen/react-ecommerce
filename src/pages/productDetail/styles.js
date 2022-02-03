import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
    productDescriptionContainer: {
        display: "flex",
        boxSizing: "border-box",
        padding: "10px",
    },
    iconButton: {
        color: "#000000",
        marginRight: "5px",
        fontWeight: 400,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    thumbnail: {
        width: "80%",
        height: "400px",
        overflow: "hidden",
        textAlign: "center",
        border: "1px solid #f0f0f0",
        "& img": {
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
        },
    },
    breed: {
        margin: "1em 10px"
    },
    productDetail: {
        margin: "0 10px",
    },
    productTitle: {},
    ratingCount: {
        display: 'inline-block',
        background: '#388e3c',
        color: '#fff',
        borderRadius: '3px',
        padding: '2px 5px'
    },
    ratingNumbersReviews:{
        fontSize: '12px',
        color: '#777',
        fontWeight: 600,
        display: 'inline-block',
        margin: '0 10px',
    },
    priceContainer: {
        margin: "10px 0",
        alignItems: "center",
    },
    price: {
        display: "flex",
        alignItems: "center",
    },
    productDescription: {

    }
}));
