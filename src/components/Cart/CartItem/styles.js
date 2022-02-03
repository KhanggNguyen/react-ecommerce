import { makeStyles } from "@material-ui/core";

export default makeStyles( () => ({
    root:{
        maxWidth: "100%",
    },
    media:{
        maxWidth: "100%",
        maxHeight: "100px",
        margin: "10px",
        objectFit: 'contain'
    },
    title:{
        fontWeight: "500",
        fontSize: "1em",
        float: "none",
        top: "50%"
    },
    price: {
        margin: 0,
        top: "50%",
    },
    buttons: {
        display: "flex",
        top: "50%",
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