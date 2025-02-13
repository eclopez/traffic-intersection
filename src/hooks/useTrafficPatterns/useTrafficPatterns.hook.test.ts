import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import { useTrafficPatterns } from './useTrafficPatterns.hook';

describe('useTrafficPatterns', () => {
  it('should return the initial traffic pattern', () => {
    const {
      result: { current },
    } = renderHook(() => useTrafficPatterns());

    expect(current.leftTurnVehicles).toEqual(0);
    expect(current.middleLane1Vehicles).toEqual(0);
    expect(current.middleLane2Vehicles).toEqual(0);
    expect(current.rightTurnVehicles).toEqual(0);
  });

  it('should set vehicles correctly', () => {
    const { result } = renderHook(() => useTrafficPatterns());

    act(() => {
      result.current.setLeftTurnVehicles(5);
      result.current.setMiddleLane1Vehicles(3);
      result.current.setMiddleLane2Vehicles(4);
      result.current.setRightTurnVehicles(2);
    });

    expect(result.current.leftTurnVehicles).toEqual(5);
    expect(result.current.middleLane1Vehicles).toEqual(3);
    expect(result.current.middleLane2Vehicles).toEqual(4);
    expect(result.current.rightTurnVehicles).toEqual(2);
  });
});
