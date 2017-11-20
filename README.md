# react-animated-slider
Animated slider component for react

## Install:

```
npm install react-animated-slider --save
```

## Most Simple Use:

```jsx
import Slider from 'react-animated-slider';
<Slider>
  {content.map((article, index) => <div key={index}>
    <h2>{article.title}</h2>
    <div>{article.description}</div>
  </div>)}
</Slider>
```
## Properties:
**slideIndex** - default 0

Index of the slide that will be initially displayed.

**classNames**

default

```js
{
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

**slide** apllied to every item (child)

**hidden** a slide that is not visible and is not adjacent to the current slide, therefore no animation will be usually needed

**previous** the slide that will appear or is appearing when the slider navigated back

**next** the slide that will appear or is appearing when the slider navigated forward

**animateIn** the slide moving into the view

**animateOut** the slide moving out of the view