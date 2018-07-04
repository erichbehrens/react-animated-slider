import React from 'react';
import Slider from '../..';
import SourceView from '../SourceView';
import styles from './Gallery.css';

function Gallery() {
	return (
		<div className={styles.gallery}>
			<h2>Simple image gallery</h2>
			<Slider classNames={styles}>
				<img src="https://s18.postimg.cc/9vhgup22x/img1.jpg" />
				<img src="https://s18.postimg.cc/vunvhvvrt/img2.jpg" />
				<img src="https://s18.postimg.cc/tdc4amjl5/img3.jpg" />
			</Slider>
			<SourceView>{`import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

<Slider>
	<img src="https://s18.postimg.cc/9vhgup22x/img1.jpg" />
	<img src="https://s18.postimg.cc/vunvhvvrt/img2.jpg" />
	<img src="https://s18.postimg.cc/tdc4amjl5/img3.jpg" />
</Slider>`}
			</SourceView>
		</div>
	);
}

export default Gallery;
