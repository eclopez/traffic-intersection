import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useTrafficPatterns } from './useTrafficPatterns.hook';

describe('useTrafficPatterns', () => {
  it('should return the current traffic pattern when the direction is longitudinal', () => {
    const {
      result: { current },
    } = renderHook(() => useTrafficPatterns());

    expect(current.leftTurnVehicles).toEqual(0);
    expect(current.middleLane1Vehicles).toEqual(0);
    expect(current.middleLane2Vehicles).toEqual(0);
    expect(current.rightTurnVehicles).toEqual(0);
  });
});
