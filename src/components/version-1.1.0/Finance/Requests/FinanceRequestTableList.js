import * as React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 600,
    textShadow: 'none',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
      backgroundColor: theme.palette.primary.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
}))(TableRow);

/**
 * Table data
 */
const rows = [
    {
        id: 'uuada',
        vehicleNumber: 'UYIPO989',
        make: 'K302',
        model: '2021 Kuber',
        location: 'Port City',
        driver: 'John Zenith',
        status: 'Approved',
    },
    {
        id: 'dfafa',
        vehicleNumber: 'UYIPO989',
        make: 'K302',
        model: '2021 Kuber',
        location: 'Port City',
        driver: 'John Zenith',
        status: 'Pending',
    },
    {
        id: 'fasfa',
        vehicleNumber: 'UYIPO989',
        make: 'K302',
        model: '2021 Kuber',
        location: 'Port City',
        driver: 'John Zenith',
        status: 'Denied',
    },
    {
        id: 'bsdfahdaf',
        vehicleNumber: 'UYIPO989',
        make: 'K302',
        model: '2021 Kuber',
        location: 'Port City',
        driver: 'John Zenith',
        status: 'Approved',
    },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function FinanceRequestTableList() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Vehicle Number</StyledTableCell>
            <StyledTableCell align="center">Make</StyledTableCell>
            <StyledTableCell align="center">Model</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Driver</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row?.vehicleNumber}</StyledTableCell>
              <StyledTableCell align="center">{row?.make}</StyledTableCell>
              <StyledTableCell align="center">{row?.model}</StyledTableCell>
              <StyledTableCell align="center">{row?.location}</StyledTableCell>
              <StyledTableCell align="center">{row?.driver}</StyledTableCell>
              <StyledTableCell align="center">{row?.status}</StyledTableCell>
              <StyledTableCell align="center">
                  view, edit
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default FinanceRequestTableList;