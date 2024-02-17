type HTMLString = string;
type URLString = string;

interface PaginationLinks {
  self: {
    href: URLString;
  };
  first: {
    href: URLString;
  };
  next: {
    href: URLString;
  };
  last?: {
    href: URLString;
  };
}

interface PaginationMeta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

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

export interface ShowAPI {
  id: number;
  start: string;
  end: string;
  duration: number;
  timezone: string;
  one_off: boolean;
  category: string;
  title: string;
  description: HTMLString;
  since: number;
  url: URLString;
  hide_dj: number;
  image: URLString;
  _links: {
    self: {
      href: URLString;
    };
    personas: {
      href: URLString;
    }[];
    playlists: {
      href: string; // NOTE: this one is weird -- it omits the domain e.g. "/api/playlists?show_id=1"
    };
  };
}

export interface PlaylistsAPI {
  items: PlaylistAPI[];
  _links: PaginationLinks;
  _meta: PaginationMeta;
}

export interface SpinsAPI {
  items: SpinAPI[];
  _links: PaginationLinks;
  _meta: PaginationMeta;
}

export interface PersonasAPI {
  items: PersonaAPI[];
  _links: PaginationLinks;
  _meta: PaginationMeta;
}

export interface ShowsAPI {
  items: ShowAPI[];
  _links: PaginationLinks;
  _meta: PaginationMeta;
}

export interface PersonasAPIInput {
  // name?: string;
  // count?: number;
  // page?: number;
  // fields?: string[];
  // expand?: string[];
}

export interface PersonaAPIInput {
  id: number;
  // fields?: string[];
  // expand?: string[];
}

export interface ShowsAPIInput {
  // start?: string;
  // end?: string;
  // count?: number;
  // page?: number;
  // fields?: string[];
  // expand?: string[];
}

export interface ShowAPIInput {
  id: number;
  // fields?: string[];
  // expand?: string[];
}

export interface PlaylistsAPIInput {
  show_id?: number;
  // start?: string;
  // end?: string;
  // persona_id?: number;

  // count?: number;
  // page?: number;
  // fields?: string[];
  // expand?: string[];
}

export interface PlaylistAPIInput {
  id: number;
  // fields?: string[];
  // expand?: string[];
}

export interface SpinsAPIInput {
  show_id?: number;
  // start?: string;
  // end?: string;
  // persona_id?: number;

  // count?: number;
  // page?: number;
  // fields?: string[];
  // expand?: string[];
}
