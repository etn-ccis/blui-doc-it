import React from "react";
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

const renderListItem = withRouter((props) => {
  return (
    <NavigationListItem {...props}/>
  )
});

class NavigationListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showDropdown: false
    };
  }

  componentDidMount() {
    const {url, prefix, location} = this.props;
    if (location.pathname.indexOf(prefix + '/' + url) !== -1) {
      this.setState({showDropdown: true});
    }
  }
  componentWillUpdate(nextProps) {
    const {url, prefix, location} = nextProps;
    if(location.pathname === this.props.location.pathname){return;}
    if (location.pathname.indexOf(prefix + '/' + url) === -1) {
      this.setState({showDropdown: false});
    }
  }

  render(){
    const {displayName, url, pages, level, classes, prefix} = this.props;
    return (
      <React.Fragment key={displayName+level}>
        <ListItem
          className={classes.regular}
          style={{paddingLeft: 2*level+'em', fontWeight: level === 0 ? 600 : 500}}
          component={NavLink}
          to={pages ? '#' : prefix+(url.length > 0 ? '/'+url : '')}
          onClick={() => this.setState({showDropdown: !this.state.showDropdown})}
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