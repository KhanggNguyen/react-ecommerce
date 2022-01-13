import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  filtersGrid:{
    margin: '10px 10px',
  },
  loadingProgress: {
    position: "absolute",
    top: 400,
    left: 400,
    zIndex: 1
  },
  buttonApplyChanges:{
    textAlign: "right"
  }
}));