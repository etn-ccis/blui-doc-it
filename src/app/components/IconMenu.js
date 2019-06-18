import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import * as MaterialIcons from '@material-ui/icons';

// PX Blue Icons and Symbols
import * as Icons from '@pxblue/icons-mui';
import IconCard from './iconCard';

// Material-UI Components
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
  Grid,
  Tabs,
  Tab,
  Typography, 
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelActions,
  Button,
} from '@material-ui/core';
const meta = require('@pxblue/icons-mui/index.json');

const styles = theme => ({
  usageBox: {
    padding: '10px ' + theme.spacing.unit*2 + 'px 0px ' + theme.spacing.unit*2 + 'px',
    overflowX: 'auto',
    wordWrap: 'break-word',
    height: '230px',
    overflowY: 'visible',
  },
  iconSheet: {
    width: '100%',
    left: '0px',
    right: '0px',
    bottom: '0px',
    position: 'fixed',
    marginLeft: 'auto',
    marginRight: 'auto',
    outline: 'none',
    [theme.breakpoints.up('md')]: {
      left: '364px',
      width: '600px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  }, 
  aboutPage: {
    padding: '5px',
    backgroundColor: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    whiteSpace: 'pre-wrap'
  },
});

const instructionLinks = [
  "https://github.com/pxblue/icons",
  "https://www.npmjs.com/package/@pxblue/icons-svg",
  "https://www.npmjs.com/package/@pxblue/icons-mui"
];

class IconMenu extends React.Component {
  
  state = {
    activeTab: 0,
    expanded: true
  };
  blockScroll(){
    document.body.style.overflow="hidden"
  }
  
  enableScroll(){
    document.body.style.overflow="visible"
  }
  
  toggleExpand = (event, expanded) => {
    if(!expanded){document.body.style.overflow="visible"}
  }
  
  getIconFile(name){
    for(var i = 0; i < meta.icons.length; i++){
      if(meta.icons[i].filename.includes(name)){
        return meta.icons[i]
      }
    }
    return -1;
  }

  render(){
    const{open, icon, classes} = this.props;
    return(
      <div className={classes.iconSheet} hidden={!open} onMouseOver={this.blockScroll} onMouseOut={this.enableScroll}>
          <ExpansionPanel 
            square
            defaultExpanded={true}
            onChange={ this.toggleExpand }
            elevation='4'
            >
          <ExpansionPanelSummary
            expandIcon={<ExpandLessIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <div>
            <Grid container spacing={0}>
              <Grid item>
                <IconCard  key={icon.name} component={icon.isMaterial ? MaterialIcons[icon.name] : Icons[getMuiIconName(icon.name)]} name={icon.name} showLabel={false}/>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs>
                <Typography style={{marginBottom: '0px'}} variant="subtitle2" gutterBottom>
                  {getMuiIconName(icon.name)}
                </Typography>
                <Typography style={{marginTop: '0px'}} variant="caption" color="primary">
                  {!icon.isMaterial && 'PX Blue Icon'}
                </Typography>
                <Typography style={{marginTop: '0px'}} variant="caption">
                  {icon.isMaterial && 'Material Icon'}
                </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
          </ExpansionPanelSummary>
          <div style={{width: 'auto'}}>
          
            <Tabs
              style={{marginTop: '0px', marginLeft: '0px'}}
              value={this.state.activeTab}
              onChange={(event, newTab) => this.setState({ activeTab : newTab })}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered={false}
            >
              <Tab label="Icon Font" />
              <Tab label="SVG" />
              {!icon.isMaterial && <Tab label="Component" />}
              {!icon.isMaterial && <Tab label="About" />}
            </Tabs>
          </div>
          <div className={classes.usageBox}>
              {!icon.isMaterial && !(this.state.activeTab===3) &&
                <Typography style={{marginBottom: '10px'}} variant="subtitle2">For detailed usage and installation instructions, visit our <a href={instructionLinks[this.state.activeTab]} target="_blank" rel="noopener noreferrer">GitHub</a>.</Typography>
              }
              
              {!(this.state.activeTab===3) &&
                <Typography variant="subtitle2">React</Typography>
              }
              {this.state.activeTab===0 && !icon.isMaterial &&
                <pre>&lt;I className=“pxb-{icon.name}&gt;&lt;&#47;I&gt;</pre>
              }
              {this.state.activeTab===0 && icon.isMaterial &&
                <pre>import Icon from &#039;@material-ui&#47;core&#47;Icon&#039;; <br/>&lt;Icon&gt;{getSnakeCase(icon.name)}&lt;&#47;Icon&gt;</pre>
              }
              {this.state.activeTab===1 && !icon.isMaterial &&
                <pre>const icon = require(&#039;@pxblue&#47;icons-svg&#47;{icon.name}.svg&#039;); <br/>&lt;img src=&#123;icon&#125;&#47;&gt;</pre>
              }
              {this.state.activeTab===1 && icon.isMaterial &&
                <pre>import {icon.name + 'Icon'} from &#039;@material-ui&#47;icons&#47;{icon.name}&#039;; <br/>&lt;{icon.name + 'Icon'}&gt;&lt;&#47;{icon.name + 'Icon'}&gt;</pre>
              }
              {this.state.activeTab===2 && !icon.isMaterial &&
                <pre>import myIcon from '@pxblue&#47;icons-mui&#47;{getMuiIconName(icon.name)}'; <br/>&lt;myIcon&gt;&lt;&#47;myIcon&gt;</pre>
              }
              {!(this.state.activeTab===3) &&
                <Typography variant="subtitle2">Angular</Typography>
              }
              {this.state.activeTab===0 && !icon.isMaterial &&
                <pre>&lt;I class=“pxb-{icon.name}&gt;&lt;&#47;I&gt;</pre>
              }
              {this.state.activeTab===0 && icon.isMaterial &&
                <pre>&lt;I class="{getSnakeCase(icon.name)}"&gt;&lt;&#47;I&gt;</pre>
              }
              {this.state.activeTab===1 && !icon.isMaterial &&
                <pre>&lt;mat-icon svgIcon=&quot;{icon.name}&quot;&gt;&lt;&#47;mat-icon&gt;</pre>
              }
              {this.state.activeTab===1 && icon.isMaterial &&
                <pre>&lt;mat-icon&gt;{getSnakeCase(icon.name)}&lt;&#47;mat-icon&gt;</pre>
              }
              {this.state.activeTab===2 && !icon.isMaterial &&
                <Typography variant="subtitle2">Icon components are intended for use only in React applications. For a way to link svg icons for use in Angular applications, see @pxblue/icons.</Typography>
              }
              {this.state.activeTab===3 && !icon.isMaterial &&
                <div className={classes.aboutPage}>
                  <p>Filename: {this.getIconFile(icon.name).filename}</p>
                  <p>Family: {this.getIconFile(icon.name).family.toString()}</p>
                  <p>Author: {this.getIconFile(icon.name).author}</p>
                  {this.getIconFile(icon.name).description && <p>Description: {this.getIconFile(icon.name).description}</p>}
                </div>
              }
              {this.state.activeTab===2 && icon.isMaterial &&
                this.setState({activeTab: 1})
              }
              {this.state.activeTab===3 && icon.isMaterial &&
                this.setState({activeTab: 1})
              }
          </div>
          <ExpansionPanelActions display="none">
            <Button variant="contained" color= 'inherit' onClick={this.props.onClose}>
              Close
            </Button>
            {icon.isMaterial &&
              <Button variant="contained" color= 'primary' target="_blank" href={"https://material.io/tools/icons/?icon=" + getSnakeCase(icon.name) + "&style=baseline"}>
                Open in Material.io
              </Button>
            }
          </ExpansionPanelActions>

        </ExpansionPanel>
      </div>
      );
    }
  }
  const getMuiIconName = (filename)=>{
    return filename
    .replace(/\.svg/, '')
    .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
  }
  
  const getSnakeCase = (name) => {
    return name.replace(/[A-Z]/g, "_$&").toLowerCase().substr(1);
  }

export default withStyles(styles)(IconMenu);