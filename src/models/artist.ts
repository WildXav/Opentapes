export interface Artist {
  id: number;
  name: string;
}

export interface Artists {
  main: Array<Artist>;
  feature: Array<Artist>;
}

export const concatMainArtists = (artists: Array<Artist>): string => {
  return artists.map((artist) => artist.name).join(", ");
};
