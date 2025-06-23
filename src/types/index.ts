export interface Photo {
  id: string;
  url: string;
  caption: string;
  uploadDate: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export interface AppState {
  photos: Photo[];
  wishes: Wish[];
  isAuthenticated: boolean;
}