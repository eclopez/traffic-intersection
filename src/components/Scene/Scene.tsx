import * as React from 'react';

// Scene constants
const LANES = 8;
const LANE_WIDTH = 30;
const CROSSWALK_WIDTH = 20;
const MIDDLE_LANE_WIDTH = LANE_WIDTH / 10;
const ROAD_WIDTH = LANE_WIDTH * LANES;
const WONKY_CROSSWALK_OFFSET = 18;

/**
 * A component that renders a canvas with an intersection scene for purely presentational purposes.
 *
 * @returns {JSX.Element} Scene component
 */
function Scene() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Draw when the component is rendered
  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;

    const NORTH_SOUTH_ROAD_START = (canvas.width - ROAD_WIDTH) / 2;
    const EAST_WEST_ROAD_START = (canvas.height - ROAD_WIDTH) / 2;

    const ctx = canvas.getContext('2d');

    // Roads
    ctx.fillStyle = 'gray';
    ctx.fillRect(NORTH_SOUTH_ROAD_START, 0, ROAD_WIDTH, canvas.height);
    ctx.fillRect(0, EAST_WEST_ROAD_START, canvas.width, ROAD_WIDTH);

    // Lane markings
    ctx.beginPath();
    for (let i = 1; i < LANES; i++) {
      // Don't paint the center line
      if (i !== LANES / 2) {
        ctx.strokeStyle = 'white';
        ctx.setLineDash([9, 9]);
        ctx.moveTo(NORTH_SOUTH_ROAD_START + i * LANE_WIDTH, 0);
        ctx.lineTo(NORTH_SOUTH_ROAD_START + i * LANE_WIDTH, canvas.height);
        ctx.moveTo(0, EAST_WEST_ROAD_START + i * LANE_WIDTH);
        ctx.lineTo(canvas.width, EAST_WEST_ROAD_START + i * LANE_WIDTH);
      }
    }
    ctx.stroke();

    // Center line markings
    ctx.strokeStyle = 'yellow';
    ctx.setLineDash([]);
    ctx.strokeRect(
      NORTH_SOUTH_ROAD_START + (LANES / 2) * LANE_WIDTH,
      0,
      MIDDLE_LANE_WIDTH,
      canvas.height,
    );
    ctx.strokeRect(
      0,
      EAST_WEST_ROAD_START + (LANES / 2) * LANE_WIDTH,
      canvas.width,
      MIDDLE_LANE_WIDTH,
    );

    // Erase lines in intersection
    ctx.fillStyle = 'gray';
    ctx.fillRect(
      NORTH_SOUTH_ROAD_START,
      EAST_WEST_ROAD_START - CROSSWALK_WIDTH,
      ROAD_WIDTH,
      ROAD_WIDTH + 2 * CROSSWALK_WIDTH,
    );
    ctx.fillRect(
      NORTH_SOUTH_ROAD_START - CROSSWALK_WIDTH,
      EAST_WEST_ROAD_START,
      ROAD_WIDTH + 2 * CROSSWALK_WIDTH + WONKY_CROSSWALK_OFFSET,
      ROAD_WIDTH,
    );

    // Crosswalk lines
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.setLineDash([]);
    ctx.moveTo(NORTH_SOUTH_ROAD_START, EAST_WEST_ROAD_START - CROSSWALK_WIDTH);
    ctx.lineTo(
      NORTH_SOUTH_ROAD_START + ROAD_WIDTH,
      EAST_WEST_ROAD_START - CROSSWALK_WIDTH,
    );
    ctx.moveTo(NORTH_SOUTH_ROAD_START, EAST_WEST_ROAD_START);
    ctx.lineTo(NORTH_SOUTH_ROAD_START + ROAD_WIDTH, EAST_WEST_ROAD_START);
    ctx.moveTo(NORTH_SOUTH_ROAD_START, EAST_WEST_ROAD_START + ROAD_WIDTH);
    ctx.lineTo(
      NORTH_SOUTH_ROAD_START + ROAD_WIDTH,
      EAST_WEST_ROAD_START + ROAD_WIDTH,
    );
    ctx.moveTo(
      NORTH_SOUTH_ROAD_START,
      EAST_WEST_ROAD_START + ROAD_WIDTH + CROSSWALK_WIDTH,
    );
    ctx.lineTo(
      NORTH_SOUTH_ROAD_START + ROAD_WIDTH,
      EAST_WEST_ROAD_START + ROAD_WIDTH + CROSSWALK_WIDTH,
    );
    ctx.moveTo(NORTH_SOUTH_ROAD_START - CROSSWALK_WIDTH, EAST_WEST_ROAD_START);
    ctx.lineTo(
      NORTH_SOUTH_ROAD_START - CROSSWALK_WIDTH,
      EAST_WEST_ROAD_START + ROAD_WIDTH,
    );
    ctx.moveTo(NORTH_SOUTH_ROAD_START, EAST_WEST_ROAD_START);
    ctx.lineTo(NORTH_SOUTH_ROAD_START, EAST_WEST_ROAD_START + ROAD_WIDTH);

    ctx.moveTo(NORTH_SOUTH_ROAD_START + ROAD_WIDTH, EAST_WEST_ROAD_START);
    // I've never seen all four crosswalks completely straight
    ctx.lineTo(
      NORTH_SOUTH_ROAD_START + ROAD_WIDTH + WONKY_CROSSWALK_OFFSET,
      EAST_WEST_ROAD_START + ROAD_WIDTH,
    );
    ctx.moveTo(
      NORTH_SOUTH_ROAD_START + ROAD_WIDTH + CROSSWALK_WIDTH,
      EAST_WEST_ROAD_START,
    );
    ctx.lineTo(
      NORTH_SOUTH_ROAD_START +
        ROAD_WIDTH +
        CROSSWALK_WIDTH +
        WONKY_CROSSWALK_OFFSET,
      EAST_WEST_ROAD_START + ROAD_WIDTH,
    );
    ctx.stroke();
  }, []);

  return <canvas className="bg-green-700" ref={canvasRef} />;
}

export { Scene };
