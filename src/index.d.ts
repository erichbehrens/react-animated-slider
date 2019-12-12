interface ISliderProps {
  children: React.ReactElement[];
  slideIndex?: number;
  duration?: number;
  disabled?: boolean;
  infinite?: boolean;
  autoplay?: number;
  touchDisabled?: boolean;
  minSwipeOffset?: number;
  previousButton?: React.ReactElement;
  nextButton?: React.ReactElement;
  classNames?: IClassNames;
}

interface IClassNames {
  slider?: string;
  previousButton?: string;
  nextButton?: string;
  buttonDisabled?: string;
  track?: string;
  slide?: string;
  hidden?: string;
  previous?: string;
  next?: string;
  animateIn?: string;
  animateOut?: string;
}

declare module "react-animated-slider" {
  import React from "react";

  class Slider extends React.Component<
    ISliderProps & JSX.IntrinsicElements["div"]
  > {}

  export = Slider;
}
