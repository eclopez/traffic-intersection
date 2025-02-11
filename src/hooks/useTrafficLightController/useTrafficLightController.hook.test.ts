import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
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
});
