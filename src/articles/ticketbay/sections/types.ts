// types.ts
export interface Game {
  id: string;
  name: string;
  gameType: GameType;
  stadium: string;
  title: string; // or whatever format your graph uses
}
export interface Bin {
  name: number; // the midpoint or label (e.g., 390000)
  value: number; // numeric value (e.g., 0)
  breakdown: {
    가격범위: string; // e.g. "390000~400000원"
    개수: string; // e.g. "0개"
  };
}

export type TicketData = Record<
  string,              // game.id
  Record<string, Bin[]> // seatCategory → bins
>;


export type GameType = 'Wild Card' | 'Semi-Playoffs' | 'Playoffs' | 'Korean Series' | "Regular Season";

export interface Seat {
  x: number;
  y: number;
  section: string;
}

export interface CategoryInfo {
  category: string;
  "price_to_original_ratio_pct": number;
    "avg_price": number;
    "max_price": number;
    "min_price": number;
    "median_price": number;
    "avg_original_price": number;
    "num_seats": number;
}