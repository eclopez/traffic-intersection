import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import { useTrafficLightController } from './useTrafficLightController.hook';
import { TrafficLightConfig } from '../../components/TrafficLight';

describe('useTrafficLightController', () => {
  it('should return the current state of the traffic lights when the direction is longitudinal', () => {
    const initialDirection = 'longitudinal';

    const {
      result: { current },
    } = renderHook(() => useTrafficLightController(initialDirection));

    expect(current).toEqual({
      longitudinal: TrafficLightConfig.RedGreen,
      latitudinal: TrafficLightConfig.Red,
    });
  });

  it('should return the current state of the traffic lights when the direction is latitudinal', () => {
    const initialDirection = 'latitudinal';

    const {
      result: { current },
    } = renderHook(() => useTrafficLightController(initialDirection));

    expect(current).toEqual({
      longitudinal: TrafficLightConfig.Red,
      latitudinal: TrafficLightConfig.RedGreen,
    });
  });

  it('should cycle through traffic light states over time', () => {
    vi.useFakeTimers();

    const initialDirection = 'longitudinal';
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

    const { result } = renderHook(() =>
      useTrafficLightController(initialDirection),
    );

    expect(result.current).toEqual({
      longitudinal: TrafficLightConfig.RedGreen,
      latitudinal: TrafficLightConfig.Red,
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toEqual({
      longitudinal: TrafficLightConfig.GreenFlashing,
      latitudinal: TrafficLightConfig.Red,
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toEqual({
      longitudinal: TrafficLightConfig.Yellow,
      latitudinal: TrafficLightConfig.Red,
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toEqual({
      longitudinal: TrafficLightConfig.Red,
      latitudinal: TrafficLightConfig.Red,
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toEqual({
      longitudinal: TrafficLightConfig.Red,
      latitudinal: TrafficLightConfig.RedGreen,
    });

    expect(setIntervalSpy).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
    setIntervalSpy.mockRestore();
  });
});
