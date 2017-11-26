import React from 'react';

const PREVIOUS = 'previous';
const NEXT = 'next';
const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
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
	animateOut: 'animateOut'
};

function addClassname(value) {
	return value ? ` ${value}` : '';
}

class Slider extends React.PureComponent {
	constructor(props) {
		super(props);
		const { slideIndex = 0, classNames = {}, duration = 2000, direction = HORIZONTAL } = this.props;
		this.state = {
			currentSlideIndex: slideIndex,
			classNames: { ...DEFAULT_CLASSNAMES, ...classNames },
			animating: false,
			duration,
			direction,
		};
		this.slideCount = React.Children.count(this.props.children);
		this.swipeProperty = direction === HORIZONTAL ? 'left' : 'top';
		this.swipeEventProperty = direction === HORIZONTAL ? 'clientX' : 'clientY'; // client Y possibly not working in ie
	}

	onAnimationEnd = () => {
		this.setState({
			currentSlideIndex: this.nextSlideIndex,
			animating: false,
			animation: undefined
		});
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
		setTimeout(this.onAnimationEnd, this.state.duration);
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

	getSlideClass = index => {
		const { currentSlideIndex, classNames, animating, animation } = this.state;
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
			if (animation === PREVIOUS)
				return `${classNames.animateIn} ${classNames.previous}`;
			if (animation === NEXT) return classNames.hidden;
			return classNames.previous;
		} else if (
			index === currentSlideIndex + 1 ||
			(index === 0 && currentSlideIndex === lastSlideIndex)
		) {
			if (animation === NEXT)
				return `${classNames.animateIn} ${classNames.next}`;
			if (animation === PREVIOUS) return classNames.hidden;
			return classNames.next;
		}
		return classNames.hidden;
	};

	sliderRef;
	startPageX;
	startLeft;
	left = 0;

	currentElement;
	previousElement;
	nextElement;
	previousElementStartLeft;
	nextElementStartLeft;
	previousElementLeft;
	nextElementLeft;

	handleTouchStart = e => {
		if (this.isDisabled()) return;
		const { current, previous, next } = this.state.classNames;
		const touch = e.touches[0];
		this.startPageX = touch[this.swipeEventProperty];
		this.currentElement = this.sliderRef.getElementsByClassName(current)[0];
		this.previousElement = this.sliderRef.getElementsByClassName(previous)[0];
		this.nextElement = this.sliderRef.getElementsByClassName(next)[0];
		this.startLeft = this.currentElement.getBoundingClientRect()[this.swipeProperty];
		this.sliderRef.addEventListener('touchmove', this.handleTouchMove, {
			passive: false
		});
		this.currentElement.style.transition = `none`;
		if (this.previousElement) {
			this.previousElement.style.transition = `none`;
			this.previousElement.style.visibility = `visible`;
			this.previousElementStartLeft = this.previousElement.getBoundingClientRect()[this.swipeProperty];
		}
		if (this.nextElement) {
			this.nextElement.style.visibility = `visible`;
			this.nextElement.style.transition = `none`;
			this.nextElementStartLeft = this.nextElement.getBoundingClientRect()[this.swipeProperty];
		}
	};

	animating = false;
	handleTouchMove = e => {
		e.preventDefault();
		this.animating =
			this.animating ||
			requestAnimationFrame(() => {
				const touch = e.touches[0];
				const newLeft = touch[this.swipeEventProperty] - this.startPageX;
				this.left = this.startLeft + newLeft;
				this.currentElement.style[this.swipeProperty] = `${this.left}px`;
				if (this.previousElement) {
					this.previousElementLeft = this.previousElementStartLeft + newLeft;
					this.previousElement.style[this.swipeProperty] = `${this.previousElementLeft}px`;
				}
				if (this.nextElement) {
					this.nextElementLeft = this.nextElementStartLeft + newLeft;
					this.nextElement.style[this.swipeProperty] = `${this.nextElementLeft}px`;
				}
				this.animating = false;
			});
	};

	handleTouchEnd = e => {
		this.sliderRef.removeEventListener('touchmove', this.handleTouchMove);
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
		if (this.startLeft < this.left) {
			this.previous();
		} else {
			this.next();
		}
		this.startLeft = undefined;
		this.startPageX = undefined;
		this.currentElement;
		this.previousElement;
		this.nextElement;
		this.previousElementStartLeft;
		this.nextElementStartLeft;
		this.previousElementLeft;
		this.nextElementLeft;
	};

	render() {
		const {
			children,
			className,
			previousButton = 'previous',
			nextButton = 'next',
		} = this.props;
		const { classNames, currentSlideIndex } = this.state;
		const isDisabled = this.isDisabled();
		return (
			<div className={className} ref={ref => this.sliderRef = ref}>
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
							onTouchStart: !isDisabled ? this.handleTouchStart : undefined,
							onTouchEnd: !isDisabled ? this.handleTouchEnd : undefined,
							className:
								classNames.slide +
								' ' +
								this.getSlideClass(index) +
								addClassname(item.props.className)
						})
					)}
				</div>
			</div>
		);
	}
}
export default Slider;
