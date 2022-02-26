import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    root: {
        height: "400px",
    },
    media: {
        marginTop: "10px",
        minHeight: "200px",
        maxHeight: "50%",
        objectFit: 'contain'
    },
    productAction: {
        backgroundColor: "White",
        margin: "0 5px"
    },
    cardAction: {
        display: "flex",
        justifyContent: "flex-end",
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardPrice: {
        fontWeight: 600,
    },
    cardCategories: {
        fontSize: "0.8em",
        fontWeight: 500,
        color: "#D0D0D0",
    },
    cardDescription: {
        lineClamp: 1,
        wordBreak: "break-all",
        overflow: "hidden",
        display: "-webkit-box",
        boxOrient: "vertical",
    },
}));
