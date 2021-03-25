import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridItem = ({ children, xs = '', sm = '', md = '', lg = '' }) => (
  <Grid item xs={xs || 12} sm={sm || 12} md={md || 4} lg={lg || 4}>
    {children}
  </Grid>
);

export default GridItem;