import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';
import TopLevelMenuItem from './NavigationMenuItem';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import pxIcon from "../icons/pxblue.png";
import pxLogo from "../icons/pxblue.svg";
import {PX_BLUE_VERSION} from '../constants/ui';

import * as Colors from '@pxblue/colors';

const styles = theme => ({
  sidenav: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%'
  },
  largeImage:{
    height: 'auto', 
    width: '300px',
    marginLeft: '-5px', 
    transition:'all 150ms ease-in-out'
  },
  smallImage:{
    height: '38px', 
    width: 'auto', 
    margin: '8px', 
    transition:'all 150ms ease-in-out'
  },
  chip:{
    height: 'auto',
    backgroundColor: theme.palette.primary[500],
    color: 'white'
  },
  float: {
    position: 'absolute',
    top: '12px',
    right: '46px'
  },
  routes:{
    overflowY: 'auto', 
    overflowX: 'hidden',
    marginLeft: '64px',
    flexGrow: 1
  },
  contactus:{
    flex: '0 0 auto', 
    background: Colors.gray[50],
    '& a':{
      marginLeft: '80px',
      lineHeight: '64px'
    }
  }
});

const siteNav = [
  {displayName: 'What is PX Blue?', url: 'overview', pages: [
    {displayName: 'Introduction', url: 'intro'},
    {displayName: 'Design System', url: 'design-system'},
    {displayName: 'Development Platform', url: 'platform'}
  ]},
  {displayName: 'Starting a Project', url: 'get-started', pages: [
    {displayName: 'Where to begin?', url: 'new-project'},
    {displayName: 'Web Apps', url: 'web-apps'},
    {displayName: 'Mobile Apps', url: 'mobile-apps'}
  ]},
  {displayName: 'Developing w/ PX Blue', url: 'development', pages: [
    {displayName: 'Environment Setup', url: 'environment'},
    {displayName: 'Web Frameworks', url: 'frameworks-web', pages:[
      {displayName: 'Introduction', url: 'intro'},
      {displayName: 'Framework Comparison', url: 'comparison'},
      {displayName: 'Angular Guide', url: 'angular'},
      {displayName: 'React Guide', url: 'react'}
    ]},
    {displayName: 'Mobile Frameworks', url: 'frameworks-mobile', pages:[
      {displayName: 'Introduction', url: 'intro'},
      {displayName: 'Framework Comparison', url: 'comparison'},
      {displayName: 'Apache Cordova Guide', url: 'cordova'},
      {displayName: 'NativeScript Guide', url: 'nativescript'},
      {displayName: 'React Native Guide', url: 'react-native'}
    ]},
    {displayName: 'Testing Your Application', url: 'testing'}
  ]},
  {displayName: 'Design Patterns', url: 'patterns', pages: [
    {displayName: 'App Bars', url: 'appbar'},
    {displayName: 'Lists', url: 'lists'},
    {displayName: 'Login', url: 'login'},
    {displayName: 'Navigation', url: 'navigation'},
    {displayName: 'Overlays', url: 'overlay'},
    {displayName: 'Page Layout', url: 'layout'},
    {displayName: 'Steppers', url: 'steppers'},
    {displayName: 'Visualizations', url: 'visualizations'}
  ]},
  {displayName: 'Style Guide', url: 'style', pages: [
    {displayName: 'Color Palette', url: 'color'},
    {displayName: 'Iconography', url: 'iconography'},
    {displayName: 'Typography', url: 'typography'}
  ]},
  {displayName: 'Community', url: 'community', pages: [
    {displayName: 'Licensing', url: 'license'},
    {displayName: 'Share Code', url: 'sharing'},
    {displayName: 'Report Bugs', url: 'bugs'},
    {displayName: 'Request Features', url: 'features'},
    {displayName: 'FAQ', url: 'faq'}
  ]},
  {displayName: 'Resources', url: 'resources'},
  {displayName: 'Release Notes', url: 'release-notes'}
]

class SideNav extends Component {

  constructor(props){
    super(props);
    this.pagesOpen = [];
  }

  toggleList(index){
    this.pagesOpen[index] = !this.pagesOpen[index];
  }

  openAndCollapseOthers(index){
    for(let i=0; i < this.props.pages.length; i++){
      this.pagesOpen[i] = (i === index);
    }
  }

  render(){
    const {classes} = this.props;

    return(
    <div className={classes.sidenav}>
      <Link to="/" style={{textDecoration: 'none'}} onClick={this.props.close ? () => this.props.close() : null}>
        <Toolbar style={{height: 64}}>
          <Hidden smDown>
              <img className={classes.largeImage} src={pxLogo} alt="Power Xpert Blue"/>
            <Chip color={'primary'} className={classes.chip + ' ' + classes.float} label={`v${PX_BLUE_VERSION}`}/>
          </Hidden>
          <Hidden mdUp>
            <img className={classes.smallImage} src={pxIcon} alt=""/>
            <Typography variant="h6">
              Power Xpert <strong>Blue</strong>&nbsp;
            </Typography>
            <Chip className={classes.chip} label={`v${PX_BLUE_VERSION}`}/>
          </Hidden>
          <Divider absolute/>
        </Toolbar>
      </Link>
      <List className={classes.routes}>
        {this.props.pages.map((page, index) =>
          <TopLevelMenuItem key={page.displayName} config={page}/>
        )}
      </List>
      <div className={classes.contactus}>
        <Divider/>
        <a href="mailto:pxblue@eaton.com">Contact Us</a>
      </div>
    </div>);
  }
}

export default withStyles(styles)(SideNav);