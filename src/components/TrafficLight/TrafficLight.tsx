import { cva, cx } from 'class-variance-authority';

/**
 * Enum representing all possible configurations of a traffic light.
 *
 * @enum {number}
 * @readonly
 */
enum TrafficLightConfig {
  Red,
  RedGreen,
  GreenFlashing,
  Yellow,
}

/**
 * An interface representing the props for the TrafficLight component.
 *
 * @interface TrafficLightProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {TrafficLightConfig} lightConfig The configuration of the traffic light
 */
interface TrafficLightProps extends React.HTMLAttributes<HTMLDivElement> {
  lightConfig: TrafficLightConfig;
}

const lightBaseClasses =
  'h-16 w-16 rounded-full relative after:absolute after:rounded-full after:h-16 after:w-16 after:top-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-b after:from-white/25 after:via-transparent after:to-transparent';
const classes = {
  red: cva([lightBaseClasses], {
    variants: {
      lightConfig: {
        [TrafficLightConfig.Red]: 'bg-red-500',
        [TrafficLightConfig.RedGreen]: 'bg-red-500',
        [TrafficLightConfig.GreenFlashing]: 'bg-red-950',
        [TrafficLightConfig.Yellow]: 'bg-red-950',
      },
    },
  }),
  yellow: cva([lightBaseClasses], {
    variants: {
      lightConfig: {
        [TrafficLightConfig.Red]: 'bg-yellow-950',
        [TrafficLightConfig.RedGreen]: 'bg-yellow-950',
        [TrafficLightConfig.GreenFlashing]: 'bg-yellow-950',
        [TrafficLightConfig.Yellow]: 'bg-yellow-500',
      },
    },
  }),
  green: cva([lightBaseClasses], {
    variants: {
      lightConfig: {
        [TrafficLightConfig.Red]: 'bg-green-950',
        [TrafficLightConfig.RedGreen]: 'bg-green-950',
        [TrafficLightConfig.GreenFlashing]: 'bg-green-500',
        [TrafficLightConfig.Yellow]: 'bg-green-950',
      },
    },
  }),
  arrow: cva([], {
    variants: {
      lightConfig: {
        [TrafficLightConfig.Red]: 'fill-red-500',
        [TrafficLightConfig.RedGreen]: 'fill-green-500',
        [TrafficLightConfig.GreenFlashing]: 'fill-orange-500 animate-pulse',
        [TrafficLightConfig.Yellow]: 'fill-yellow-500',
      },
    },
  }),
};

/**
 * Component that represents a traffic light.
 *
 * @param {TrafficLightProps} props Props for the TrafficLight component
 *
 * @returns {JSX.Element} TrafficLight component
 */
function TrafficLight(props: TrafficLightProps) {
  const { className, lightConfig = TrafficLightConfig.Red } = props;

  return (
    <div
      className={cx(
        'z-10 inline-flex flex-row gap-2 rounded-xl bg-gray-950 p-2',
        className,
      )}
    >
      <div className={cx(classes.red({ lightConfig }))}></div>
      <div className={cx(classes.yellow({ lightConfig }))}></div>
      <div className={cx(classes.green({ lightConfig }))}></div>
      <div className="h-16 w-16 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 463.95">
          <path
            className={cx(classes.arrow({ lightConfig }))}
            d="M512 332.66H268.5v92.31c-.68 15.47-5.77 26.46-15.43 32.82-25.79 17.2-52.31-5.26-69.24-22.6L14.33 261.6c-19.11-17.28-19.11-41.93 0-59.21L188.71 24.42c16.06-16.39 40.56-34.09 64.36-18.21 9.66 6.35 14.75 17.34 15.43 32.81v92.31H512v201.33z"
          />
        </svg>
      </div>
    </div>
  );
}

export { TrafficLight, TrafficLightConfig };
