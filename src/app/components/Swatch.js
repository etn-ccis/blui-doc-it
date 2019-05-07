import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import * as Colors from '@pxblue/colors';
import PropTypes from 'prop-types';

// import Typography from "@material-ui/core/Typography";
// import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import * as ThemeColors from "@pxblue/colors";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";


const styles = (theme) => ({
    swatchTitle: {
        color: ThemeColors.black[500],
        fontWeight: 600
    },
    swatch: {
        padding: "0px",
        border: "1px solid " + ThemeColors.gray[200],
        margin: "4px",
        height: "150px",
        width: "100px",
        transition: "all ease-in-out 1000"
      },
      swatchSm: {
        padding: "0px",
        border: "1px solid " + ThemeColors.gray[200],
        margin: "4px",
        height: "200px",
        width: "150px",
        transition: "all ease-in-out 1000",
        
      },
});

class Swatch extends React.Component {

    getSwatchSize(){
        const { classes } = this.props;
        return isWidthUp("md", this.props.width) ? classes.swatch : classes.swatchSm;
      }

    render(){
        const {color, weight, label, classes} = this.props;
        return(
            <GridListTile key={color.title+'_'+weight} 
                className={this.getSwatchSize()} 
                style={{ backgroundColor: color }}
            >
            {weight === "500" && 
                <GridListTileBar style={{ backgroundColor: "transparent" }} 
                titlePosition="top" 
                actionIcon={<BookmarkIcon style={{ color: "white", marginLeft: "6px" }} />} actionPosition="left" />
            }
            <GridListTileBar 
                style={{ backgroundColor: "white", paddingBottom: "4px" }} 
                title={
                <span className={classes.swatchTitle}>
                    {weight}:
                </span>} 
                subtitle={label} 
            />
            </GridListTile>            
        )
    }
}

Swatch.propTypes = {
    color: PropTypes.string.isRequired,
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.symbol
}
export default withWidth()(withStyles(styles)(Swatch));