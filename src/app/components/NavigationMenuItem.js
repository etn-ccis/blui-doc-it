import React from "react";
import Collapse from "@material-ui/core/Collapse";
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import Badge from "@material-ui/core/Badge";

import ListItem from "@material-ui/core/ListItem";

// import slugify from "../util/slugify";

import * as Colors from '@pxblue/colors';

const styles = theme => ({
  badge: {
    fontSize: '0.5em',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '-15px'
  },
  regular:{
    fontWeight: 600,
    color: Colors.black[500],
    textTransform: 'none',
    '&.active':{
      fontWeight: 600,
      color: theme.palette.primary[500]
    }
  },
  indented:{
    fontWeight: '500',
    paddingLeft: 'calc(2rem + 16px)'
  }
});

const renderListItem = (config, level, classes={}, prefix='') => {
  return (
    <NavigationListItem key={config.displayName} config={config} level={level} classes={classes} prefix={prefix}/>
  )
}

class NavigationListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showDropdown: false
    };
  }

  render(){
    const {config, level, classes, prefix} = this.props;
    
    return (
      <React.Fragment key={config.displayName}>
        <ListItem
          className={classes.regular}
          style={{paddingLeft: 2*level+'em', fontWeight: level === 0 ? 600 : 500}}
          component={NavLink}
          to={config.pages ? '#' : '/'+prefix+(config.url.length > 0 ? config.url+'/' : '')}
          onClick={() => this.setState({showDropdown: !this.state.showDropdown})}
        >
          {/* {config.pages && <ExpandMore fontSize={'small'} style={{transform: this.state.showDropdown ? 'rotate(180deg)':'rotate(0deg)', transition: 'transform 200ms linear'}}/>} */}
          {config.displayName}
        </ListItem>
        <Collapse in={this.state.showDropdown} timeout={'auto'} unmountOnExit>
          {config.pages && config.pages.map((page) => (
            renderListItem(page, level + 1, classes, prefix+config.url+'/')
          ))}
        </Collapse>
      </React.Fragment>
    )
  }
}

class TopLevelMenuItem extends React.Component {
  render(){
    const {config, classes} = this.props;
    return (
      <React.Fragment>
        {renderListItem(config, 0, classes, )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TopLevelMenuItem);