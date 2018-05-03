import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Slider from './';

jest.useFakeTimers();

test('mounts', () => {
	const slider = <Slider />;
	expect(slider).toBeDefined();
});

test('renders one child', () => {
	const slider = ReactTestRenderer.create(<Slider><div /></Slider>);
	expect(slider).toBeDefined();
	expect(slider.toJSON()).toMatchSnapshot();
});

test('renders two children', () => {
	const slider = ReactTestRenderer.create(<Slider><div /><div /></Slider>);
	expect(slider).toBeDefined();
	expect(slider.toJSON()).toMatchSnapshot();
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
