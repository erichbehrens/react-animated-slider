import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import Header from './Header';
import Slider from '../';
import './styles.css';
import horizontalCss from '../css/horizontal.css';
import verticalCss from '../css/vertical.css';
import content from './content';
import Shields from './Shields';
import customCss from './custom.css';

const App = () => (
	<div>
		<Header />

		<Shields />

		<h1>DEMO</h1>

		<h2>Predefined horizontal slider</h2>
		<Slider className={horizontalCss.slider} classNames={horizontalCss}>
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="center">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<button>{item.button}</button>
					</div>
				</div>
			))}
		</Slider>

		<h2>Predefined vertical slider</h2>
		<Slider className={verticalCss.slider} classNames={verticalCss} direction="vertical">
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="center">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<button>{item.button}</button>
					</div>
				</div>
			))}
		</Slider>

		<h2>Custom style and animations</h2>
		<Slider className={customCss.slider} classNames={customCss}>
			{content.map((item, index) => (
				<div
					key={index}
					className={customCss.sliderContent}
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className={customCss.inner}>
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<button>{item.button}</button>
					</div>
					<section>
						<img src={item.userProfile} alt={item.user} />
						<span>
							Posted by <strong>{item.user}</strong>
						</span>
					</section>
				</div>
			))}
		</Slider>
	</div>
);

render(<App />, document.getElementById('app'));
