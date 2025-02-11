import * as React from 'react';
import { TrafficLightConfig } from '../../components/TrafficLight';

type Direction = 'longitudinal' | 'latitudinal';

interface TrafficLightsState {
  longitudinal: TrafficLightConfig;
  latitudinal: TrafficLightConfig;
}

// State machine for traffic light configurations
function setNextTrafficLightConfig(
  currentConfig: TrafficLightConfig,
): TrafficLightConfig {
  switch (currentConfig) {
    case TrafficLightConfig.Red:
      return TrafficLightConfig.RedGreen;
    case TrafficLightConfig.RedGreen:
      return TrafficLightConfig.GreenFlashing;
    case TrafficLightConfig.GreenFlashing:
      return TrafficLightConfig.Yellow;
    case TrafficLightConfig.Yellow:
      return TrafficLightConfig.Red;
  }
}

// Constants
const TRAFFIC_LIGHT_CYCLE_DURATION = 5000;
const DIRECTION_CHANGE_DURATION = 2000;

/**
 * A hook to control all of the traffic lights at the intersection.
 *
 * @param initialDirection The initial direction of the traffic light
 * @returns {TrafficLightsState} The current state of the traffic lights
 */
function useTrafficLightController(initialDirection: Direction) {
  const [direction, setDirection] = React.useState<Direction>(initialDirection);
  const [lights, setLights] = React.useState<TrafficLightsState>({
    longitudinal:
      initialDirection === 'longitudinal'
        ? TrafficLightConfig.RedGreen
        : TrafficLightConfig.Red,
    latitudinal:
      initialDirection === 'latitudinal'
        ? TrafficLightConfig.RedGreen
        : TrafficLightConfig.Red,
  });
  // Indicates whether all lights are going to be red next cycle
  // Having this in React state ensures that the interval is cleared when changed
  const [isRedLights, setIsRedLights] = React.useState(false);

  React.useEffect(() => {
    // Use a shorter duration when all lights are red
    const cycleDuration = isRedLights
      ? DIRECTION_CHANGE_DURATION
      : TRAFFIC_LIGHT_CYCLE_DURATION;

    const intervalId = setInterval(() => {
      setLights((prevLights) => {
        setIsRedLights(false);
        // If our light context is north/south...
        if (direction === 'longitudinal') {
          // And if the lights are yellow...
          if (prevLights.longitudinal === TrafficLightConfig.Yellow) {
            // Switch light context to east/west
            setDirection('latitudinal');
            // Set up shorter light delay duration when all lights are red
            setIsRedLights(true);
          }
          // Set longitudinal light state
          return {
            ...prevLights,
            longitudinal: setNextTrafficLightConfig(prevLights.longitudinal),
          };
        } else {
          // Otherwise, if our light context is east/west...
          // And if the lights are yellow...
          if (prevLights.latitudinal === TrafficLightConfig.Yellow) {
            // Switch light context to north/south
            setDirection('longitudinal');
            // Set up shorter light delay duration when all lights are red
            setIsRedLights(true);
          }
          // Set latitudinal light state
          return {
            ...prevLights,
            latitudinal: setNextTrafficLightConfig(prevLights.latitudinal),
          };
        }
      });
    }, cycleDuration);
    return () => clearInterval(intervalId);
  }, [isRedLights, direction]);

  return lights;
}

export { useTrafficLightController };
