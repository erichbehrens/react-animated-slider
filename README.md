# react-animated-slider

[![npm version](https://img.shields.io/npm/v/react-animated-slider.svg)](https://www.npmjs.com/package/react-animated-slider)
[![downloads](https://img.shields.io/npm/dt/react-animated-slider.svg)](https://www.npmjs.com/package/react-animated-slider)
[![Greenkeeper badge](https://badges.greenkeeper.io/erichbehrens/react-animated-slider.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/erichbehrens/react-animated-slider/tree/master.svg?style=shield)](https://circleci.com/gh/erichbehrens/react-animated-slider/tree/master)
[![dependencies](https://david-dm.org/erichbehrens/react-animated-slider.svg)](https://david-dm.org/erichbehrens/react-animated-slider)
[![devDependencies](https://david-dm.org/erichbehrens/react-animated-slider/dev-status.svg)](https://david-dm.org/erichbehrens/react-animated-slider?type=dev)

A Slider/Carousel component for React supporting custom css animations.

[Demo](https://erichbehrens.github.io/react-animated-slider/) - [Codesandbox Playground](https://codesandbox.io/s/p582xl40j)

![Preview](https://res.cloudinary.com/riangle/image/upload/v1511700118/react-animated-slider_qqedfm.png)

## Features:

- Ready to use slider component with animations
- Easy customization
- Horizontal or vertical navigation
- Swipe navigation on touch devices
- Infinite slider
- Autoplay
- Supports any element as children
- Clean DOM without dirty manipulations
- Support for CSS modules
- Works with SSR
- Works on IE11

## Install:

```
npm install react-animated-slider --save
```

## Most Simple Use:

```jsx
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

<Slider>
  {content.map((article, index) => <div key={index}>
    <h2>{article.title}</h2>
    <div>{article.description}</div>
  </div>)}
</Slider>
```

## Properties:

**slideIndex** - `number`, default `0`

Index of the slide that will be initially displayed.

**duration** - `number`, default `2000`(ms)

Duration of the animation in milliseconds. It is used to remove the `animateIn` and `animateOut` classNames and assign `current` after the transition has completed.

**disabled** - `boolean`, default `false`

Disable slider navigation

**infinite** - `boolean`, default `true`

Enable or disable infinite loop through slides. Sliders with only 2 children will have this option set to `false`

**autoplay** - `number`, default `undefined`

Autoplay interval in miliseconds. If `undefined` the slider will not play automatically. The timer will be paused and reset during user interactions such as mouse over or touch, to avoid sliding away the elements when the user wants to click them.

**touchDisabled** `boolean`, default `false`

Disable slider navigation through touch events

**minSwipeOffset** - `number`, default `15`(px)

Minimum distance to swipe for triggering a navigation event

**previousButton** - `ReactElement`, default is an arrow svg

Will be rendered inside the previous button

**nextButton** - `ReactElement`, default is an arrow svg

Will be rendered inside the next button

**onSlideChange** - `function`, called after the current slide has changed; receives an object with the new slide index as argument:

```js
<Slider onSlideChange={event => console.log(event.slideIndex)}>
```

**classNames** `object`, default

```js
{
  slider: 'slider',
  previousButton: 'previousButton',
  nextButton: 'nextButton',
  buttonDisabled: 'disabled',
  track: 'track',
  slide: 'slide',
  hidden: 'hidden',
  previous: 'previous',
  current: 'current',
  next: 'next',
  animateIn: 'animateIn',
  animateOut: 'animateOut',
}
```

Object representing the CSS classNames that will be apllied to the slides.

### Classnames

**slider** the classname for the whole Slider element

**previousButton** previous button

**nextButton** next button

**buttonDisabled** disabled state for previous and next button

**track** element wrapping all slides

**slide** apllied to every item (child)

**hidden** a slide that is not visible and is not adjacent to the current slide, therefore no animation will be usually needed

**previous** the slide that will appear or is appearing when the slider navigated back

**next** the slide that will appear or is appearing when the slider navigated forward

**animateIn** the slide moving into the view

**animateOut** the slide moving out of the view
