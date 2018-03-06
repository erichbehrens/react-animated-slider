import React from 'react';

const PREVIOUS = 'previous';
const NEXT = 'next';

export const HORIZONTAL = 'horizontal';
export const VERTICAL = 'vertical';

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
const DEFAULT_DURATION = 2000;

class Slider extends React.PureComponent {
	constructor(props) {
		super(props);
		const {
			slideIndex = 0,
			classNames = {},
			direction = HORIZONTAL,
		} = this.props;
		this.state = {
			currentSlideIndex: slideIndex,
			animating: false,
		};
		this.slideCount = React.Children.count(this.props.children);
		this.swipeProperty = direction === HORIZONTAL ? 'left' : 'top';
		this.swipeEventProperty = direction === HORIZONTAL ? 'clientX' : 'clientY';
	}

	componentDidMount() {
		this.setupAutoplay();
	}

	componentWillUnmount() {
		this.stopAutoplay();
	}

	setupAutoplay = () => {
		if (this.props.autoplay && !this.isMouseOver) {
			this.stopAutoplay();
			this.autoplayTimerId = setInterval(
				this.next,
				parseInt(this.props.autoplay)
			);
		}
	}

	stopAutoplay = () => {
		if (this.autoplayTimerId) {
			clearInterval(this.autoplayTimerId);
		}
	}

	onAnimationEnd = () => {
		this.setState({
			currentSlideIndex: this.nextSlideIndex,
			animating: false,
			animation: undefined,
		});
		this.setupAutoplay();
	};

	isDisabled = () =>
		this.slideCount < 2 ||
		this.state.animating ||
		this.props.disabled;

	isInfinite = () => this.slideCount > 2 && this.props.infinite !== false;
	canGoPrevious = () => this.isInfinite() || this.state.currentSlideIndex > 0;
	canGoNext = () => this.isInfinite() || this.state.currentSlideIndex < this.slideCount - 1;

	goTo = (index, animation) => {
		if (this.isDisabled()) return;
		this.nextSlideIndex = index;
		this.setState({ animating: true, animation });
		setTimeout(this.onAnimationEnd, this.props.duration || DEFAULT_DURATION);
	};

	previous = () => {
		if (!this.canGoPrevious()) return;
		const nextSlideIndex = this.state.currentSlideIndex - 1;
		const actualNextSlide =
			nextSlideIndex >= 0 ? nextSlideIndex : this.slideCount - 1;
		this.goTo(actualNextSlide, PREVIOUS);
	};

	next = () => {
		if (!this.canGoNext()) return;
		const nextSlideIndex =
			(this.state.currentSlideIndex + 1) % this.slideCount;
		this.goTo(nextSlideIndex, NEXT);
	};

	getSlideClass = (index) => {
		const {
			currentSlideIndex,
			animation,
		} = this.state;
		const classNames = this.getClassNames();
		const lastSlideIndex = this.slideCount - 1;
		if (index === currentSlideIndex) {
			if (animation) return `${classNames.animateOut} ${classNames[animation]}`;
			return classNames.current;
		} else if (this.slideCount === 2) {
			if (animation) return `${classNames.animateIn} ${classNames[animation]}`;
			return index < currentSlideIndex ? classNames.previous : classNames.next;
		} else if (
			index === currentSlideIndex - 1 ||
			(currentSlideIndex === 0 && index === lastSlideIndex)
		) {
			if (animation === PREVIOUS) return `${classNames.animateIn} ${classNames.previous}`;
			if (animation === NEXT) return classNames.hidden;
			return classNames.previous;
		} else if (
			index === currentSlideIndex + 1 ||
			(index === 0 && currentSlideIndex === lastSlideIndex)
		) {
			if (animation === NEXT) return `${classNames.animateIn} ${classNames.next}`;
			if (animation === PREVIOUS) return classNames.hidden;
			return classNames.next;
		}
		return classNames.hidden;
	};

	isSwiping = false;
	sliderRef;
	pageStartPosition;

	currentElement;
	currentElementStartPosition;
	currentElementPosition;
	previousElement;
	previousElementStartPosition;
	previousElementPosition;
	nextElement;
	nextElementStartPosition;
	nextElementPosition;

	handleTouchStart = (e) => {
		if (this.isDisabled()) return;
		this.stopAutoplay();
		const { current, previous, next } = this.getClassNames();
		const touch = e.touches[0];
		this.isSwiping = true;
		this.pageStartPosition = touch[this.swipeEventProperty];
		this.currentElement = this.sliderRef.getElementsByClassName(current)[0];
		this.previousElement = this.sliderRef.getElementsByClassName(previous)[0];
		this.nextElement = this.sliderRef.getElementsByClassName(next)[0];
		const touchDelta = this.currentElement.getBoundingClientRect()[this.swipeProperty];
		this.currentElementStartPosition = 0;
		this.currentElementPosition = 0;
		this.currentElement.style.transition = 'none';
		if (this.previousElement) {
			this.previousElement.style.transition = 'none';
			this.previousElement.style.visibility = 'visible';
			this.previousElementStartPosition = this.previousElement.getBoundingClientRect()[this.swipeProperty] - touchDelta;
		}
		if (this.nextElement) {
			this.nextElement.style.visibility = 'visible';
			this.nextElement.style.transition = 'none';
			this.nextElementStartPosition = this.nextElement.getBoundingClientRect()[this.swipeProperty] - touchDelta;
		}
	};

	animating = false;
	handleTouchMove = (e) => {
		e.preventDefault();
		this.animating =
			this.animating ||
			requestAnimationFrame(() => {
				if (!this.isSwiping) {
					this.animating = false;
					return;
				}
				const touch = e.touches[0];
				const newLeft = touch[this.swipeEventProperty] - this.pageStartPosition;
				this.currentElementPosition = this.currentElementStartPosition + newLeft;
				this.currentElement.style[this.swipeProperty] = `${this.currentElementPosition}px`;
				if (this.previousElement) {
					this.previousElementPosition = this.previousElementStartPosition + newLeft;
					this.previousElement.style[this.swipeProperty] = `${this.previousElementPosition}px`;
				}
				if (this.nextElement) {
					this.nextElementPosition = this.nextElementStartPosition + newLeft;
					this.nextElement.style[this.swipeProperty] = `${this.nextElementPosition}px`;
				}
				this.animating = false;
			});
	};

	handleTouchEnd = () => {
		this.animating = false;
		this.isSwiping = false;
		this.currentElement.style.removeProperty(this.swipeProperty);
		this.currentElement.style.removeProperty('transition');
		if (this.previousElement) {
			this.previousElement.style.removeProperty('visibility');
			this.previousElement.style.removeProperty('transition');
			this.previousElement.style.removeProperty(this.swipeProperty);
		}
		if (this.nextElement) {
			this.nextElement.style.removeProperty('visibility');
			this.nextElement.style.removeProperty('transition');
			this.nextElement.style.removeProperty(this.swipeProperty);
		}
		const touchDelta = this.currentElementStartPosition - this.currentElementPosition;
		const minSwipeOffset = this.props.minSwipeOffset || 15;
		if (Math.abs(touchDelta) > minSwipeOffset) {
			if (touchDelta < 0) {
				this.previous();
			} else {
				this.next();
			}
		} else {
			this.setupAutoplay();
		}
	};

	getClassNames = () => ({ ...DEFAULT_CLASSNAMES, ...this.props.classNames });

	initTouchEvents = (sliderRef) => {
		if (this.isDisabled() || !sliderRef) return;
		this.sliderRef = sliderRef;
		this.sliderRef.addEventListener('touchstart', this.handleTouchStart);
		this.sliderRef.addEventListener('touchmove', this.handleTouchMove, {
			passive: false,
		});
		this.sliderRef.addEventListener('touchend', this.handleTouchEnd);
	}

	handleMouseOver = () => {
		this.isMouseOver = true;
		this.stopAutoplay();
	}

	handleMouseOut = () => {
		this.isMouseOver = false;
		this.setupAutoplay()
	}

	render() {
		const {
			children,
			className,
			previousButton = 'previous',
			nextButton = 'next',
			autoplay,
		} = this.props;
		const classNames = this.getClassNames();
		const isDisabled = this.isDisabled();
		return (
			<div
				className={className}
				ref={this.initTouchEvents}
				{...autoplay && {
					onMouseOver: this.handleMouseOver,
					onMouseOut: this.handleMouseOut,
				}}
			>
				<button
					onClick={this.previous}
					className={classNames.previousButton}
					disabled={isDisabled || !this.canGoPrevious()}
				>
					{previousButton}
				</button>
				<button
					onClick={this.next}
					className={classNames.nextButton}
					disabled={isDisabled || !this.canGoNext()}
				>
					{nextButton}
				</button>
				<div className={classNames.track}>
					{React.Children.map(children, (item, index) =>
						React.cloneElement(item, {
							key: index,
							className: [classNames.slide, this.getSlideClass(index), item.props.className].filter(v => v).join(' '),
						}))}
				</div>
			</div >
		);
	}
}
export default Slider;
