import { TrafficLight } from '../TrafficLight';
import { Vehicles } from '../Vehicles';
import { useTrafficLightController } from '../../hooks/useTrafficLightController';

/**
 * A component that models the intersection of two roads.
 *
 * @returns {JSX.Element} Intersection component
 */
function Intersection() {
  const { longitudinal, latitudinal } =
    useTrafficLightController('longitudinal');

  return (
    <>
      <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-32 p-4">
        <TrafficLight className="rotate-180" lightConfig={longitudinal} />
        <div className="flex flex-row gap-24">
          <TrafficLight className="rotate-90" lightConfig={latitudinal} />
          <TrafficLight className="rotate-270" lightConfig={latitudinal} />
        </div>
        <TrafficLight lightConfig={longitudinal} />
      </div>
      <div className="mt-4 flex flex-row justify-center gap-8">
        <Vehicles title="Southbound (top)" lightConfig={longitudinal} />
        <Vehicles title="Westbound (right)" lightConfig={latitudinal} />
        <Vehicles title="Northbound (bottom)" lightConfig={longitudinal} />
        <Vehicles title="Eastbound (left)" lightConfig={latitudinal} />
      </div>
    </>
  );
}

export { Intersection };
