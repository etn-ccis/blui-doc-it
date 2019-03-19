import React from "react";
import Collapse from "@material-ui/core/Collapse";
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Badge from "@material-ui/core/Badge";

import ListItem from "@material-ui/core/ListItem";

import slugify from "../util/slugify";

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

class ExpandableList extends React.Component {
  state = {
    isOpen: false
  };
  childActive(p) {
    var found = false;
    p.forEach(page => {
      if (window.location.pathname.indexOf(page.name) !== -1) {
        found = true;
      }
    });
    return found;
  }

  componentDidMount() {
    if (
      this.props.page &&
      this.props.page.pages &&
      this.childActive(this.props.page.pages)
    ) {
      this.props.openAndCollapseOthers(this.props.index);
    }
  }

  getNewNumber(page){
    var pg = page.pages.filter(p => p.new < 0 );
    return pg.length;
  }

  render() {
    const { page, classes } = this.props;

    let listItem = (
      <ListItem
        className={classes.regular}
        component={NavLink}
        to={page.pages ? "#" : `/${slugify(page.name)}`}
        onClick={() => {
          if (page.pages) {
            this.props.toggleList(this.props.index);
          } else {
            this.props.openAndCollapseOthers(this.props.index);
            this.props.close();
          }
        }}
      >
        {page.displayName}
      </ListItem>
    );

    return (
      <div>
        {page.new ? (
          <Badge
            badgeContent={page.new === 1 ? "New" : page.new}
            color="primary"
            classes={{badge: classes.badge}}
          >
            {listItem}
          </Badge>
        ) : listItem}
        {page.pages && (
          <Collapse in={this.props.open} timeout="auto" unmountOnExit>
            {page.pages.map(
              innerPage => {
                let innerListItem = (
                  <ListItem
                    className={classes.regular + ' ' + classes.indented}
                    key={innerPage.name}
                    component={NavLink}
                    onClick={() => {
                      this.props.openAndCollapseOthers(this.props.index);
                      this.props.close();
                    }}
                    to={`/${slugify(page.name)}/${slugify(innerPage.name)}`}
                  >
                    {innerPage.displayName}
                  </ListItem>
                );
                
                return innerPage.new ? (
                  <Badge
                    key={'item_'+innerPage.displayName}
                    badgeContent={innerPage.new === 1 ? "New" : innerPage.new}
                    color="primary"
                    classes={{badge: classes.badge}}
                  >
                    {innerListItem}
                  </Badge>
                ) : innerListItem;
              }
            )}
          </Collapse>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ExpandableList);