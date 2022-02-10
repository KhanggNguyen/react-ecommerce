import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    card: {
        maxWidth: "350px",
        margin: "1rem",
        "& .MuiCardHeader-avatar": {
            display: "flex",
            padding: "2px",
            height: "40px",
            width: "60px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            background: "#ADD8E6",
            borderRadius: "10%",
            fontWeight: 600,
            color: "#4682B4",
        },
    },
}));
