import React from 'react';
import { connect  } from 'react-redux';
// import showdown from 'showdown';
import stackBlitz, { externalLinks, images, examplesTable, npmTable} from '../util/showdownExtensions';
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
const getExtensions = (framework, width, browser) => {
  framework = framework.toLowerCase();
  return [
    stackBlitz({
      react: framework !== 'react' ? 'hide' : (width === 'xs' || browser === 'ie') ? 'link' : 'embed', 
      angular: framework !== 'angular' ? 'hide' : (width === 'xs' || browser === 'ie') ? 'link' : 'embed',
      reactnative: framework !== 'reactnative' ? 'hide' : (width === 'xs' || browser === 'ie') ? 'link' : 'embed',
      ionic: framework !== 'ionic' ? 'hide' : (width === 'xs' || browser === 'ie') ? 'link' : 'embed'
    }),
    images({
      ionic: framework !== 'ionic' ? 'hide' : 'show',
      reactnative: framework !== 'reactnative' ? 'hide' : 'show'
    }),
    examplesTable,
    npmTable,
    externalLinks
  ];
 }

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
      extensions: getExtensions(props.selectedFramework, props.width, props.browser) 
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
        extensions: getExtensions(nextProps.selectedFramework, nextProps.width, nextProps.browser) 
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