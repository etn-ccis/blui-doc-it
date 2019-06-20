import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as PXBColors from '@pxblue/colors';

// Material-UI Components
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  wrapper:{
    //width: '100px', 
    display:'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    color: PXBColors.black[900],
  },
  selected:{
    background: theme.palette.primary['50']
  },
  label:{
    cursor: 'default', 
    width: '100%', 
    textAlign: 'center', 
    wordBreak: 'break-word',
    marginTop: '5px',
    color: '#1d2529'
  },
});


class IconCard extends React.Component {
  render() {
    const {component:Component, name, showLabel=true, classes, style, selected=false, iconSize='inherit'} = this.props;
    return (
      <div className={classes.wrapper + ' ' + (selected ? classes.selected : '')} style={style}>
        <Component style={{fontSize: iconSize}}/> 
        {showLabel && <Typography title={name} variant="subtitle2" className={classes.label}>{name}</Typography>}
      </div>
    );
  }
}
export default withStyles(styles)(IconCard);
