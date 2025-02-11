import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Vehicles } from '.';
import { TrafficLightConfig } from '../TrafficLight';

describe('Vehicles', () => {
  it('renders', () => {
    render(
      <Vehicles
        title="Southbound (top)"
        lightConfig={TrafficLightConfig.RedGreen}
      />,
    );

    expect(screen.getByText('Southbound (top)')).toBeInTheDocument();
    expect(screen.getByText('Left turn:')).toBeInTheDocument();
    expect(screen.getByText('1st lane:')).toBeInTheDocument();
    expect(screen.getByText('2nd lane:')).toBeInTheDocument();
    expect(screen.getByText('Right turn:')).toBeInTheDocument();
  });
});
