export interface Image {
  small: string;
  thumbnail: string;
  large: string;
  tiny: string;
  medium: string;
  type: string;
}

export enum ImageSize {
  small = "small",
  medium = "medium",
  large = "large",
}
