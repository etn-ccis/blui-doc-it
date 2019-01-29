import React from 'react';
import { connect  } from 'react-redux';
import showdown from 'showdown';
import previewExtension from '../util/stackblitz-md';
import Footer from './Footer';
import { fetchMarkdown } from '../actions/docs';


const converter = new showdown.Converter({
  emoji: true,
  tables: true,
  parseImgDimensions: true,
  extensions: [
    previewExtension
  ],
});

const mapStateToProps = state => ({
  alldocs: state.entities.get('docs'),
  showFooter: state.ui.get('showFooter')
});

const mapDispatchToProps = dispatch => ({
  fetchMarkdown: path => dispatch(fetchMarkdown(path)),
});

class MarkdownDoc extends React.Component {
  constructor() {
    super();
    this.container = "";
    this.state={
      validPage: true
    }
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

  componentDidMount(){
    /* Hide the non-selected framework examples when the page loads */
    if(this.container){
      this.hideStackblitzExamples(this.findExamples(this.container));
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
  }
  componentDidUpdate(previousProps) {
    if (this.container && (this.props.selectedFramework !== previousProps.selectedFramework)) {
        this.hideStackblitzExamples(this.findExamples(this.container));
    }

    if (this.container) {
      this.observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {

          const examples = this.findExamples(this.container);

          if (!examples.length) {
            return;
          }

          examples.forEach((target, idx) => {
            if (this.props.selectedFramework) {
                target.style.display = target.dataset.framework === this.props.selectedFramework.toLowerCase() ? 'block' : 'none';
            }
          });
        });
      });

      const config = {
        childList: true,
      };

      this.observer.observe(this.container, config);
    }
  }

  findExamples(container){
    /* Returns all of the stackblitz examples from the markdown file */
    return Array.prototype.slice.call(container.children).filter(candidate => candidate.className === "stackblitz");
  }

  hideStackblitzExamples(examples) {
    /* Sets display:none for examples not written in the selected framework */
    if(this.container){
      examples.forEach((example) => {
        if (this.props.selectedFramework) {
          example.style.display = (example.dataset.framework === this.props.selectedFramework.toLowerCase() ? 'block' : 'none');
        }
      });
    }
  }

  render() {
    return (
      <div>
        {/* Valid Page ---> Show the document */}
        {this.state.validPage && 
          <div style={{paddingBottom: '50vh'}}>
            <div
              className="mark"
              ref={ container => this.container = container }
              dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(this.props.alldocs.get(require(`../../docs/${this.props.doc }.md`)))
              }}
            />
          </div>
        }
        {/* Invalid Page ---> Show the 404 */}
        {!this.state.validPage && 
          <div style={{paddingBottom: '50vh'}}>
            <div
              className="mark"
              ref={ container => this.container = container }
              dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(this.props.alldocs.get(require(`../../docs/notfound.md`)))
              }}
            />
          </div>
        }
        {this.props.showFooter && <Footer/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownDoc);