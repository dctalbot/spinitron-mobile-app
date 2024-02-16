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
      href: string;
    };
    playlist: {
      href: string;
    };
  };
}

export interface SpinsAPI {
  items: SpinAPI[];
  _links: {
    self: {
      href: string;
    };
    first: {
      href: string;
    };
    next: {
      href: string;
    };
  };
  _meta: {
    totalCount: boolean;
    pageCount: boolean;
    currentPage: number;
    perPage: number;
  };
}
