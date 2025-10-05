export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  approved: boolean;
  isBlocked: boolean;
  profile?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface Instrument {
  id: string;
  name: string;
  tradingsymbol: string;
  exchange: string;
  segment: string;
  type: string;
}

export interface Quote {
  instrument_id: string;
  ltp: number;
  bid: number;
  ask: number;
  ts: string;
}

export interface Order {
  id: string;
  instrument_id: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  order_type: string;
  product: string;
  status: string;
  createdAt: string;
}

export interface Holding {
  instrument_id: string;
  qty: number;
  avg_price: number;
  pnl?: number;
}

export interface Position {
  instrument_id: string;
  qty: number;
  avg_price: number;
  product: string;
  pnl?: number;
}

export interface WalletSummary {
  balance: number;
  margin: number;
  collateral: number;
  updatedAt: string;
}

export interface Watchlist {
  id: string;
  name: string;
  items: WatchlistItem[];
}

export interface WatchlistItem {
  id: string;
  instrument_id: string;
  instrument?: Instrument;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}
