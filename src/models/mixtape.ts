import { Image, ImageSize } from "@/models/image";
import { Artists, concatArtists } from "@/models/artist";
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
  readonly mediumCoverUrl: string | null;

  constructor(json: Record<string, unknown>) {
    this.id = json.id as number;
    this.name = json.name as string;
    this.description = json.description as string;
    this.isSingle = json.single as boolean;
    this.images = json.images as Array<Image>;
    this.artists = json.artists as Artists;
    this.releaseDate = dayjs(json.releaseDate as string);

    this.mainArtists = concatArtists(this.artists.main);
    this.smallCoverUrl = Mixtape.retrieveCoverUrl(this.images, ImageSize.small);
    this.mediumCoverUrl = Mixtape.retrieveCoverUrl(
      this.images,
      ImageSize.medium
    );
  }

  private static retrieveCoverUrl(
    images: Array<Image>,
    size: ImageSize
  ): string | null {
    if (images.length === 0) return null;
    const smallCovers = images.map((image: Image) => image[size]);
    return smallCovers.length === 0 ? null : smallCovers[0];
  }
}
