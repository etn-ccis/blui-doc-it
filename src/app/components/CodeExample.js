import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});


function findExampleTargets(target) {
  return Array
    .prototype
    .slice
    .call(target.children)
    .filter(candidate => candidate.className === "preview")
}

export default class CodeExample extends React.Component {
  elms = [];
  state = {
      show: true,
      value: 0,
      expanded: false,
  };

  componentDidMount(){
    if (this.props.target) {
      const targets = findExampleTargets(this.props.target);

      this.dontSeeCodeBlocks(targets);
    }
  }


  componentDidUpdate(previousProps) {

    if (this.props.target && (this.props.framework !== previousProps.framework)) {
        const targets = findExampleTargets(this.props.target);

        this.dontSeeCodeBlocks(targets);
    }

    if (this.props.target && !previousProps.target ) {
      this.observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {

          const targets = findExampleTargets(this.props.target);

          if (!targets.length) {
            return;
          }

          const extracts = [];

          targets.forEach((target, idx) => {
            if (this.props.framework) {
                target.style.display = target.dataset.framework === this.props.framework.toLowerCase() ? 'block' : 'none';
            }

            this.elms[idx] = document.createElement('div');
            target.insertBefore(this.elms[idx], target.firstChild);

            extracts.push({
              js: unescape(target.dataset.ts || target.dataset.js),
              html: unescape(target.dataset.html),
              css: unescape(target.dataset.css),
              src: unescape(target.dataset.src)
            });
          });

          this.setState({
            show: true,
            extracts,
          });
        });
      });

      const config = {
        childList: true,
      };

      this.observer.observe(this.props.target, config);
    }
  }

  dontSeeCodeBlocks(targets) {
    targets.forEach((target) => {
      if (this.props.framework) {
        target.style.display = target.dataset.framework === this.props.framework.toLowerCase() ? 'block' : 'none';
      }
    });
  }

  componentWillUnmount() {
    if(this.observer && this.observer.disconnect){
      this.observer.disconnect();
    }
  }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleExpandClicked = (event, value) => {
        this.setState({ expanded: !this.state.expanded });
    };


    render() {
    if (!this.state.show) {
      return null;
    }
    const { value } = this.state;

    const getPreview = (jsts, html, css) =>
          <div>
            <Button
              color="primary"
              onClick={this.handleExpandClicked}
              aria-expanded={this.state.expanded}
              aria-label={this.state.expanded ? "Hide Code" : "Show Code"}
              style={{marginBottom: '5px'}}>
                <CodeIcon style={{marginRight:"5px"}}/>
                {this.state.expanded ? "Hide Code" : "Show Code"}
            </Button>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="JS / TS"/>
                <Tab label="HTML"/>
                <Tab label="CSS"/>
              </Tabs>

                <div>
                    {
                      value === 0 &&
                        <pre>
                          { jsts }
                        </pre>
                    }
                    {
                      value === 1 &&
                          <pre>
                            { html }
                          </pre>
                    }
                    {
                      value === 2 &&
                          <pre>
                            { css }
                          </pre>
                    }
                </div>
              </Collapse>

          </div>

    return (
          <div>
            {
              this.elms.map(
                (elm, idx) => ReactDOM.createPortal(
                  getPreview(this.state.extracts[idx]?this.state.extracts[idx].js:undefined,
                    this.state.extracts[idx]?this.state.extracts[idx].html:undefined,
                    this.state.extracts[idx]?this.state.extracts[idx].css:undefined),
                  elm,
                )
              )
            }
          </div>
    );
  }
}
