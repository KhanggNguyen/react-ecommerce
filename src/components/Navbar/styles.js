import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    title: {
        textDecoration: "none",
        color: "black",
        textAlign: "center",
    },
    logo: {
        marginRight: "10px",
    },
    buttonNav: {
        "& *": {
            margin: "0 10px",
        },

        "&:hover": {
            "& $a, $button": {
                backgroundColor: "white",
            },
        },
    },
    username: {
        margin: "2px 5px"
    }
}));
