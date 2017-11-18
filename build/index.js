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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PREVIOUS = 'previous';
var NEXT = 'next';

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
		    classNames = _this$props$className === undefined ? {
			slide: 'slide',
			hidden: 'hidden',
			previous: 'previous',
			current: 'current',
			next: 'next',
			animateIn: 'animateIn',
			animateOut: 'animateOut'
		} : _this$props$className;

		_this.state = {
			currentSlideIndex: slideIndex,
			classNames: classNames,
			animating: false
		};
		_this.animatedSlideCount = 0;
		return _this;
	}

	_createClass(Slider, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var children = this.props.children;
			var classNames = this.state.classNames;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'button',
					{ onClick: this.previous },
					'prev'
				),
				_react2.default.createElement(
					'button',
					{ onClick: this.next },
					'next'
				),
				_react2.default.createElement(
					'div',
					{ className: 'track' },
					_react2.default.Children.map(children, function (item, index) {
						return _react2.default.cloneElement(item, {
							key: index,
							onAnimationEnd: _this2.onAnimationEnd,
							className: item.props.className + ' ' + classNames.slide + ' ' + _this2.getSlideClass(index)
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

	this.onAnimationEnd = function (event) {
		_this3.animatedSlideCount = _this3.animatedSlideCount + 1;
		if (_this3.animatedSlideCount === 2) {
			_this3.setState({
				currentSlideIndex: _this3.nextSlideIndex,
				animating: false,
				animation: undefined
			});
		}
	};

	this.goTo = function (index, animation) {
		if (_this3.state.animating) return;
		_this3.nextSlideIndex = index; // todo simplify logic into prev/next functions
		_this3.animatedSlideCount = 0;
		_this3.setState({ animating: true, animation: animation });
	};

	this.previous = function () {
		var nextSlideIndex = _this3.state.currentSlideIndex - 1;
		var actualNextSlide = nextSlideIndex > 0 ? nextSlideIndex : _this3.props.children.length - 1;
		_this3.goTo(actualNextSlide, PREVIOUS);
	};

	this.next = function () {
		var nextSlideIndex = (_this3.state.currentSlideIndex + 1) % _this3.props.children.length;
		_this3.goTo(nextSlideIndex, NEXT);
	};

	this.getSlideClass = function (index) {
		var _state = _this3.state,
		    currentSlideIndex = _state.currentSlideIndex,
		    classNames = _state.classNames,
		    animating = _state.animating,
		    animation = _state.animation;

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
};

exports.default = Slider;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);