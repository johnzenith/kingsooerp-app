import { makeStyles } from '@material-ui/core/styles';

const InputStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  center: {
    width: '100%',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(0),
  },
  marginTop: {
    marginTop: '30px !important',
  },
  marginTopMedium: {
    marginTop: '20px !important',
  },
  marginTopSmall: {
    marginTop: '20px !important',
  },
  formFieldWrapper: {
    minHeight: '70px',
    marginTop: '30px',
    marginBottom: '60px',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  formHeader: {
    padding: '15px',
    marginTop: '-40px',
    borderRadius: '3px',
    textAlign: 'center',
    background: 'linear-gradient(60deg, #61979e, #6ca4aa) !important',
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(66 148 157 / 40%) !important',
  },
  formHeaderText: {
    fontSize: '16px',
    color: '#fff',
    marginTop: 0,
    minHeight: 'auto',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 300,
    marginBottom: '3px',
    textDecoration: 'none'
  },
  formSubmitBtn: {
    width: '100%',
    padding: '10px !important',
    marginTop: '5px',
    color: '#fff !important',
    fontWeight: 500
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#9a9a9a !important'
  },
  formLink: {
    textTransform: 'none',
    fontSize: '15px',
    textDecoration: 'none',
    color: '#676262',
    fontWeight: 500
  },
  alignRight: {
    textAlign: 'right',
  },
  colorWhite: {
    color: '#fff',
  }
}));

export default InputStyles;