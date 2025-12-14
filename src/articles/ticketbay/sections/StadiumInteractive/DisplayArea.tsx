import type { Game, Seat } from '../types.ts';
// In parent component (e.g., DisplayArea.tsx)
import { stadiums } from "./data/stadium.ts";
import { categoryData } from "./data/category.ts";
import { StadiumChart } from "./StadiumChart.tsx";
import { StadiumGraph } from "./StadiumGraph.tsx";
import { ColorScale } from './ColorScale.tsx';
import { StadiumChartScrolly } from './StadiumChartScrolly.tsx';
interface Props {
  game: Game | null;
}


interface Props {
  game: Game | null;
  selectedSeat: Seat | null;
  onSelect: (seat: Seat | null) => void;
  scrolly: boolean | null;
}

export const DisplayArea: React.FC<Props> = ({ game, selectedSeat, onSelect, scrolly }) => {
  if (!game) return <div>Select a game</div>;
  return (
    <div id='display-area' style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {/* Stadium chart as background */}
      <div
      
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
      }}>
        <div style={{ width: "100%", height: "100%" }}>
          {scrolly ? (
            <StadiumChartScrolly
              game={game}
              stadiumData={stadiums}
              categoryData={categoryData}
              selectedSeat={selectedSeat}
            />
          ) : (
            <StadiumChart
              game={game}
              stadiumData={stadiums}
              categoryData={categoryData}
              selectedSeat={selectedSeat}
              onSelect={onSelect}
            />
          )}
        </div>

        {/* Color scale overlay */}
        <div
          style={{
            position: "absolute",
            top: "10px", // adjust as needed
            zIndex: 10, // ensures it is on top
          }}
        >
        <ColorScale game={game} />
        </div>
      </div>
      <div style={{height: '600px', width: '500px'}}>
        <StadiumGraph game={game}
        selectedSeat={selectedSeat}
        categoryData={categoryData}
        scrolly={scrolly}
        />
      </div>
    </div>
  );
};
