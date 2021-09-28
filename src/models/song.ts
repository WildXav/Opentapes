import { Artists, concatArtists } from "@/models/artist";

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

  constructor(json: Record<string, unknown>) {
    this.id = json.id as number;
    this.name = json.name as string;
    this.size = json.size as number;
    this.duration = json.duration as number;
    this.position = json.position as number;
    this.artists = json.artists as Artists;

    this.mainArtists = concatArtists(this.artists.main);
    this.featureArtists = null;
    this.formattedDuration = Song.formatDuration(this.duration);

    if (this.artists.feature && this.artists.feature.length > 0) {
      this.featureArtists = concatArtists(this.artists.feature);
    }
  }

  private static formatDuration(duration: number): string {
    const minutes = (duration / 60).toFixed(2);
    return minutes.toString().replace(".", ":");
  }
}
