import React from 'react';
import styles from './styles.css';

function Shields() {
	return (
		<div className={styles.shields}>
			<a href="https://circleci.com/gh/erichbehrens/react-animated-slider/tree/master">
				<img
					src="https://circleci.com/gh/erichbehrens/react-animated-slider/tree/master.svg?style=shield"
					alt="CircleCI"
				/>
			</a>
				&nbsp;
			<a href="https://www.npmjs.com/package/react-animated-slider">
				<img
					src="https://img.shields.io/npm/v/react-animated-slider.svg"
					alt="version"
				/>
			</a>
				&nbsp;
			<a href="https://www.npmjs.com/package/react-animated-slider">
				<img
					src="https://img.shields.io/npm/dt/react-animated-slider.svg"
					alt="downloads"
				/>
			</a>
				&nbsp;
			<a href="https://github.com/erichbehrens/react-animated-slider">
				<img src="https://img.shields.io/github/stars/erichbehrens/react-animated-slider.svg?style=social&label=Stars" />
			</a>
		</div>
	);
}

export default Shields;
