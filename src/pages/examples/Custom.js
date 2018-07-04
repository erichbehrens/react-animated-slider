import React from 'react';
import Slider from '../..';
import customCss from '../custom.css';
import content from '../content';

function Custom() {
	return (
		<div>
			<h2>Custom style and animations</h2>
			<Slider classNames={customCss}>
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
}

export default Custom;
