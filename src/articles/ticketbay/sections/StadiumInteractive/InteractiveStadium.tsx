import { useState, useEffect } from 'react'
import type { GameType, Game, Seat } from '../types.ts';
import GameTypeSelector from './GameTypeSelector.tsx'
import { GameSelector } from './GameSelector.tsx';
import { DisplayArea } from './DisplayArea.tsx';

function InteractiveStadium() {
  const [selectedGameType, setSelectedGameType] = useState<GameType | null>('Wild Card');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const handleGameSelect = (game: Game) =>{
    setSelectedGame(game);
    setSelectedSeat(null);
  }
  const handleGameTypeSelect = (gameType: GameType) =>{
    setSelectedGameType(gameType);
    setSelectedSeat(null);
  }
  const allGames: Game[] = [
    { id: '1', name: 'Games 1, 2 Daegu Samsung Lions Park', gameType: 'Wild Card',stadium: 'samsung', title: 'Wild Card Games 1, 2' },
    
    { id: '2', name: 'Games 1, 2 Incheon SSG Landers Field', gameType: 'Semi-Playoffs', stadium: 'ssg', title: 'Semi-Playoffs Games 1, 2' },
    { id: '3', name: 'Games 3, 4 Daegu Samsung Lions Park', gameType: 'Semi-Playoffs', stadium: 'samsung', title: 'Semi-Playoffs Games 3, 4' },

    { id: '4', name: 'Games 1, 2, 5 Daejeon Hanwha Life Ballpark', gameType: 'Playoffs', stadium: 'hanhwa', title: 'Playoffs Games 1, 2, 5' },
    { id: '5', name: 'Games 3, 4 Daegu Samsung Lions Park', gameType: 'Playoffs', stadium: 'samsung', title: 'Playoffs Games 3, 4' },

    {id: '6', name: 'Games 1, 2 Seoul Sports Complex Baseball Stadium', gameType:'Korean Series', stadium:'lg', title: 'Korean Series Games 1, 2'},
    {id: '7', name: 'Games 3, 4, 5 Daejeon Hanwha Life Ballpark', gameType:'Korean Series', stadium:'hanhwa', title: 'Korean Series Games 3, 4, 5'},

    {id: '8', name: 'Regular Season Seoul Sports Complex Baseball Stadium', gameType:'Regular Season', stadium: 'lg', title: 'Aug 8-10 Hanwha vs LG'},
    {id: '9', name: 'Regular Season Incheon SSG Landers Field', gameType:'Regular Season', stadium: 'ssg', title: 'Aug 12-14 Kiwoom vs SSG'},
    {id: '10', name: 'Regular Season Daejeon Hanwha Life Ballpark', gameType:'Regular Season', stadium: 'hanhwa', title: 'Aug 12-14 Lotte vs Hanwha'},
    {id: '11', name: 'Regular Season Daegu Samsung Lions Park', gameType:'Regular Season', stadium: 'samsung', title: 'Aug 12-14 Kia vs Samsung'}

  ];

  const filteredGames = selectedGameType ? allGames.filter(game => game.gameType===selectedGameType) : [];
  
  //default view
  useEffect(() => {
    if (filteredGames.length > 0) {
      setSelectedGame(filteredGames[0]);
    } else {
      setSelectedGame(null);
    }
  }, [filteredGames]);

  return (
    <div>
      <GameTypeSelector selectedGameType={selectedGameType} onSelect={handleGameTypeSelect} />
      <div>
      <DisplayArea game={selectedGame} selectedSeat={selectedSeat} onSelect={setSelectedSeat} scrolly={false} />
        <GameSelector games={filteredGames} selectedGame={selectedGame} onSelect={handleGameSelect} />
      </div>
    </div>
  );
}


export default InteractiveStadium
