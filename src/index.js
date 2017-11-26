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
	animateOut: 'animateOut'
};

function addClassname(value) {
	return value ? ` ${value}` : '';
}

class Slider extends React.PureComponent {
	constructor(props) {
		super(props);
		const { slideIndex = 0, classNames = {}, duration = 2000 } = this.props;
		this.state = {
			currentSlideIndex: slideIndex,
			classNames: { ...DEFAULT_CLASSNAMES, ...classNames },
			animating: false,
			duration,
		};
		this.animatedSlideCount = 0;
	}

	onAnimationEnd = () => {
		this.setState({
			currentSlideIndex: this.nextSlideIndex,
			animating: false,
			animation: undefined
		});
	};

	goTo = (index, animation) => {
		if (this.state.animating) return;
		this.nextSlideIndex = index;
		this.setState({ animating: true, animation });
		setTimeout(this.onAnimationEnd, this.state.duration);
	};

	previous = () => {
		const nextSlideIndex = this.state.currentSlideIndex - 1;
		const actualNextSlide =
			nextSlideIndex >= 0 ? nextSlideIndex : this.props.children.length - 1;
		this.goTo(actualNextSlide, PREVIOUS);
	};

	next = () => {
		const nextSlideIndex =
			(this.state.currentSlideIndex + 1) % this.props.children.length;
		this.goTo(nextSlideIndex, NEXT);
	};

	getSlideClass = index => {
		const { currentSlideIndex, classNames, animating, animation } = this.state;
		const lastSlideIndex = this.props.children.length - 1;
		if (index === currentSlideIndex) {
			if (animation) return `${classNames.animateOut} ${classNames[animation]}`;
			return classNames.current;
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

	startPageX;
	startLeft;
	left = 0;

	previousElement;
	nextElement;
	previousElementStartLeft;
	nextElementStartLeft;
	previousElementLeft;
	nextElementLeft;

	handleTouchStart = e => {
		const { previous, next } = this.state.classNames;
		const touch = e.touches[0];
		this.startPageX = touch.pageX;
		this.startLeft = e.target.getBoundingClientRect().left;
		this.previousElement = document.getElementsByClassName(previous)[0];
		this.nextElement = document.getElementsByClassName(next)[0];
		this.previousElementStartLeft = this.previousElement.getBoundingClientRect().left;
		this.nextElementStartLeft = this.nextElement.getBoundingClientRect().left;
		e.currentTarget.addEventListener('touchmove', this.handleTouchMove, {
			passive: false
		});
		e.target.style.transition = `none`;
		this.previousElement.style.transition = `none`;
		this.nextElement.style.transition = `none`;
		this.previousElement.style.visibility = `visible`;
		this.nextElement.style.visibility = `visible`;
	};

	animating = false;
	handleTouchMove = e => {
		e.preventDefault();
		this.animating =
			this.animating ||
			requestAnimationFrame(() => {
				const touch = e.touches[0];
				this.left = this.startLeft + touch.pageX - this.startPageX;
				this.previousElementLeft =
					this.previousElementStartLeft + touch.pageX - this.startPageX;
				this.nextElementLeft =
					this.nextElementStartLeft + touch.pageX - this.startPageX;
				e.target.style.left = `${this.left}px`;
				this.previousElement.style.left = `${this.previousElementLeft}px`;
				this.nextElement.style.left = `${this.nextElementLeft}px`;
				this.animating = false;
			});
	};

	handleTouchEnd = e => {
		e.currentTarget.removeEventListener('touchmove', this.handleTouchMove);
		console.log('this.startLeft < this.left', this.startLeft, this.left);
		e.target.style.removeProperty('left');
		e.target.style.removeProperty('transition');
		this.previousElement.style.removeProperty('visibility');
		this.nextElement.style.removeProperty('visibility');
		this.previousElement.style.removeProperty('transition');
		this.nextElement.style.removeProperty('transition');
		this.previousElement.style.removeProperty('left');
		this.nextElement.style.removeProperty('left');
		if (this.startLeft < this.left) {
			this.previous();
		} else {
			this.next();
		}
		this.startLeft = undefined;
		this.startPageX = undefined;
	};

	render() {
		const {
			children,
			className,
			previousButton = 'previous',
			nextButton = 'next'
		} = this.props;
		const { classNames, animating } = this.state;
		return (
			<div className={className}>
				<button
					onClick={this.previous}
					className={classNames.previousButton}
					disabled={animating}
				>
					{previousButton}
				</button>
				<button
					onClick={this.next}
					className={classNames.nextButton}
					disabled={animating}
				>
					{nextButton}
				</button>
				<div className={classNames.track}>
					{React.Children.map(children, (item, index) =>
						React.cloneElement(item, {
							key: index,
							onTouchStart: this.handleTouchStart,
							onTouchEnd: this.handleTouchEnd,
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
