import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Intersection } from './Intersection';
import { TrafficLightConfig } from '../TrafficLight';

vi.mock('../../hooks/useTrafficController', () => ({
  useTrafficLightController: () => {
    return {
      longitudinal: TrafficLightConfig.RedGreen,
      latitudinal: TrafficLightConfig.Red,
    };
  },
}));

describe('Intersection', () => {
  it('renders', () => {
    render(<Intersection />);

    expect(screen.getByText('Southbound (top)')).toBeInTheDocument();
    expect(screen.getByText('Westbound (right)')).toBeInTheDocument();
    expect(screen.getByText('Northbound (bottom)')).toBeInTheDocument();
    expect(screen.getByText('Eastbound (left)')).toBeInTheDocument();
  });
});
