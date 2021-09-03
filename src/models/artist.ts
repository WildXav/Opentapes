export interface Artist {
  id: number;
  name: string;
}

export interface Artists {
  main: Array<Artist>;
  feature: Array<Artist>;
}
