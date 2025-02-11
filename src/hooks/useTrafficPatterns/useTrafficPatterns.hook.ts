import * as React from 'react';

// Controls how fast vehicles arrive
const STOPPED_VEHICLE_ARRIVAL_PROBABILITY = 0.93;

/**
 * Hook that manages the traffic patterns for the vehicles at an intersection.
 *
 * @returns {Object} An object containing the state variables and functions to manage traffic patterns:
 * - leftTurnVehicles: number
 * - middleLane1Vehicles: number
 * - middleLane2Vehicles: number
 * - rightTurnVehicles: number
 * - addStoppedVehicles: function
 * - setLeftTurnVehicles: function
 * - setMiddleLane1Vehicles: function
 * - setMiddleLane2Vehicles: function
 * - setRightTurnVehicles: function
 */
function useTrafficPatterns() {
  const [leftTurnVehicles, setLeftTurnVehicles] = React.useState(0);
  const [middleLane1Vehicles, setMiddleLane1Vehicles] = React.useState(0);
  const [middleLane2Vehicles, setMiddleLane2Vehicles] = React.useState(0);
  const [rightTurnVehicles, setRightTurnVehicles] = React.useState(0);

  // Randomly add stopped vehicles to a lane
  const addStoppedVehicles = React.useCallback(() => {
    if (Math.random() > STOPPED_VEHICLE_ARRIVAL_PROBABILITY) {
      setLeftTurnVehicles((prev) => prev + 1);
    }
    if (Math.random() > STOPPED_VEHICLE_ARRIVAL_PROBABILITY) {
      setMiddleLane1Vehicles((prev) => prev + 1);
    }
    if (Math.random() > STOPPED_VEHICLE_ARRIVAL_PROBABILITY) {
      setMiddleLane2Vehicles((prev) => prev + 1);
    }
    if (Math.random() > STOPPED_VEHICLE_ARRIVAL_PROBABILITY) {
      setRightTurnVehicles((prev) => prev + 1);
    }
  }, []);

  return {
    leftTurnVehicles,
    middleLane1Vehicles,
    middleLane2Vehicles,
    rightTurnVehicles,
    addStoppedVehicles,
    setLeftTurnVehicles,
    setMiddleLane1Vehicles,
    setMiddleLane2Vehicles,
    setRightTurnVehicles,
  };
}

export { useTrafficPatterns };
