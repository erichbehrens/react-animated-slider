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

function addClassname(value) {
	return value ? ' ' + value : '';
}

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
		    _this$props$duration = _this$props.duration,
		    duration = _this$props$duration === undefined ? 2000 : _this$props$duration;

		_this.state = {
			currentSlideIndex: slideIndex,
			classNames: _extends({}, DEFAULT_CLASSNAMES, classNames),
			animating: false,
			duration: duration
		};
		_this.animatedSlideCount = 0;
		return _this;
	}

	_createClass(Slider, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    _props$previousButton = _props.previousButton,
			    previousButton = _props$previousButton === undefined ? 'previous' : _props$previousButton,
			    _props$nextButton = _props.nextButton,
			    nextButton = _props$nextButton === undefined ? 'next' : _props$nextButton;
			var _state = this.state,
			    classNames = _state.classNames,
			    animating = _state.animating;

			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'button',
					{
						onClick: this.previous,
						className: classNames.previousButton,
						disabled: animating
					},
					previousButton
				),
				_react2.default.createElement(
					'button',
					{
						onClick: this.next,
						className: classNames.nextButton,
						disabled: animating
					},
					nextButton
				),
				_react2.default.createElement(
					'div',
					{ className: classNames.track },
					_react2.default.Children.map(children, function (item, index) {
						return _react2.default.cloneElement(item, {
							key: index,
							onTouchStart: _this2.handleTouchStart,
							onTouchEnd: _this2.handleTouchEnd,
							className: classNames.slide + ' ' + _this2.getSlideClass(index) + addClassname(item.props.className)
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

	this.onAnimationEnd = function () {
		_this3.setState({
			currentSlideIndex: _this3.nextSlideIndex,
			animating: false,
			animation: undefined
		});
	};

	this.goTo = function (index, animation) {
		if (_this3.state.animating) return;
		_this3.nextSlideIndex = index;
		_this3.setState({ animating: true, animation: animation });
		setTimeout(_this3.onAnimationEnd, _this3.state.duration);
	};

	this.previous = function () {
		var nextSlideIndex = _this3.state.currentSlideIndex - 1;
		var actualNextSlide = nextSlideIndex >= 0 ? nextSlideIndex : _this3.props.children.length - 1;
		_this3.goTo(actualNextSlide, PREVIOUS);
	};

	this.next = function () {
		var nextSlideIndex = (_this3.state.currentSlideIndex + 1) % _this3.props.children.length;
		_this3.goTo(nextSlideIndex, NEXT);
	};

	this.getSlideClass = function (index) {
		var _state2 = _this3.state,
		    currentSlideIndex = _state2.currentSlideIndex,
		    classNames = _state2.classNames,
		    animating = _state2.animating,
		    animation = _state2.animation;

		var lastSlideIndex = _this3.props.children.length - 1;
		if (index === currentSlideIndex) {
			if (animation) return classNames.animateOut + ' ' + classNames[animation];
			return classNames.current;
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

	this.left = 0;

	this.handleTouchStart = function (e) {
		if (_this3.state.animating) return;
		var _classNames = classNames,
		    previous = _classNames.previous,
		    next = _classNames.next;

		var touch = e.touches[0];
		_this3.startPageX = touch.pageX;
		_this3.startLeft = e.target.getBoundingClientRect().left;
		_this3.previousElement = document.getElementsByClassName(previous)[0];
		_this3.nextElement = document.getElementsByClassName(next)[0];
		_this3.previousElementStartLeft = _this3.previousElement.getBoundingClientRect().left;
		_this3.nextElementStartLeft = _this3.nextElement.getBoundingClientRect().left;
		e.currentTarget.addEventListener('touchmove', _this3.handleTouchMove, {
			passive: false
		});
		e.target.style.transition = 'none';
		_this3.previousElement.style.transition = 'none';
		_this3.nextElement.style.transition = 'none';
		_this3.previousElement.style.visibility = 'visible';
		_this3.nextElement.style.visibility = 'visible';
	};

	this.animating = false;

	this.handleTouchMove = function (e) {
		e.preventDefault();
		_this3.animating = _this3.animating || requestAnimationFrame(function () {
			var touch = e.touches[0];
			_this3.left = _this3.startLeft + touch.pageX - _this3.startPageX;
			_this3.previousElementLeft = _this3.previousElementStartLeft + touch.pageX - _this3.startPageX;
			_this3.nextElementLeft = _this3.nextElementStartLeft + touch.pageX - _this3.startPageX;
			e.target.style.left = _this3.left + 'px';
			_this3.previousElement.style.left = _this3.previousElementLeft + 'px';
			_this3.nextElement.style.left = _this3.nextElementLeft + 'px';
			_this3.animating = false;
		});
	};

	this.handleTouchEnd = function (e) {
		e.currentTarget.removeEventListener('touchmove', _this3.handleTouchMove);
		console.log('this.startLeft < this.left', _this3.startLeft, _this3.left);
		e.target.style.removeProperty('left');
		e.target.style.removeProperty('transition');
		_this3.previousElement.style.removeProperty('visibility');
		_this3.nextElement.style.removeProperty('visibility');
		_this3.previousElement.style.removeProperty('transition');
		_this3.nextElement.style.removeProperty('transition');
		_this3.previousElement.style.removeProperty('left');
		_this3.nextElement.style.removeProperty('left');
		if (_this3.startLeft < _this3.left) {
			_this3.previous();
		} else {
			_this3.next();
		}
		_this3.startLeft = undefined;
		_this3.startPageX = undefined;
	};
};

exports.default = Slider;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);