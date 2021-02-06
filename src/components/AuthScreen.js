import React from 'react';
import { useFormAuth } from './form/UserForm';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    margin: 0,
    padding: 0,
  }
});

export default function AuthScreen() {
  const classes    = useStyles()
  const history    = useHistory();
  const [formAuth] = useFormAuth({
    redirectTo: {
      error: '/login'
    }
  });

  React.useEffect(() => {
    formAuth();
    return () => {
      // We don't want to keep the user here all day.
      // The login screen will do the final auth 
      // if the auth screen didn't perform the auto-login
      // process successfully.
      const timer = setTimeout(() => {
        history.push('/login');
        clearTimeout(timer);
      }, 7000);
    };
  }, []);

  return (
    <div className={classes.root}>
        <img style={{ marginTop: '-50px' }} src="./loading.svg" alt="loading ..." />
    </div>
  );
}