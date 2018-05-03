import React from 'react';
import Slider from '../../';
import horizontalCss from '../../css/horizontal.css';
import SourceView from '../SourceView';

function Gallery() {
	return (
		<div>
			<h2>Simple image gallery</h2>
			<Slider classNames={horizontalCss}>
				<img src="https://i.imgur.com/ZXBtVw7.jpg" />
				<img src="https://i.imgur.com/DCdBXcq.jpg" />
				<img src="https://i.imgur.com/DvmN8Hx.jpg" />
			</Slider>
			<SourceView>{`import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

<Slider>
	<img src="https://i.imgur.com/ZXBtVw7.jpg" />
	<img src="https://i.imgur.com/DCdBXcq.jpg" />
	<img src="https://i.imgur.com/DvmN8Hx.jpg" />
</Slider>`}
			</SourceView>
		</div>
	);
}

export default Gallery;
