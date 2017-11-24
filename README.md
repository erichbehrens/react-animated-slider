# react-animated-slider
Animated slider component for react

## [Demo](https://p582xl40j.codesandbox.io/)
[Playground](https://codesandbox.io/s/p582xl40j)

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
**slideIndex** - number, default 0

Index of the slide that will be initially displayed.

**previousButton** - ReactElement, default "previous"

Will be rendered inside the previous button

**nextButton** - ReactElement, default "next"

Will be rendered inside the next button

**classNames** object, default

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

CSS classnames that will be apllied to the slides.

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
