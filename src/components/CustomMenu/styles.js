import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    menu: {
        display: "flex",
        width: "100%",
        height: "auto",
        background: "#fff",
        "& > ul": {
            display: "flex",
            margin: "0 50px",
            position: "relative",
        },
        "& > ul > li:hover ul": {
            display: "block",
        },
        "& *": {
            outline: 0,
        }
    },
    menuList: {
        padding: 0,
        margin: 0,
        listStyle: "none",
    },
    menuListElementSpan: {
        display: "block",
        lineHeight: "40px",
        cursor: "pointer",
        padding: "0 20px",
        fontSize: "14px",
        "&:hover": {
            color: "#2874f0",
        },
    },
    menuListMenu: {
        position: "absolute",
        background: "#fff",
        left: 0,
        right: 0,
        display: "none",
        border: "1px solid #cecece",
        zIndex: 1,
        "& > li": {
            margin: "0 20px",
            minWidth: "150px",
            float: "left",
            "& > a": {
                display: "block",
                fontWeight: "bold",
            },
            "& a": {
                padding: "3px 0",
                display: "block",
                fontSize: "12px",
                textDecoration: "none",
                color: "#707070",
            },
        },
    },
}));
