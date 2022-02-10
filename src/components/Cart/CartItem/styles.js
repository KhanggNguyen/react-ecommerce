import { makeStyles } from "@material-ui/core";

export default makeStyles( () => ({
    root:{
        maxWidth: "100%",
        minHeight: "124px",
    },
    imageDiv:{
        
    },
    media:{
        maxWidth: "100%",
        maxHeight: "100px",
        margin: "10px",
        objectFit: 'contain'
    },
    centerDivVertically:{
        position: "relative",
        top:"50%",
        transform: "translateY(50%)"
    },
    title:{
        fontWeight: "500",
        fontSize: "1em",
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