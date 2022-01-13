import { makeStyles } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default makeStyles(() => ({
    formControl: {
        margin: '0 10px'
    },
    select: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },
    inputLabel:{
    }
}));
