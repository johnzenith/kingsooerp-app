import React from 'react';
import './DashboardCardItem.css';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  cardItemWrapper: {
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexGrow: 1,
      flex: 1,
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      width: '92%',
      marginTop: '20px',
      marginBottom: '30px',
    },
  },
  root: {
    width: 275,
    height: 150,
    overflow: 'visible',
    marginBottom: '10px',
    [theme.breakpoints.up('md')]: {
      width: 280,
    },
    [theme.breakpoints.down('sm')]: {
      // display: 'flex',
      flex: 1,
      flexWrap: 'wrap',
      // width: '100%',
      minWidth: 0,
      flexGrow: 1,
      height: 'auto',
      minHeight: 150,
    },
    [theme.breakpoints.down('xs')]: {
      
    },
    '& svg': {
      width: '85px',
      height: '85px',
      background: 'linear-gradient(60deg, #66bb6a, #43a047)',
      color: '#fff',
      borderRadius: '3px',
      float: 'left',
      marginTop: '-35px',
      marginLeft: '0px',
      padding: '15px',
      boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(76 175 80 / 40%)',
    },
    '& .cardData': {
      textAlign: 'right',
      [theme.breakpoints.up('sm')]: {
        marginTop: '-15px',
      },
    },
  },
  cardContent: {
    maxHeight: '110px',
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column',
      maxHeight: '100%',
    },
  },
  control: {
    padding: theme.spacing(2),
  },
  title: {
    margin: 0,
    paddingTop: '10px',
    fontSize: '14px',
    color: '#999',
  },
  cardValue: {
    fontSize: '45px',
    position: 'relative',
    minHeight: 'auto',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    margin: 0,
    padding: 0,
    color: '#3C4858',
    fontWeight: 300,
    lineHeight: '1.15em',
    [theme.breakpoints.up('sm')]: {
      top: '-7px',
    },
  },
  divider: {
    width: '96%',
    borderBottom: '1px solid #150e0e12',
    marginBottom: '20px',
  }
}));

function useUpdatedDataCounterForCardItem(cardItem) {
  const stateKey          = cardItem?.stateKey;
  const [{ dataCounter }] = useStateValue();
  const dataCounterTarget = dataCounter?.[stateKey];
  
  const stateValue        = dataCounterTarget?.value;
  const isDataLoading     = dataCounterTarget?.loading || true;

  const value = (typeof stateValue !== 'undefined') ? 
      stateValue : cardItem?.value || 0;

  if (isDataLoading || typeof stateKey === 'undefined') {
    return <img 
      className="dataCounterLoaderImg" 
      src="/loading.svg" 
      alt={`${cardItem?.label || 'Loading ...'}`} 
    />
  }

  return value;
}

export default function DashboardCardItem(props) {
  const classes  = useStyles();
  const stateKey = [props?.stateKey];
  const [{ dataCounter }, dispatch] = useStateValue();

  const memoizedStateKey = React.useMemo(() => [props?.stateKey], [stateKey]);

  const {
    cardIcon,
    label,
    value
  } = props;

  React.useEffect(() => {
    const dataCounterTarget = dataCounter?.[memoizedStateKey];
    const isDataLoading     = dataCounterTarget?.loading || true;

    const finishDataCounterUpdate = (value = 0) => ({
      type: actionTypes.SET_DATA_COUNTER,
      payload: {
        dataCounter: {
          ...dataCounter,
          [memoizedStateKey]: {
            loading: false,
            value,
          }
        }
      }
    });

    console.log(dataCounter);

    setTimeout(() => {
      if (isDataLoading  
      && typeof memoizedStateKey !== 'undefined'
      && typeof dataCounterTarget === 'undefined')
      {
        try {
          const value = 21;

          dispatch(finishDataCounterUpdate(value));
        }
        catch (e) {
          console.log(e);
          dispatch(finishDataCounterUpdate);
        }
      }
      else {
        dispatch(finishDataCounterUpdate);
      }
    }, 5000);

    return () => {
      
    }
  }, [])

  return (
    <div className={classes.cardItemWrapper}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          {cardIcon}
          <div className="cardData">
            <p className={classes.title}>{label}</p>
            <h2 className={classes.cardValue}>
              {useUpdatedDataCounterForCardItem(props)}
            </h2>
          </div>
        </CardContent>
        <CardActions>
          <div className={classes.divider}></div>
        </CardActions>
      </Card>
    </div>
  );
}