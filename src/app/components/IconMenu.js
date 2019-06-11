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
    paddingLeft: theme.spacing.unit *2,
    paddingRight: theme.spacing.unit *2,
    overflowX: 'auto',
    wordWrap: 'break-word',
    paddingBottom: '0px',
    fontSize: '14px',
    height: '200px',
    overflowY: 'visible',
    paddingTop: '10px'
  },
  codeBox: {
    backgroundColor: '#F6F8FA',
    borderRadius: '1px',
    fontFamily: 'monospace',
    padding: '3px',
    color: '#424E54',
    marginBottom: '10px'
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

class IconMenu extends React.Component {
  
  state = {
    value: 0,
    expanded: true
  };
  handleChange = (event, newValue) => {
    this.setState({ value : newValue });
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
    const{open, tag, classes} = this.props;
    return(
      <div className={classes.iconSheet} hidden={!open} onMouseOver={this.blockScroll} onMouseOut={this.enableScroll}>
          <ExpansionPanel 
            square
            defaultExpanded={true}
            onChange={ this.toggleExpand }
            >
          <ExpansionPanelSummary
            expandIcon={<ExpandLessIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <div>
            <Grid container spacing={0}>
              <Grid item>
                {tag[1]===1 && <IconCard  key={tag[0]} component={MaterialIcons[tag[0]]} name={tag[0]} type={false}/>}
                {tag[1]===0 && <IconCard  key={tag[0]} component={Icons[getMuiIconName(tag[0])]} name={tag[0]} type={false}/>}
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs>
                <Typography style={{marginBottom: '0px'}} variant="subtitle2" gutterBottom>
                  {getMuiIconName(tag[0])}
                </Typography>
                <Typography style={{marginTop: '0px'}} variant="caption" color="primary">
                  {tag[1]===0 && 'PxBlue Icon'}
                </Typography>
                <Typography style={{marginTop: '0px'}} variant="caption">
                  {tag[1]===1 && 'Material Icon'}
                </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
          </ExpansionPanelSummary>
          <div style={{width: 'auto'}}>
          
            <Tabs
              style={{marginTop: '0px', marginLeft: '0px'}}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered={false}
            >
              <Tab label="Icon Font" />
              <Tab label="SVG" />
              {tag[1]===0 && <Tab label="Component" />}
              {tag[1]===0 && <Tab label="About" />}
            </Tabs>
          </div>
          <div className={classes.usageBox}>
              {tag[1]===0 && !(this.state.value===3) &&
                <div>For detailed usage and installation instructions, visit our <a href="https://github.com/pxblue/icons" target="_blank" rel="noopener noreferrer">GitHub</a>.</div>
              }
              {!(this.state.value===3) &&
                <b>React</b>
              }
              {this.state.value===0 && tag[1]===0 &&
                <div className={classes.codeBox}>  &lt;I className=“pxb-{tag[0]}&gt;&lt;&#47;I&gt; </div>
              }
              {this.state.value===0 && tag[1]===1 &&
                <div className={classes.codeBox}>  import Icon from &#039;@material-ui&#47;core&#47;Icon&#039;; <br /> &lt;Icon&gt;{getSnakeCase(tag[0])}&lt;&#47;Icon&gt; </div>
              }
              {this.state.value===1 && tag[1]===0 &&
                <div className={classes.codeBox}>  const icon = require(&#039;@pxblue&#47;icons-svg&#47;{tag[0]}.svg&#039;); <br/> &lt;img src=&#123;icon&#125;&#47;&gt; </div>
              }
              {this.state.value===1 && tag[1]===1 &&
                <div className={classes.codeBox}>  import {tag[0] + 'Icon'} from &#039;@material-ui&#47;icons&#47;{tag[0]}&#039;; <br/> &lt;{tag[0] + 'Icon'}&gt;&lt;&#47;{tag[0] + 'Icon'}&gt; </div>
              }
              {this.state.value===2 && tag[1]===0 &&
                <div className={classes.codeBox}>  import myIcon from '@pxblue&#47;icons-mui&#47;{getMuiIconName(tag[0])}'; <br/> &lt;myIcon&gt;&lt;&#47;myIcon&gt; </div>
              }
              {!(this.state.value===3) &&
                <b>Angular</b>
              }
              {this.state.value===0 && tag[1]===0 &&
                <div className={classes.codeBox}>   &lt;I class=“pxb-{tag[0]}&gt;&lt;&#47;I&gt; </div>
              }
              {this.state.value===0 && tag[1]===1 &&
                <div className={classes.codeBox}>   &lt;I class="{getSnakeCase(tag[0])}"&gt;&lt;&#47;I&gt; </div>
              }
              {this.state.value===1 && tag[1]===0 &&
                <div className={classes.codeBox}>   &lt;mat-icon svgIcon=&quot;{tag[0]}&quot;&gt;&lt;&#47;mat-icon&gt; </div>
              }
              {this.state.value===1 && tag[1]===1 &&
                <div className={classes.codeBox}>   &lt;mat-icon&gt;{getSnakeCase(tag[0])}&lt;&#47;mat-icon&gt; </div>
              }
              {this.state.value===2 && tag[1]===0 &&
                <div>Icon components are intended for use only in React applications. For a way to link svg icons for use in Angular applications, see @pxblue/icons. </div>
              }
                  
              {this.state.value===3 && tag[1]===0 &&
                <div className={classes.aboutPage}>{JSON.stringify(this.getIconFile(tag[0]), null, "\t").replace(/"|{|}|,/g, '').replace("\n", '')}</div>
              }
              {this.state.value===2 && tag[1]===1 &&
                this.setState({value: 1})
              }
              {this.state.value===3 && tag[1]===1 &&
                this.setState({value: 1})
              }
          </div>
          <ExpansionPanelActions display="none">
            <Button color= 'inherit' onClick={this.props.closeMenu}>
              Close
            </Button>
            {tag[1]===0 &&
              <Button color= 'primary' target="_blank" href={"https://github.com/pxblue/icons/blob/master/svg/" + getMuiIconName(tag[0]) + ".svg"}>
                View in Github
              </Button>
            }
            {tag[1]===1 &&
              <Button color= 'primary' target="_blank" href={"https://material.io/tools/icons/?icon=" + getSnakeCase(tag[0]) + "&style=baseline"}>
                View Icon
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