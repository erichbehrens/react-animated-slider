module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VERTICAL = exports.HORIZONTAL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PREVIOUS = 'previous';
var NEXT = 'next';

var HORIZONTAL = exports.HORIZONTAL = 'horizontal';
var VERTICAL = exports.VERTICAL = 'vertical';

var DEFAULT_CLASSNAMES = {
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
var DEFAULT_DURATION = 2000;

var Slider = function (_React$PureComponent) {
	_inherits(Slider, _React$PureComponent);

	function Slider(props) {
		_classCallCheck(this, Slider);

		var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

		_initialiseProps.call(_this);

		var _this$props = _this.props,
		    _this$props$slideInde = _this$props.slideIndex,
		    slideIndex = _this$props$slideInde === undefined ? 0 : _this$props$slideInde,
		    _this$props$className = _this$props.classNames,
		    classNames = _this$props$className === undefined ? {} : _this$props$className,
		    _this$props$direction = _this$props.direction,
		    direction = _this$props$direction === undefined ? HORIZONTAL : _this$props$direction;

		_this.state = {
			currentSlideIndex: slideIndex,
			animating: false
		};
		_this.slideCount = _react2.default.Children.count(_this.props.children);
		_this.swipeProperty = direction === HORIZONTAL ? 'left' : 'top';
		_this.swipeEventProperty = direction === HORIZONTAL ? 'clientX' : 'clientY';
		return _this;
	}

	_createClass(Slider, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setupAutoplay();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.stopAutoplay();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    _props$previousButton = _props.previousButton,
			    previousButton = _props$previousButton === undefined ? 'previous' : _props$previousButton,
			    _props$nextButton = _props.nextButton,
			    nextButton = _props$nextButton === undefined ? 'next' : _props$nextButton,
			    autoplay = _props.autoplay;

			var classNames = this.getClassNames();
			var isDisabled = this.isDisabled();
			return _react2.default.createElement(
				'div',
				_extends({
					className: className,
					ref: this.initTouchEvents
				}, autoplay && {
					onMouseOver: this.handleMouseOver,
					onMouseOut: this.handleMouseOut
				}),
				_react2.default.createElement(
					'button',
					{
						onClick: this.previous,
						className: classNames.previousButton,
						disabled: isDisabled || !this.canGoPrevious()
					},
					previousButton
				),
				_react2.default.createElement(
					'button',
					{
						onClick: this.next,
						className: classNames.nextButton,
						disabled: isDisabled || !this.canGoNext()
					},
					nextButton
				),
				_react2.default.createElement(
					'div',
					{ className: classNames.track },
					_react2.default.Children.map(children, function (item, index) {
						return _react2.default.cloneElement(item, {
							key: index,
							className: [classNames.slide, _this2.getSlideClass(index), item.props.className].filter(function (v) {
								return v;
							}).join(' ')
						});
					})
				)
			);
		}
	}]);

	return Slider;
}(_react2.default.PureComponent);

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.setupAutoplay = function () {
		if (_this3.props.autoplay && !_this3.isMouseOver) {
			_this3.stopAutoplay();
			_this3.autoplayTimerId = setInterval(_this3.next, parseInt(_this3.props.autoplay));
		}
	};

	this.stopAutoplay = function () {
		if (_this3.autoplayTimerId) {
			clearInterval(_this3.autoplayTimerId);
		}
	};

	this.onAnimationEnd = function () {
		_this3.setState({
			currentSlideIndex: _this3.nextSlideIndex,
			animating: false,
			animation: undefined
		});
		_this3.setupAutoplay();
	};

	this.isDisabled = function () {
		return _this3.slideCount < 2 || _this3.state.animating || _this3.props.disabled;
	};

	this.isInfinite = function () {
		return _this3.slideCount > 2 && _this3.props.infinite !== false;
	};

	this.canGoPrevious = function () {
		return _this3.isInfinite() || _this3.state.currentSlideIndex > 0;
	};

	this.canGoNext = function () {
		return _this3.isInfinite() || _this3.state.currentSlideIndex < _this3.slideCount - 1;
	};

	this.goTo = function (index, animation) {
		if (_this3.isDisabled()) return;
		_this3.nextSlideIndex = index;
		_this3.setState({ animating: true, animation: animation });
		setTimeout(_this3.onAnimationEnd, _this3.props.duration || DEFAULT_DURATION);
	};

	this.previous = function () {
		if (!_this3.canGoPrevious()) return;
		var nextSlideIndex = _this3.state.currentSlideIndex - 1;
		var actualNextSlide = nextSlideIndex >= 0 ? nextSlideIndex : _this3.slideCount - 1;
		_this3.goTo(actualNextSlide, PREVIOUS);
	};

	this.next = function () {
		if (!_this3.canGoNext()) return;
		var nextSlideIndex = (_this3.state.currentSlideIndex + 1) % _this3.slideCount;
		_this3.goTo(nextSlideIndex, NEXT);
	};

	this.getSlideClass = function (index) {
		var _state = _this3.state,
		    currentSlideIndex = _state.currentSlideIndex,
		    animation = _state.animation;

		var classNames = _this3.getClassNames();
		var lastSlideIndex = _this3.slideCount - 1;
		if (index === currentSlideIndex) {
			if (animation) return classNames.animateOut + ' ' + classNames[animation];
			return classNames.current;
		} else if (_this3.slideCount === 2) {
			if (animation) return classNames.animateIn + ' ' + classNames[animation];
			return index < currentSlideIndex ? classNames.previous : classNames.next;
		} else if (index === currentSlideIndex - 1 || currentSlideIndex === 0 && index === lastSlideIndex) {
			if (animation === PREVIOUS) return classNames.animateIn + ' ' + classNames.previous;
			if (animation === NEXT) return classNames.hidden;
			return classNames.previous;
		} else if (index === currentSlideIndex + 1 || index === 0 && currentSlideIndex === lastSlideIndex) {
			if (animation === NEXT) return classNames.animateIn + ' ' + classNames.next;
			if (animation === PREVIOUS) return classNames.hidden;
			return classNames.next;
		}
		return classNames.hidden;
	};

	this.isSwiping = false;

	this.handleTouchStart = function (e) {
		if (_this3.isDisabled()) return;
		_this3.stopAutoplay();

		var _getClassNames = _this3.getClassNames(),
		    current = _getClassNames.current,
		    previous = _getClassNames.previous,
		    next = _getClassNames.next;

		var touch = e.touches[0];
		_this3.isSwiping = true;
		_this3.pageStartPosition = touch[_this3.swipeEventProperty];
		_this3.currentElement = _this3.sliderRef.getElementsByClassName(current)[0];
		_this3.previousElement = _this3.sliderRef.getElementsByClassName(previous)[0];
		_this3.nextElement = _this3.sliderRef.getElementsByClassName(next)[0];
		var touchDelta = _this3.currentElement.getBoundingClientRect()[_this3.swipeProperty];
		_this3.currentElementStartPosition = 0;
		_this3.currentElementPosition = 0;
		_this3.currentElement.style.transition = 'none';
		if (_this3.previousElement) {
			_this3.previousElement.style.transition = 'none';
			_this3.previousElement.style.visibility = 'visible';
			_this3.previousElementStartPosition = _this3.previousElement.getBoundingClientRect()[_this3.swipeProperty] - touchDelta;
		}
		if (_this3.nextElement) {
			_this3.nextElement.style.visibility = 'visible';
			_this3.nextElement.style.transition = 'none';
			_this3.nextElementStartPosition = _this3.nextElement.getBoundingClientRect()[_this3.swipeProperty] - touchDelta;
		}
	};

	this.animating = false;

	this.handleTouchMove = function (e) {
		e.preventDefault();
		_this3.animating = _this3.animating || requestAnimationFrame(function () {
			if (!_this3.isSwiping) {
				_this3.animating = false;
				return;
			}
			var touch = e.touches[0];
			var newLeft = touch[_this3.swipeEventProperty] - _this3.pageStartPosition;
			_this3.currentElementPosition = _this3.currentElementStartPosition + newLeft;
			_this3.currentElement.style[_this3.swipeProperty] = _this3.currentElementPosition + 'px';
			if (_this3.previousElement) {
				_this3.previousElementPosition = _this3.previousElementStartPosition + newLeft;
				_this3.previousElement.style[_this3.swipeProperty] = _this3.previousElementPosition + 'px';
			}
			if (_this3.nextElement) {
				_this3.nextElementPosition = _this3.nextElementStartPosition + newLeft;
				_this3.nextElement.style[_this3.swipeProperty] = _this3.nextElementPosition + 'px';
			}
			_this3.animating = false;
		});
	};

	this.handleTouchEnd = function () {
		_this3.animating = false;
		_this3.isSwiping = false;
		_this3.currentElement.style.removeProperty(_this3.swipeProperty);
		_this3.currentElement.style.removeProperty('transition');
		if (_this3.previousElement) {
			_this3.previousElement.style.removeProperty('visibility');
			_this3.previousElement.style.removeProperty('transition');
			_this3.previousElement.style.removeProperty(_this3.swipeProperty);
		}
		if (_this3.nextElement) {
			_this3.nextElement.style.removeProperty('visibility');
			_this3.nextElement.style.removeProperty('transition');
			_this3.nextElement.style.removeProperty(_this3.swipeProperty);
		}
		var touchDelta = _this3.currentElementStartPosition - _this3.currentElementPosition;
		var minSwipeOffset = _this3.props.minSwipeOffset || 15;
		if (Math.abs(touchDelta) > minSwipeOffset) {
			if (touchDelta < 0) {
				_this3.previous();
			} else {
				_this3.next();
			}
		} else {
			_this3.setupAutoplay();
		}
	};

	this.getClassNames = function () {
		return _extends({}, DEFAULT_CLASSNAMES, _this3.props.classNames);
	};

	this.initTouchEvents = function (sliderRef) {
		if (_this3.isDisabled() || !sliderRef) return;
		_this3.sliderRef = sliderRef;
		_this3.sliderRef.addEventListener('touchstart', _this3.handleTouchStart);
		_this3.sliderRef.addEventListener('touchmove', _this3.handleTouchMove, {
			passive: false
		});
		_this3.sliderRef.addEventListener('touchend', _this3.handleTouchEnd);
	};

	this.handleMouseOver = function () {
		_this3.isMouseOver = true;
		_this3.stopAutoplay();
	};

	this.handleMouseOut = function () {
		_this3.isMouseOver = false;
		_this3.setupAutoplay();
	};
};

exports.default = Slider;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);