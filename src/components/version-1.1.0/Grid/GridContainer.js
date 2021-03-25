import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridContainer = ({ children, spacing = null, style = null, padding = null, margin = null }) => (
  <div
    style={{
      margin:  margin  ?? 0,
      padding: padding ?? '0px 20px',
    }}
  >
    <Grid container spacing={spacing || 3} style={style || {marginBottom: '10px'}}>
      {children}
    </Grid>
  </div>
);

export default GridContainer;