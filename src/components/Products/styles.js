import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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