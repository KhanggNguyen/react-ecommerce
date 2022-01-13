import { makeStyles } from "@material-ui/core";

export default makeStyles( () => ({
    media:{
        width: "150px",
        height: "100px",
        margin: "20px"
    },
    title:{
        fontWeight: "500",
        fontSize: "1em",
        float: "none",
        paddingTop: "50px",
        width: "40%"
    },
    price: {
        paddingTop: "50px",
        width: "10%"
    },
    buttons: {
        width: "20%",
        display: "flex",
        paddingTop: "55px",
        height: "1em",
        alignItems: 'center',
        "& *": {
            width: "1em",
            padding: "0 5px"
        }
    },
    removeAction: {
        color: "red",
        "&:hover":{
            backgroundColor: "transparent",
        }
        
    }
}));