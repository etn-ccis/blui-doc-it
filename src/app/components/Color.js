import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import Switch from "@material-ui/core/Switch";
import * as ThemeColors from "@pxblue/colors";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { updateTitle } from "../actions/ui";
import Footer from "./Footer";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import Swatch from './Swatch';

import meta from './meta';

const styles = theme => ({
  header:{
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  colorGrid: {
    width: "100%",
    display: "flex",
    overflow: "visible",
    backgroundColor: "transparent"
  },
  swatchSubtitle: {
    fontFamily: "Roboto Mono",
    color: ThemeColors.black[500],
    whiteSpace: "normal"
  }
});

export function unCamelCase(val) {
  return val
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
    .replace(/^./, function(str) {
      return str.toUpperCase();
    });
}

function mapDispatchToProps(dispatch) {
  return {
    updateToolbarTitle: () => {
      dispatch(updateTitle());
    }
  };
}

class ColorComponent extends React.Component {
  constructor(props) {
    super(props);
    props.updateToolbarTitle();
    this.state = {
      isHex: true
    };
  }

  getColumns() {
    return isWidthUp("md", this.props.width) ? 10 : 5;
  }

  getColorLabel(color){
    const { classes } = this.props;
    if (this.state.isHex) {
      return <span className={classes.swatchSubtitle}>{color}</span>;
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? (
      <div className={classes.swatchSubtitle}>
        <div>R: {parseInt(result[1], 16)}</div>
        <div>G: {parseInt(result[2], 16)}</div>
        <div>B: {parseInt(result[3], 16)}</div>
      </div>
    ) : null;
  }


  makeColorRow = (color) => {
    const { classes } = this.props;
    let colorList = [];

    Object.keys(color.palette).forEach(weight => {
      if (Number.isInteger(parseInt(weight, 10))) {
        colorList.push(
          <Swatch key={color.title+'_'+weight} 
            color={color.palette[weight]} 
            weight={weight} 
            label={this.getColorLabel(color.palette[weight])}
          />
        );
      }
    });

    return (
      <React.Fragment key={color.title}>
        <h3 style={{marginTop: '3rem'}}>{unCamelCase(color.title)}</h3>
        {color.description ? <p dangerouslySetInnerHTML={{ __html: color.description }}></p> : null}
        <GridList
          key={color.title+'_grid'}
          cellHeight={"auto"}
          cols={this.getColumns()}
          className={classes.colorGrid}
        >
          {colorList}
        </GridList>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{marginBottom: '50vh'}}>
          <div className={classes.header}>
            <h1>PX Blue Color Palette</h1>
            <div>
              RGB
              <Switch
                checked={this.state.isHex}
                onChange={(e, checked) => this.setState({ isHex: checked })}
              />
              HEX
            </div>
          </div>
          <p>
            PX Blue offers a variety of different colors for use in your applications. Our color palettes utilize a weighted approach to give designers and developers a versatile set of colors for solving common color-related issues (e.g., accessibility). <a href="https://material.io/design/color" target="_blank" rel="noopener noreferrer">Learn more about weighted color palettes</a>.
          </p>
          <p>
            Our color sets are divided into sections as outlined below. User Interface and Status colors are available in a single package (<a href="https://www.npmjs.com/package/@pxblue/colors">@pxblue/colors</a>). Eaton Branding (Charts and Graphs) colors are available as an additional package (<a href="https://www.npmjs.com/package/@pxblue/colors-branding">@pxblue/colors-branding</a>).
          </p>
          <p>
            In most cases, you should stick to using the 500 color (<BookmarkIcon style={{verticalAlign: "middle"}}/>), which is the primary color for each palette. When using PX Blue themes, the most important elements of the UI will be stylized with these colors.<br />
          </p>
        
        {meta.map((section) => (
          <React.Fragment key={section.title}>
            <br/><br/>
            <h2>{section.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: section.description }}/>
            {section.colors.map( color => 
              this.makeColorRow(color)
            )}
          </React.Fragment>
        ))}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

ColorComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withWidth()(withStyles(styles)(ColorComponent)));
