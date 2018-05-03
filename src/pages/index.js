import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import Header from './Header';
import styles from './styles.css';
import Shields from './Shields';
import Horizontal from './examples/Horizontal';
import Vertical from './examples/Vertical';
import Custom from './examples/Custom';
import Autoplay from './examples/Autoplay';
import Gallery from './examples/Gallery';

function App() {
	return (
		<div className={styles.page}>
			<Header />

			<Shields />

			<h1>DEMO</h1>

			<Gallery />

			<Horizontal />

			<Vertical />

			<Custom />

			<Autoplay />
		</div>
	);
}

render(<App />, document.getElementById('app'));
