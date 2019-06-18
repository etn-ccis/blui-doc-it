import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as PXBColors from '@pxblue/colors';

// Material-UI Components
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  wrapper:{
    width: '100px', 
    display:'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    color: PXBColors.black[900]
  },
  label:{
    cursor: 'default', 
    width: '100%', 
    textAlign: 'center', 
    wordBreak: 'break-word',
    marginTop: '5px',
    color: '#1d2529'
  },
  hidden:{
    display: 'none'
  },
  iconSizeMain:{
    fontSize: 'inherit'
  },
  iconSizeDrawer:{
    fontSize: '40px'
    
  }
});


class IconCard extends React.Component {
  render() {
    const {component:Component, name, showLabel, classes} = this.props;
    const cardStyle = {margin: '0 15px 30px 15px', cursor: 'pointer'};
    const menuStyle = {margin: '5 5px 5px 5px'};
    return (
      <div className={classes.wrapper} style={showLabel ? cardStyle : menuStyle}>
        <Component className={showLabel ? classes.iconSizeMain : classes.iconSizeDrawer}/> 
        {showLabel && <Typography title={name} variant="subtitle2" className={classes.label}>{name}</Typography>}
      </div>
    );
  }
}
export default withStyles(styles)(IconCard);
