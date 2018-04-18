import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import Header from './Header';
import Slider from '../';
import './styles.css';
import horizontalCss from '../css/horizontal.css';
import verticalCss from '../css/vertical.css';
import content from './content';
import Shields from './Shields';

const App = () => (
	<div>
		<Header />

		<div className="page">
			<Shields />
		</div>
		<h1>DEMO</h1>

		<Slider className={horizontalCss.slider} classNames={horizontalCss} autoplay={2000}>
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
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

		<Slider className={verticalCss.slider} classNames={verticalCss} direction="vertical" autoplay={3000}>
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
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
