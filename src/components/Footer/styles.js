import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    root: {
        minWidth: "100%",
        minHeight: "auto",
        clear: "both",
        position: "relative",
        margin: 0,
        marginTop: "auto",
        bottom: 0,
        backgroundColor: "#232323",
    },
    box: {
        display: "flex",
        flexDirection: "row",
        marginTop: "20px",
    },
    gridColumn: {
        height: "100%",
    },
    title: {
        textDecoration: "none",
        color: "white",
        textAlign: "left",
        cursor: "default",
        paddingBottom: "10px",
        "&:hover": {
            textDecoration: "none",
        },
    },
    divider: {
        backgroundColor: "red",
        width: "30%",
        height: "2px",
        justifyContent: "center",
    },
    logo: {
        marginRight: "10px",
    },
    contactGrid: {
        paddingTop: "10px",
        color: "gray",
        "& a": {
            color: "gray",
        },
    },
    newsletterTextField:{
        backgroundColor: "white",
        width: "100%",
    }
}));
