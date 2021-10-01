export interface Image {
  small: string;
  thumbnail: string;
  large: string;
  tiny: string;
  medium: string;
  type: string;
}

export enum ImageSize {
  Tiny = "tiny",
  Thumbnail = "thumbnail",
  Small = "small",
  Medium = "medium",
  Large = "large",
}
