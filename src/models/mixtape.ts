import { Image } from "@/models/image";
import { Artists } from "@/models/artist";
import dayjs from "dayjs";

export class Mixtape {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly isSingle: boolean;
  readonly images: Array<Image>;
  readonly artists: Artists;
  readonly releaseDate: dayjs.Dayjs;

  constructor(fromJson: Record<string, unknown>) {
    this.id = fromJson.id as number;
    this.name = fromJson.name as string;
    this.description = fromJson.description as string;
    this.isSingle = fromJson.single as boolean;
    this.images = fromJson.images as Array<Image>;
    this.artists = fromJson.artists as Artists;
    this.releaseDate = dayjs(fromJson.releaseDate as string);
  }
}
