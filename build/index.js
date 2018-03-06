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

		_this.setupAutoplay = function () {
			if (_this.props.autoplay && !_this.isMouseOver) {
				_this.stopAutoplay();
				_this.autoplayTimerId = setInterval(_this.next, parseInt(_this.props.autoplay, 10));
			}
		};

		_this.stopAutoplay = function () {
			if (_this.autoplayTimerId) {
				clearInterval(_this.autoplayTimerId);
			}
		};

		_this.onAnimationEnd = function () {
			_this.setState({
				currentSlideIndex: _this.nextSlideIndex,
				animating: false,
				animation: undefined
			});
			_this.setupAutoplay();
		};

		_this.isDisabled = function () {
			return _this.slideCount < 2 || _this.state.animating || _this.props.disabled;
		};

		_this.isInfinite = function () {
			return _this.slideCount > 2 && _this.props.infinite !== false;
		};

		_this.canGoPrevious = function () {
			return _this.isInfinite() || _this.state.currentSlideIndex > 0;
		};

		_this.canGoNext = function () {
			return _this.isInfinite() || _this.state.currentSlideIndex < _this.slideCount - 1;
		};

		_this.goTo = function (index, animation) {
			if (_this.isDisabled()) return;
			_this.nextSlideIndex = index;
			_this.setState({ animating: true, animation: animation });
			setTimeout(_this.onAnimationEnd, _this.props.duration || DEFAULT_DURATION);
		};

		_this.previous = function () {
			if (!_this.canGoPrevious()) return;
			var nextSlideIndex = _this.state.currentSlideIndex - 1;
			var actualNextSlide = nextSlideIndex >= 0 ? nextSlideIndex : _this.slideCount - 1;
			_this.goTo(actualNextSlide, PREVIOUS);
		};

		_this.next = function () {
			if (!_this.canGoNext()) return;
			var nextSlideIndex = (_this.state.currentSlideIndex + 1) % _this.slideCount;
			_this.goTo(nextSlideIndex, NEXT);
		};

		_this.getSlideClass = function (index) {
			var _this$state = _this.state,
			    currentSlideIndex = _this$state.currentSlideIndex,
			    animation = _this$state.animation;

			var classNames = _this.getClassNames();
			var lastSlideIndex = _this.slideCount - 1;
			if (index === currentSlideIndex) {
				if (animation) return classNames.animateOut + ' ' + classNames[animation];
				return classNames.current;
			} else if (_this.slideCount === 2) {
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

		_this.isSwiping = false;

		_this.handleTouchStart = function (e) {
			if (_this.isDisabled()) return;
			_this.stopAutoplay();

			var _this$getClassNames = _this.getClassNames(),
			    current = _this$getClassNames.current,
			    previous = _this$getClassNames.previous,
			    next = _this$getClassNames.next;

			var touch = e.touches[0];
			_this.isSwiping = true;
			_this.pageStartPosition = touch[_this.swipeEventProperty];
			/* eslint-disable prefer-destructuring */
			_this.currentElement = _this.sliderRef.getElementsByClassName(current)[0];
			_this.previousElement = _this.sliderRef.getElementsByClassName(previous)[0];
			_this.nextElement = _this.sliderRef.getElementsByClassName(next)[0];
			/* eslint-enable prefer-destructuring */
			var touchDelta = _this.currentElement.getBoundingClientRect()[_this.swipeProperty];
			_this.currentElementStartPosition = 0;
			_this.currentElementPosition = 0;
			_this.currentElement.style.transition = 'none';
			if (_this.previousElement) {
				_this.previousElement.style.transition = 'none';
				_this.previousElement.style.visibility = 'visible';
				// eslint-disable-next-line max-len
				_this.previousElementStartPosition = _this.previousElement.getBoundingClientRect()[_this.swipeProperty] - touchDelta;
			}
			if (_this.nextElement) {
				_this.nextElement.style.visibility = 'visible';
				_this.nextElement.style.transition = 'none';
				// eslint-disable-next-line max-len
				_this.nextElementStartPosition = _this.nextElement.getBoundingClientRect()[_this.swipeProperty] - touchDelta;
			}
		};

		_this.animating = false;

		_this.handleTouchMove = function (e) {
			e.preventDefault();
			_this.animating = _this.animating || requestAnimationFrame(function () {
				if (!_this.isSwiping) {
					_this.animating = false;
					return;
				}
				var touch = e.touches[0];
				var newLeft = touch[_this.swipeEventProperty] - _this.pageStartPosition;
				_this.currentElementPosition = _this.currentElementStartPosition + newLeft;
				_this.currentElement.style[_this.swipeProperty] = _this.currentElementPosition + 'px';
				if (_this.previousElement) {
					_this.previousElementPosition = _this.previousElementStartPosition + newLeft;
					_this.previousElement.style[_this.swipeProperty] = _this.previousElementPosition + 'px';
				}
				if (_this.nextElement) {
					_this.nextElementPosition = _this.nextElementStartPosition + newLeft;
					_this.nextElement.style[_this.swipeProperty] = _this.nextElementPosition + 'px';
				}
				_this.animating = false;
			});
		};

		_this.handleTouchEnd = function () {
			_this.animating = false;
			_this.isSwiping = false;
			_this.currentElement.style.removeProperty(_this.swipeProperty);
			_this.currentElement.style.removeProperty('transition');
			if (_this.previousElement) {
				_this.previousElement.style.removeProperty('visibility');
				_this.previousElement.style.removeProperty('transition');
				_this.previousElement.style.removeProperty(_this.swipeProperty);
			}
			if (_this.nextElement) {
				_this.nextElement.style.removeProperty('visibility');
				_this.nextElement.style.removeProperty('transition');
				_this.nextElement.style.removeProperty(_this.swipeProperty);
			}
			var touchDelta = _this.currentElementStartPosition - _this.currentElementPosition;
			var minSwipeOffset = _this.props.minSwipeOffset || 15;
			if (Math.abs(touchDelta) > minSwipeOffset) {
				if (touchDelta < 0) {
					_this.previous();
				} else {
					_this.next();
				}
			} else {
				_this.setupAutoplay();
			}
		};

		_this.getClassNames = function () {
			return _extends({}, DEFAULT_CLASSNAMES, _this.props.classNames);
		};

		_this.initTouchEvents = function (sliderRef) {
			if (_this.isDisabled() || !sliderRef) return;
			_this.sliderRef = sliderRef;
			_this.sliderRef.addEventListener('touchstart', _this.handleTouchStart);
			_this.sliderRef.addEventListener('touchmove', _this.handleTouchMove, {
				passive: false
			});
			_this.sliderRef.addEventListener('touchend', _this.handleTouchEnd);
		};

		_this.handleMouseOver = function () {
			_this.isMouseOver = true;
			_this.stopAutoplay();
		};

		_this.handleMouseOut = function () {
			_this.isMouseOver = false;
			_this.setupAutoplay();
		};

		var _this$props = _this.props,
		    _this$props$slideInde = _this$props.slideIndex,
		    slideIndex = _this$props$slideInde === undefined ? 0 : _this$props$slideInde,
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

exports.default = Slider;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);