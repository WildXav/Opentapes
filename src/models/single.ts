import { Artists, concatArtists } from "@/models/artist";
import { Image, ImageSize } from "@/models/image";
import { getCoverUrl } from "@/helpers/album-helper";
import dayjs from "dayjs";

export class Single {
  readonly id: number;
  readonly name: string;
  readonly duration: number;
  readonly artists: Artists;
  readonly album: SingleAlbum;
  readonly mainArtists: string;
  readonly thumbnailCoverUrl: string | null;
  readonly smallCoverUrl: string | null;
  readonly mediumCoverUrl: string | null;
  readonly largeCoverUrl: string | null;

  constructor(json: Record<string, unknown>) {
    this.id = json.id as number;
    this.name = json.name as string;
    this.duration = json.duration as number;
    this.artists = json.artists as Artists;

    this.mainArtists = concatArtists(this.artists.main);
    this.album = new SingleAlbum(json.album as Record<string, unknown>);
    this.thumbnailCoverUrl = getCoverUrl(
      this.album.images,
      ImageSize.Thumbnail
    );
    this.smallCoverUrl = getCoverUrl(this.album.images, ImageSize.Small);
    this.mediumCoverUrl = getCoverUrl(this.album.images, ImageSize.Medium);
    this.largeCoverUrl = getCoverUrl(this.album.images, ImageSize.Large);
  }
}

class SingleAlbum {
  readonly id: number;
  readonly name: string;
  readonly images: Array<Image>;
  readonly releaseDate: dayjs.Dayjs;

  constructor(json: Record<string, unknown>) {
    this.id = json.id as number;
    this.name = json.name as string;
    this.images = json.images as Array<Image>;
    this.releaseDate = dayjs(json.releaseDate as string);
  }
}
