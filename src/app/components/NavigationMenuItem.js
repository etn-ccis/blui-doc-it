import React from "react";
import { connect  } from 'react-redux';
import {SHOW_MOBILE, HIDE_MOBILE} from '../constants/ui';

import Collapse from "@material-ui/core/Collapse";
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ListItem from "@material-ui/core/ListItem";
import * as Colors from '@pxblue/colors';

const styles = theme => ({
  badge: {
    fontSize: '0.5em',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '-15px'
  },
  regular:{
    color: Colors.black[500],
    textTransform: 'none',
    '&.active':{
      color: theme.palette.primary[500]
    }
  }
});

const mapDispatchToProps = dispatch => {
  return {
    showMobile: () => {dispatch({type: SHOW_MOBILE})},
    hideMobile: () => {dispatch({type: HIDE_MOBILE})}
  };
};

/* 
  Function that returns a NavigationListItem with the supplied props
  We define this in a function so we can call it recursively within 
  the NavigationListItem class.

*/
const renderListItem = withRouter(connect(null, mapDispatchToProps)((props) => {
  return (
    <NavigationListItem {...props}/>
  )
}));

/*
  Component class definition for the Menu Item. It renders a simple ListItem
  and recursively generates any children elements as ListItems within a 
  Collapse panel.
*/
class NavigationListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showDropdown: false
    };
  }

  // Opens the menu structure when we load a page from a deep link
  componentDidMount() {
    const {url, prefix, location} = this.props;
    if (location.pathname.indexOf(prefix + '/' + url) !== -1) {
      this.setState({showDropdown: true});
    }
  }

  // Closes menu structure except for active one when we navigate to a new page
  componentWillUpdate(nextProps) {
    const {url, prefix, location} = nextProps;
    if(location.pathname === this.props.location.pathname){return;}
    this.setState({showDropdown: location.pathname.indexOf(prefix + '/' + url) !== -1});
  }

  render(){
    const {displayName, url, pages, level, classes, prefix, hideMobile} = this.props;
    return (
      <React.Fragment key={displayName+level}>
        <ListItem
          className={classes.regular}
          style={{paddingLeft: 2*level+'em', fontWeight: level === 0 ? 600 : 500}}
          component={NavLink}
          to={pages ? '#' : prefix+(url.length > 0 ? '/'+url : '')}
          onClick={() => {
            if(!pages || pages.length < 1){hideMobile()}
            this.setState({showDropdown: !this.state.showDropdown})
          }}
        >
          {displayName}
        </ListItem>
        <Collapse in={this.state.showDropdown} timeout={'auto'} unmountOnExit>
          {pages && pages.map((page, ind) => (
            <React.Fragment key={ind+"-"+page.displayName}>
              {renderListItem({...page, level: level + 1, classes: classes, prefix: prefix+'/'+url})}
            </React.Fragment>
          ))}
        </Collapse>
      </React.Fragment>
    )
  }
}

/* 
  Defines a top-level menu item. This is a separate component for the sake of
  easily setting the initial conditions for level, classes, prefix, etc.
*/
class TopLevelMenuItem extends React.Component {
  render(){
    const {config, classes} = this.props;
    return (
      <React.Fragment>
        {renderListItem({...config, level: 0, classes: classes, prefix:''})}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TopLevelMenuItem);