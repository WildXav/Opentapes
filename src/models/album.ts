import { Image, ImageSize } from "@/models/image";
import { Artists, concatArtists } from "@/models/artist";
import dayjs from "dayjs";
import { getCoverUrl } from "@/helpers/album-helper";

export class Album {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly isSingle: boolean;
  readonly images: Array<Image>;
  readonly artists: Artists;
  readonly releaseDate: dayjs.Dayjs;
  readonly mainArtists: string;
  readonly thumbnailCoverUrl: string | null;
  readonly smallCoverUrl: string | null;
  readonly mediumCoverUrl: string | null;
  readonly largeCoverUrl: string | null;

  constructor(json: Record<string, unknown>) {
    this.id = json.id as number;
    this.name = json.name as string;
    this.description = json.description as string;
    this.isSingle = json.single as boolean;
    this.images = json.images as Array<Image>;
    this.artists = json.artists as Artists;
    this.releaseDate = dayjs(json.releaseDate as string);

    this.mainArtists = concatArtists(this.artists.main);
    this.thumbnailCoverUrl = getCoverUrl(this.images, ImageSize.Thumbnail);
    this.smallCoverUrl = getCoverUrl(this.images, ImageSize.Small);
    this.mediumCoverUrl = getCoverUrl(this.images, ImageSize.Medium);
    this.largeCoverUrl = getCoverUrl(this.images, ImageSize.Large);
  }
}
