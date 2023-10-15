import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    toolbar: theme.mixins.toolbar,
    layout: {
        marginTop: "5%",
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            marginTop: 60,
        },
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    divider: {
        margin: "20px 0",
    },
    spinner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        border: "1px solid #cccccc",
        borderRadius: "5px",
        padding: "20px 20px",
        display: "flex",
        alignItems: "center",
        marginBottom: "15px",
        cursor: "pointer",
        width: "400px",

        p: {
            marginRight: "5px",
            "&:last-child": {
                marginLeft: "auto",
            },
        },
    },
    cardLogo: {
        width: "40px",
        marginRight: "20px",
    },
    cardLogoImage: {
        width: "100%",
    },
    detailsBrand: {
        fontWeight: "500",
        fontSize: "14px",
        marginBottom: "2px",
    },
    detailsName: {
        fontSize: "14px",
        color: "#595959",
    },
    expire: {
        marginLeft: "auto",
        fontSize: "14px",
    },
    cardInput: {
        border: "1px solid #cccccc",
        height: "35px",
        paddingTop: "8px",
        paddingLeft: "10px",
        borderRadius: "5px",
        marginBottom: "15px",
    },
}));
