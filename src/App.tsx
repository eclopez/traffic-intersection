import { Intersection } from './components/Intersection';
import { Scene } from './components/Scene';

function App() {
  return (
    <div className="h-[600px] w-[800px]">
      <div className="absolute flex flex-row justify-center">
        <Scene />
      </div>
      <Intersection />
    </div>
  );
}

export { App };
