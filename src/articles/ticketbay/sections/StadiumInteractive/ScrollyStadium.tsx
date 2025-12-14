import type { Game, Seat } from '../types.ts';
import { DisplayArea } from './DisplayArea.tsx';

interface ScrollyStadiumProps {
  selectedGameId: string | null;          // controlled from App
  selectedSeat: Seat | null;              // controlled from App
  onSelectSeat: (seat: Seat | null) => void;  // callback to set seat in App
}

function ScrollyStadium({ selectedGameId, selectedSeat, onSelectSeat }: ScrollyStadiumProps) {
  const allGames: Game[] = [
    { id: '1', name: 'Games 1, 2 Daegu Samsung Lions Park', gameType: 'Wild Card',stadium: 'samsung', title: 'Wild Card Games 1, 2' },
    
    { id: '2', name: 'Games 1, 2 Incheon SSG Landers Field', gameType: 'Semi-Playoffs', stadium: 'ssg', title: 'Semi-Playoffs Games 1, 2' },
    { id: '3', name: 'Games 3, 4 Daegu Samsung Lions Park', gameType: 'Semi-Playoffs', stadium: 'samsung', title: 'Semi-Playoffs Games 3, 4' },

    { id: '4', name: 'Games 1, 2, 5 Daejeon Hanwha Life Ballpark', gameType: 'Playoffs', stadium: 'hanhwa', title: 'Playoffs Games 1, 2, 5' },
    { id: '5', name: 'Games 3, 4 Daegu Samsung Lions Park', gameType: 'Playoffs', stadium: 'samsung', title: 'Playoffs Games 3, 4' },
    {id: '6', name: 'Games 1, 2 Seoul Sports Complex Baseball Stadium', gameType:'Korean Series', stadium:'lg', title: 'Korean Series Games 1, 2'},
    {id: '7', name: 'Games 3, 4, 5 Daejeon Hanwha Life Ballpark', gameType:'Korean Series', stadium:'hanhwa', title: 'Korean Series Games 3, 4, 5'},

    {id: '8', name: 'Regular Season Seoul Sports Complex Baseball Stadium', gameType:'Regular Season', stadium: 'lg', title: 'Aug 8-10 Hanwha vs LG'}
  ];

  const selectedGame = allGames.find(game => game.id === selectedGameId) || null;
  

  return (
    <div>
      <DisplayArea 
        game={selectedGame}
        selectedSeat={selectedSeat}
        onSelect={onSelectSeat}   // pass seat setter down
        scrolly={true}
      />
      <div id="tooltip" style={{ display: 'none' }}></div>
      <div id="tooltip-selected" style={{ display: 'none' }}></div>
    </div>
  );
}

export default ScrollyStadium;
