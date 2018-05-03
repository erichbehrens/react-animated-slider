import React from 'react';
import hljs from 'highlight.js'; // eslint-disable-line import/no-extraneous-dependencies
import 'highlight.js/styles/github-gist.css'; // eslint-disable-line import/no-extraneous-dependencies
import styles from './SourceView.css';

class SourceView extends React.Component {
	state = { expanded: false };

	toggle = () => this.setState({ expanded: !this.state.expanded });

	highlight = (ref) => {
		hljs.configure({ languages: ['javascript'] });
		hljs.highlightBlock(ref);
	}

	render() {
		const { expanded } = this.state;
		const { children } = this.props;
		return (
			<div className={styles.sourceView}>
				<button className={styles.toggleButton} onClick={this.toggle}>{expanded ? 'Hide' : 'Show'} source</button>
				<div className={`${styles.code} ${expanded ? styles.expanded : styles.collapsed}`}>
					<pre ref={this.highlight}>{children}</pre>
				</div>
			</div>
		);
	}
}

export default SourceView;
