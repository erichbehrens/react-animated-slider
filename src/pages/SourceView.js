import React from 'react';
import styles from './SourceView.css';

class SourceView extends React.Component {
	state = { expanded: false };

	toggle = () => this.setState({ expanded: !this.state.expanded });

	render() {
		const { expanded } = this.state;
		const { children } = this.props;
		return (
			<div className={styles.sourceView}>
				<button className={styles.toggleButton} onClick={this.toggle}>{expanded ? 'Hide' : 'Show'} source</button>
				<pre className={expanded ? styles.expanded : styles.collapsed}>{children}</pre>
			</div>
		);
	}
}

export default SourceView;
