import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Switch from "@material-ui/core/Switch";
import * as ThemeColors from "@pxblue/colors";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { updateTitle } from "../actions/ui";
import Footer from "./Footer";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const styles = theme => ({
  root: {
    marginBottom: "50vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginLeft: "-4px",
    backgroundColor: "transparent"
  },
  header:{
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  gridList: {
    width: "100%",
    overflow: "visible"
  },
  colorGrid: {
    width: "100%",
    display: "flex",
    overflow: "visible",
    backgroundColor: "transparent"
  },
  colorGridTitle: {
    height: 100,
    backgroundColor: "transparent",
    padding: "0 !important",
    paddingTop: "48px !important",
    marginLeft: "2px"
  },
  swatch: {
    padding: "0px !important",
    border: "1px solid " + ThemeColors.gray[200],
    margin: "4px",
    height: "150px !important",
    width: "100px !important",
    transistion: "all ease-in-out 2s"
  },
  swatchSm: {
    padding: "0px !important",
    border: "1px solid " + ThemeColors.gray[200],
    margin: "4px",
    height: "200px !important",
    width: "150px !important",
    transistion: "all ease-in-out 2s",
    
  },
  swatchTitle: {
    color: ThemeColors.black[500],
    fontWeight: 600
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

  getSwatchSize(){
    const { classes } = this.props;
    return isWidthUp("md", this.props.width) ? classes.swatch : classes.swatchSm;
  }

  getColorString(color) {
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

  makeColorPalette = () => {
    let colorPalette = [];

    Object.keys(ThemeColors).forEach(color => {
      colorPalette.push(this.makeColorList(color));
    });

    return colorPalette;
  };

  makeColorList = color => {
    const { classes } = this.props;
    let colorList = [];

    Object.keys(ThemeColors[color]).forEach(weight => {
      if (Number.isInteger(parseInt(weight, 10))) {
        colorList.push(<GridListTile key={color + weight} className={this.getSwatchSize()} style={{ backgroundColor: ThemeColors[color][weight] }}>
            {weight === "500" && <GridListTileBar style={{ backgroundColor: "transparent" }} titlePosition="top" actionIcon={<BookmarkIcon style={{ color: "white", marginLeft: "6px" }} />} actionPosition="left" />}
            <GridListTileBar style={{ backgroundColor: "white", paddingBottom: "4px" }} title={<span
                  className={classes.swatchTitle}
                >
                  {weight}:
                </span>} subtitle={this.getColorString(ThemeColors[color][weight])} />
          </GridListTile>);
      }
    });

    return (
      <GridList
        key={color + "_grid"}
        cellHeight={"auto"}
        cols={this.getColumns()}
        className={classes.colorGrid}
      >
        <GridListTile
          key="Subheader"
          cols={this.getColumns()}
          classes={{ root: classes.colorGridTitle }}
        >
          <h2>{unCamelCase(color)}</h2>
        </GridListTile>
        {colorList}
      </GridList>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
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
          PX Blue offers a variety of different colors for use in your applications. In most cases, you should stick to using the 500 color (<BookmarkIcon style={{marginTop: "4px"}}/>), which is the primary color for each palette. When using PX Blue themes, the most important elements of the UI will be stylized with these colors.<br />
        </p>
        
        <div className={classes.root}>{this.makeColorPalette()}</div>
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
