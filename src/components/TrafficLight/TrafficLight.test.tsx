import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrafficLight } from './TrafficLight';
import { TrafficLightConfig } from '.';

describe('TrafficLight', () => {
  it('renders', () => {
    render(<TrafficLight lightConfig={TrafficLightConfig.GreenFlashing} />);

    expect(screen.getByTestId('red-light')).toBeInTheDocument();
    expect(screen.getByTestId('yellow-light')).toBeInTheDocument();
    expect(screen.getByTestId('green-light')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-light')).toBeInTheDocument();
  });
});
