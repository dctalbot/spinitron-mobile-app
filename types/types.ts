type HTMLString = string;
type URLString = string;

export interface SpinAPI {
  id: number;
  playlist_id: number;
  start: string;
  end: null;
  duration: null;
  timezone: string;
  image: string;
  classical: boolean;
  artist: string;
  "artist-custom": null;
  composer: string;
  release: string;
  "release-custom": null;
  released: number;
  added: null;
  medium: null;
  va: boolean;
  label: string;
  "label-custom": null;
  song: string;
  note: string;
  request: boolean;
  local: boolean;
  new: boolean;
  genre: null;
  work: null;
  conductor: null;
  performers: null;
  ensemble: null;
  "catalog-number": null;
  isrc: string;
  upc: string;
  iswc: null;
  _links: {
    self: {
      href: URLString;
    };
    playlist: {
      href: URLString;
    };
  };
}

export interface SpinsAPI {
  items: SpinAPI[];
  _links: {
    self: {
      href: URLString;
    };
    first: {
      href: URLString;
    };
    next: {
      href: URLString;
    };
  };
  _meta: {
    totalCount: boolean;
    pageCount: boolean;
    currentPage: number;
    perPage: number;
  };
}

export interface PlaylistAPI {
  id: number;
  persona_id: number;
  show_id: number;
  start: string;
  end: string;
  duration: number;
  timezone: string;
  category: string;
  title: string;
  description: HTMLString;
  since: number;
  url: string;
  hide_dj: number;
  image: string;
  automation: number;
  episode_name: string;
  episode_description: HTMLString;
  spinsCount: string;
  _links: {
    self: {
      href: URLString;
    };
    persona: {
      href: URLString;
    };
    show: {
      href: URLString;
    };
    spins: {
      href: URLString;
    };
  };
}

export interface PersonaAPI {
  id: number;
  name: string;
  bio: HTMLString;
  since: number;
  email: string;
  website: URLString;
  image: URLString;
  _links: {
    self: {
      href: URLString;
    };
    shows: {
      href: URLString;
    }[];
  };
}
