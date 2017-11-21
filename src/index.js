import React from 'react';

const PREVIOUS = 'previous';
const NEXT = 'next';
const DEFAULT_CLASSNAMES = {
	previousButton: 'previousButton',
	nextButton: 'nextButton',
	track: 'track',
	slide: 'slide',
	hidden: 'hidden',
	previous: 'previous',
	current: 'current',
	next: 'next',
	animateIn: 'animateIn',
	animateOut: 'animateOut',
};

function addClassname(value) {
	return value ? ` ${value}` : '';
}

class Slider extends React.PureComponent {
	constructor(props) {
		super(props);
		const {
			slideIndex = 0,
			classNames = {},
		} = this.props;
		this.state = {
			currentSlideIndex: slideIndex,
			classNames: { ...DEFAULT_CLASSNAMES, ...classNames },
			animating: false,
		};
		this.animatedSlideCount = 0;
	}

	onAnimationEnd = event => {
		this.animatedSlideCount = this.animatedSlideCount + 1;
		if (this.animatedSlideCount === 2) {
			this.setState({
				currentSlideIndex: this.nextSlideIndex,
				animating: false,
				animation: undefined,
			});
		}
	}

	goTo = (index, animation) => {
		if (this.state.animating) return;
		this.nextSlideIndex = index; // todo simplify logic into prev/next functions
		this.animatedSlideCount = 0;
		this.setState({ animating: true, animation });
	}

	previous = () => {
		const nextSlideIndex = this.state.currentSlideIndex - 1;
		const actualNextSlide = nextSlideIndex > 0 ? nextSlideIndex : this.props.children.length - 1;
		this.goTo(actualNextSlide, PREVIOUS);
	}

	next = () => {
		const nextSlideIndex = (this.state.currentSlideIndex + 1) % this.props.children.length;
		this.goTo(nextSlideIndex, NEXT);
	}

	getSlideClass = index => {
		const { currentSlideIndex, classNames, animating, animation } = this.state;
		const lastSlideIndex = this.props.children.length - 1;
		if (index === currentSlideIndex) {
			if (animation) return `${classNames.animateOut} ${classNames[animation]}`;
			return classNames.current;
		} else if (index === currentSlideIndex - 1 || (currentSlideIndex === 0 && index === lastSlideIndex)) {
			if (animation === PREVIOUS) return `${classNames.animateIn} ${classNames.previous}`;
			if (animation === NEXT) return classNames.hidden;
			return classNames.previous;
		} else if (index === currentSlideIndex + 1 || (index === 0 && currentSlideIndex === lastSlideIndex)) {
			if (animation === NEXT) return `${classNames.animateIn} ${classNames.next}`;
			if (animation === PREVIOUS) return classNames.hidden;
			return classNames.next;
		}
		return classNames.hidden;
	}

	render() {
		const { children, className, previousButton = 'previous', nextButton = 'next' } = this.props;
		const { classNames } = this.state;
		return <div className={className}>
			<button
				onClick={this.previous}
				className={classNames.previousButton}
			>
				{previousButton}
			</button>
			<button
				onClick={this.next}
				className={classNames.nextButton}
			>
				{nextButton}
			</button>
			<div className={classNames.track}>
				{React.Children.map(children, (item, index) => React.cloneElement(
					item, {
						key: index,
						onAnimationEnd: this.onAnimationEnd,
						className: `${classNames.slide} ${this.getSlideClass(index)}${addClassname(item.props.className)}`,
					}))}
			</div>
		</div>;
	}
}
export default Slider;