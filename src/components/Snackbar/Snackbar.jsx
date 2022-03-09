import React from "react";
import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

const Snackbar = (props) => {

    const {open, handleClose} = props;

    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            style={{ width: "300px" }}
        >
            <Alert onClose={handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;
