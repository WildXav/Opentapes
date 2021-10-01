import { Artists, concatArtists } from "@/models/artist";
import { Mixtape } from "@/models/mixtape";

export class Song {
  readonly id: number;
  readonly name: string;
  readonly size: number;
  readonly duration: number;
  readonly position: number;
  readonly artists: Artists;
  readonly mainArtists: string;
  readonly featureArtists: string | null;
  readonly formattedDuration: string;
  readonly thumbnailCoverUrl: string | null;

  constructor(json: Record<string, unknown>, album: Mixtape) {
    this.id = json.id as number;
    this.name = json.name as string;
    this.size = json.size as number;
    this.duration = json.duration as number;
    this.position = json.position as number;
    this.artists = json.artists as Artists;

    this.mainArtists = concatArtists(this.artists.main);
    this.featureArtists = null;
    this.formattedDuration = Song.formatDuration(this.duration);
    this.thumbnailCoverUrl = album.thumbnailCoverUrl;

    if (this.artists.feature && this.artists.feature.length > 0) {
      this.featureArtists = concatArtists(this.artists.feature);
    }
  }

  private static formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${Song.formatNumber(minutes)}:${Song.formatNumber(seconds)}`;
  }

  private static formatNumber(nb: number): string {
    return nb >= 10 ? `${nb}` : `0${nb}`;
  }
}
