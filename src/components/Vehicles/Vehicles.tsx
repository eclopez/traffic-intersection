import * as React from 'react';
import { TrafficLightConfig } from '../TrafficLight';
import { useTrafficPatterns } from '../../hooks/useTrafficPatterns';

/**
 * Vehicles component props
 *
 * @property {string} title - The title of the component
 * @property {TrafficLightConfig} lightConfig - The current traffic light configuration
 * @property {React.HTMLAttributes<HTMLDivElement>} [props] - Additional props to pass to the component
 *
 * @returns {JSX.Element} Vehicles component
 */
interface VehiclesProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  lightConfig: TrafficLightConfig;
}

// Constants
const CHECK_FOR_ADDED_VEHICLES_INTERVAL = 500;
const ALLOW_VEHICLES_TO_PROCEED_INTERVAL = 800;
const RIGHT_TURN_PROBABILITY = 0.9;

const listItemBaseClasses =
  'ms-2 flex flex-row justify-between font-mono text-base leading-tight text-gray-500';

/**
 * Component that represents the vehicles at an intersection.
 *
 * @param {VehiclesProps} props Vehicles component props
 *
 * @returns {JSX.Element} Vehicles component
 */
function Vehicles(props: VehiclesProps) {
  const { title, lightConfig } = props;

  const {
    leftTurnVehicles,
    middleLane1Vehicles,
    middleLane2Vehicles,
    rightTurnVehicles,
    addStoppedVehicles,
    setLeftTurnVehicles,
    setMiddleLane1Vehicles,
    setMiddleLane2Vehicles,
    setRightTurnVehicles,
  } = useTrafficPatterns();

  // Allow vehicles to proceed (decrement vehicles in a lane) based on the traffic light configuration
  const allowVehiclesToProceed = React.useCallback(() => {
    // If the light config indicates that vehicles in the left lane can proceed,
    // decrement the number of vehicles in the left lane by 1, not to decrease below 0
    if (
      [
        TrafficLightConfig.RedGreen,
        TrafficLightConfig.GreenFlashing,
        TrafficLightConfig.Yellow,
      ].includes(lightConfig)
    ) {
      setLeftTurnVehicles((prev) => Math.max(prev - 1, 0));
    }
    // If the light config indicates that non-left turning vehicles in the can proceed,
    // decrement the number of vehicles in the each non-left turning lane by 1, not to decrease below 0
    if (
      [TrafficLightConfig.GreenFlashing, TrafficLightConfig.Yellow].includes(
        lightConfig,
      )
    ) {
      setMiddleLane1Vehicles((prev) => Math.max(prev - 1, 0));
      setMiddleLane2Vehicles((prev) => Math.max(prev - 1, 0));
      setRightTurnVehicles((prev) => Math.max(prev - 1, 0));
    }
    // Right turn on a red light? I'll allow it... some percentage of the time.
    if (
      lightConfig === TrafficLightConfig.Red &&
      Math.random() > RIGHT_TURN_PROBABILITY
    ) {
      setRightTurnVehicles((prev) => Math.max(prev - 1, 0));
    }
  }, [
    lightConfig,
    setLeftTurnVehicles,
    setMiddleLane1Vehicles,
    setMiddleLane2Vehicles,
    setRightTurnVehicles,
  ]);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => addStoppedVehicles(),
      CHECK_FOR_ADDED_VEHICLES_INTERVAL,
    );
    return () => clearInterval(intervalId);
  }, [addStoppedVehicles]);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => allowVehiclesToProceed(),
      ALLOW_VEHICLES_TO_PROCEED_INTERVAL,
    );
    return () => clearInterval(intervalId);
  }, [allowVehiclesToProceed, lightConfig]);

  return (
    <section className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4">
      <h5 className="mb-3 text-base font-semibold text-gray-900">{title}</h5>
      <ul role="list" className="flex flex-col gap-1">
        <li className={listItemBaseClasses}>
          <span>Left turn:</span>
          <span>{leftTurnVehicles}</span>
        </li>
        <li className={listItemBaseClasses}>
          <span>1st lane:</span>
          <span className="inline-block text-right">{middleLane1Vehicles}</span>
        </li>
        <li className={listItemBaseClasses}>
          <span>2nd lane:</span>
          <span>{middleLane2Vehicles}</span>
        </li>
        <li className={listItemBaseClasses}>
          <span>Right turn:</span>
          <span>{rightTurnVehicles}</span>
        </li>
      </ul>
    </section>
  );
}

export { Vehicles };
