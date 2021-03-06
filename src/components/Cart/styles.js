import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    emptyButton: {
        minWidth: "150px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("xs")]: {
            marginRight: "20px",
        },
        [theme.breakpoints.down("sm")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("sm")]: {
            marginRight: "20px",
        },
        [theme.breakpoints.down("md")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("md")]: {
            marginRight: "20px",
        },
    },
    checkoutButton: {
        minWidth: "150px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("xs")]: {
            marginRight: "20px",
        },
        [theme.breakpoints.down("sm")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("sm")]: {
            marginRight: "20px",
        },
        [theme.breakpoints.down("md")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("md")]: {
            marginRight: "20px",
        },
    },
    link: {
        textDecoration: "none",
    },
    cardDetails: {
        width: "100%",
        marginTop: "auto",
        margin:0,
        bottom: 0,
    },
}));
