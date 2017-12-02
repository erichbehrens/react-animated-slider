# react-animated-slider

[![CircleCI](https://circleci.com/gh/erichbehrens/react-animated-slider/tree/master.svg?style=shield)](https://circleci.com/gh/erichbehrens/react-animated-slider/tree/master)
[![dependencies](https://david-dm.org/erichbehrens/react-animated-slider.svg)](https://david-dm.org/erichbehrens/react-animated-slider)
[![devDependencies](https://david-dm.org/erichbehrens/react-animated-slider/dev-status.svg)](https://david-dm.org/erichbehrens/react-animated-slider#info=devDependencies)

Animated slider component for react.

[Demo](https://p582xl40j.codesandbox.io/) - [Playground](https://codesandbox.io/s/p582xl40j)

![Preview](https://res.cloudinary.com/riangle/image/upload/v1511700118/react-animated-slider_qqedfm.png)

## Features:
- Ready to use slider component with animations
- Easy customization
- Horizontal or vertical navigation
- Swipe navigation on touch devices
- Infinite slider
- Supports any element as children
- Clean DOM without dirty manipulations
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

**previousButton** - `ReactElement`, default  `string "previous"`

Will be rendered inside the previous button

**nextButton** - `ReactElement`, default `string "next"`

Will be rendered inside the next button

**classNames** `object`, default

```js
{
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
}
```

Object representing the CSS classNames that will be apllied to the slides.

### Classnames

**previousButton**

**nextButton**

**track** element wrapping all slides

**slide** apllied to every item (child)

**hidden** a slide that is not visible and is not adjacent to the current slide, therefore no animation will be usually needed

**previous** the slide that will appear or is appearing when the slider navigated back

**next** the slide that will appear or is appearing when the slider navigated forward

**animateIn** the slide moving into the view

**animateOut** the slide moving out of the view
