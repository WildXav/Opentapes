import { Image } from "@/models/image";
import { Artist, Artists } from "@/models/artist";
import dayjs from "dayjs";

export class Mixtape {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly isSingle: boolean;
  readonly images: Array<Image>;
  readonly artists: Artists;
  readonly releaseDate: dayjs.Dayjs;
  readonly mainArtists: string;
  readonly smallCoverUrl: string | null;

  constructor(fromJson: Record<string, unknown>) {
    this.id = fromJson.id as number;
    this.name = fromJson.name as string;
    this.description = fromJson.description as string;
    this.isSingle = fromJson.single as boolean;
    this.images = fromJson.images as Array<Image>;
    this.artists = fromJson.artists as Artists;
    this.releaseDate = dayjs(fromJson.releaseDate as string);

    this.mainArtists = Mixtape.concatArtists(this.artists.main);
    this.smallCoverUrl = Mixtape.retrieveSmallCoverUrl(this.images);
  }

  private static concatArtists(artists: Array<Artist>): string {
    return artists.map((artist) => artist.name).join(", ");
  }

  private static retrieveSmallCoverUrl(images: Array<Image>): string | null {
    if (images.length === 0) return null;
    const smallCovers = images.map((image: Image) => image.small);
    return smallCovers.length === 0 ? null : smallCovers[0];
  }
}
