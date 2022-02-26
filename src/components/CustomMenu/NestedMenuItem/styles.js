import { makeStyles } from "@material-ui/core/styles"

const TRANSPARENT = 'rgba(0,0,0,0)';

export default makeStyles((theme) => ({
    root: (props) => ({
      backgroundColor: props.open ? theme.palette.action.hover : TRANSPARENT
    })
  }))