import React from 'react';
import { connect  } from 'react-redux';
// import showdown from 'showdown';
import stackBlitz, { externalLinks, images } from '../util/showdownExtensions';
import Footer from './Footer';
import { fetchMarkdown } from '../actions/docs';
import { updateTitle } from "../actions/ui";
import withWidth from '@material-ui/core/withWidth';

const Converter = require('react-showdown').Converter;


const mapStateToProps = state => ({
  alldocs: state.entities.get('docs'),
  showFooter: state.ui.get('showFooter')
});

const mapDispatchToProps = dispatch => ({
  fetchMarkdown: path => dispatch(fetchMarkdown(path)),
  updateToolbarTitle: () => {dispatch(updateTitle());}
});

class MarkdownDoc extends React.Component {
  constructor(props) {
    super(props);
    props.updateToolbarTitle();
    this.container = "";
    this.state={
      validPage: true
    }
    this.converter = new Converter({
      emoji: true,
      tables: true,
      parseImgDimensions: true,
      extensions: [
        stackBlitz({
          react: props.selectedFramework !== 'react' ? 'hide' : (props.width === 'xs' || props.browser === 'ie') ? 'link' : 'embed', 
          angular: props.selectedFramework !== 'angular' ? 'hide' : (props.width === 'xs' || props.browser === 'ie') ? 'link' : 'embed',
         
        }),
        images({
          ionic: props.selectedFramework !== 'ionic' ? 'hide' : (props.width === 'xs' || props.browser === 'ie') ? 'link' : 'embed',
          reactNative: props.selectedFramework !== 'reactNative' ? 'hide' : (props.width === 'xs' || props.browser === 'ie') ? 'link' : 'embed'
        }),
        externalLinks
      ],
    });
  }

  componentWillMount() {
    /* Attempt to fetch the selected document */
    if(this.props.doc){
      try{
        if(!this.props.alldocs.get(require(`../../docs/${this.props.doc }.md`))){
          this.props.fetchMarkdown(require(`../../docs/${this.props.doc }.md`));
          this.setState({validPage: true});
        }
      }
      catch(err){
        this.setState({validPage: false});
        this.props.fetchMarkdown(require(`../../docs/notfound.md`));
      }
    }
  }


  componentWillReceiveProps(nextProps){
    /* If user navigates to a new page, fetch the requested document and load it */
    if(nextProps.doc && nextProps.doc !== this.props.doc){
      try{
          this.props.fetchMarkdown(require(`../../docs/${nextProps.doc }.md`));
          this.setState({validPage: true});
      }
      catch(err){
        this.setState({validPage: false});
        this.props.fetchMarkdown(require(`../../docs/notfound.md`));
      }
    }
    if((nextProps.selectedFramework !== this.props.selectedFramework) || nextProps.width !== this.props.width){
      this.converter = new Converter({
        emoji: true,
        tables: true,
        parseImgDimensions: true,
        extensions: [
          stackBlitz({
            react: nextProps.selectedFramework !== 'react' ? 'hide' : (nextProps.width === 'xs' || nextProps.browser === 'ie') ? 'link' : 'embed', 
            angular: nextProps.selectedFramework !== 'angular' ? 'hide' : (nextProps.width === 'xs' || nextProps.browser === 'ie') ? 'link' : 'embed',
           
          }),
          images({
            ionic: nextProps.selectedFramework !== 'ionic' ? 'hide' : (nextProps.width === 'xs' || nextProps.browser === 'ie') ? 'link' : 'embed',
            reactNative: nextProps.selectedFramework !== 'reactNative' ? 'hide' : (nextProps.width === 'xs' || nextProps.browser === 'ie') ? 'link' : 'embed'
          }),
          externalLinks
        ],
      });
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        {/* Valid Page ---> Show the document */}
        {this.state.validPage && 
          <div style={{paddingBottom: '50vh'}}>
              {this.converter.convert(this.props.alldocs.get(require(`../../docs/${this.props.doc }.md`)))}
          </div>
        }
        {/* Invalid Page ---> Show the 404 */}
        {!this.state.validPage && 
          <div style={{paddingBottom: '50vh'}}>
            {this.converter.convert(this.props.alldocs.get(require(`../../docs/notfound.md`)))}
          </div>
        }
        {this.props.showFooter && <Footer/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(MarkdownDoc));