import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Slider from '.';

jest.useFakeTimers();

test('mounts', () => {
	const slider = <Slider />;
	expect(slider).toBeDefined();
});

test('renders one child', () => {
	const slider = ReactTestRenderer.create(<Slider><div /></Slider>);
	expect(slider).toBeDefined();
	expect(slider.toJSON()).toMatchSnapshot();
	expect(slider.root.findByProps({ className: 'previousButton disabled' })).toBeDefined();
	expect(slider.root.findByProps({ className: 'nextButton disabled' })).toBeDefined();
});

test('renders two children', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	expect(slider).toBeDefined();
	expect(slider.toJSON()).toMatchSnapshot();
	expect(slider.root.findByProps({ className: 'previousButton disabled' })).toBeDefined();
	expect(slider.root.findByProps({ className: 'nextButton' })).toBeDefined();
});

test('renders three children', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /><div /></Slider>);
	expect(slider).toBeDefined();
	expect(slider.toJSON()).toMatchSnapshot();
});

test('with one child can not navigate to next', () => {
	const slider = ReactTestRenderer.create(<Slider><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().next();
	jest.runAllTimers();
	expect(initialSnapshot).toEqual(slider.toJSON());
	expect(slider.toJSON()).toMatchSnapshot();
});

test('with one child can not navigate to previuous', () => {
	const slider = ReactTestRenderer.create(<Slider><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().previous();
	jest.runAllTimers();
	expect(initialSnapshot).toEqual(slider.toJSON());
	expect(slider.toJSON()).toMatchSnapshot();
});

test('with two children can navigate to next', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().next();
	jest.runAllTimers();
	expect(initialSnapshot).not.toEqual(slider.toJSON());
	expect(slider.toJSON()).toMatchSnapshot();
});

test('with two children can navigate to next only once', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	slider.getInstance().next();
	jest.runAllTimers();
	const snapshot = slider.toJSON();
	slider.getInstance().next();
	jest.runAllTimers();
	expect(slider.root.findByProps({ className: 'previousButton' })).toBeDefined();
	expect(slider.root.findByProps({ className: 'nextButton disabled' })).toBeDefined();
	expect(snapshot).toEqual(slider.toJSON());
	expect(slider.toJSON()).toMatchSnapshot();
});

test('with two children can not navigate to previuous', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().previous();
	jest.runAllTimers();
	expect(initialSnapshot).toEqual(slider.toJSON());
	expect(slider.toJSON()).toMatchSnapshot();
});

test('animate next classNames', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().next();
	const animatedSnapshot = slider.toJSON();
	expect(animatedSnapshot).toMatchSnapshot();
	expect(animatedSnapshot).not.toEqual(initialSnapshot);
});

test('animate previous classNames', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().previous();
	const animatedSnapshot = slider.toJSON();
	expect(animatedSnapshot).toMatchSnapshot();
	expect(animatedSnapshot).not.toEqual(initialSnapshot);
});

test('setCurrentSlideByIndex changes current Slide', () => {
	const slider = ReactTestRenderer.create(<Slider><div>First Slide</div><div>Second Slide</div><div>Third Slide</div><div>Fourth Slide</div></Slider>);
	expect(slider.root.findByProps({className: "slide current"}).children).toEqual(['First Slide']);
	slider.getInstance().setCurrentSlideByIndex(1);
	expect(slider.root.findByProps({className: "slide current"}).children).toEqual(['Second Slide']);
	expect(slider.root.findByProps({className: "slide previous"}).children).toEqual(['First Slide']);
	expect(slider.root.findByProps({className: "slide next"}).children).toEqual(['Third Slide']);
	expect(slider.root.findByProps({className: "slide hidden"}).children).toEqual(['Fourth Slide']);
});

test('does not allow navigation while animating', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /><div /></Slider>);
	slider.getInstance().next();
	const animatedSnapshot = slider.toJSON();
	slider.getInstance().next();
	expect(animatedSnapshot).toEqual(slider.toJSON());
});

test('does not allow navigation if disabled', () => {
	const slider = ReactTestRenderer.create(<Slider disabled><div /><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	slider.getInstance().next();
	expect(initialSnapshot).toEqual(slider.toJSON());
	jest.runAllTimers();
	expect(initialSnapshot).toEqual(slider.toJSON());
});

test('test autoslide disabled', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	expect(setInterval).toHaveBeenCalledTimes(0);
	jest.runAllTimers();
	expect(initialSnapshot).toEqual(slider.toJSON());
});

test('onSlideChange should be called with new slide index', () => {
	const callback = jest.fn();
	const slider = ReactTestRenderer.create(<Slider onSlideChange={callback}><div /><div /></Slider>);
	slider.getInstance().next();
	jest.runAllTimers();
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0]).toHaveProperty('slideIndex', 1);
});

test('test autoslide enabled', () => {
	const autoplay = 2000;
	const slider = ReactTestRenderer.create(<Slider autoplay={autoplay}><div /><div /></Slider>);
	const initialSnapshot = slider.toJSON();
	expect(setInterval).toHaveBeenCalledTimes(1);
	jest.runTimersToTime(autoplay);
	jest.runOnlyPendingTimers();
	const animatedSnapshot = slider.toJSON();
	expect(animatedSnapshot).toMatchSnapshot();
	expect(animatedSnapshot).not.toEqual(initialSnapshot);
});

test('can handle adding children', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(2);
	slider.update(<Slider><div /><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(3);
});

test('can handle removing children', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(3);
	slider.update(<Slider><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(2);
});

test('should disable next button when reducing to one child', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	slider.update(<Slider><div /></Slider>);
	expect(slider.root.findByProps({ className: 'nextButton disabled' })).toBeDefined();
});

test('should disable next button when reducing to current slide', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /><div /></Slider>);
	slider.getInstance().setState({ currentSlideIndex: 1 });
	slider.update(<Slider><div /><div /></Slider>);
	expect(slider.root.findByProps({ className: 'nextButton disabled' })).toBeDefined();
});

test('should not reset currentSlideIndex when removing next slide(s)', () => {
	const slider = ReactTestRenderer.create(<Slider slideIndex={1}><div /><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(3);
	expect(slider.getInstance().state.currentSlideIndex).toBe(1);
	slider.update(<Slider><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(2);
	expect(slider.getInstance().state.currentSlideIndex).toBe(1);
});

test('should reset currentSlideIndex when removing current slide', () => {
	const slider = ReactTestRenderer.create(<Slider slideIndex={2}><div /><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(3);
	expect(slider.getInstance().state.currentSlideIndex).toBe(2);
	slider.update(<Slider><div /><div /></Slider>);
	expect(slider.getInstance().slideCount).toBe(2);
	expect(slider.getInstance().state.currentSlideIndex).toBe(0);
});
