export interface Artist {
  id: number;
  name: string;
}

export interface Artists {
  main: Array<Artists>;
  feature: Array<Artists>;
}
