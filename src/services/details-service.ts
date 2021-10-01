import { MMSession } from "@/models/backend/mm-session";
import { Command, execCmd } from "@/models/backend/command";
import { Song } from "@/models/song";
import { Mixtape } from "@/models/mixtape";

export abstract class DetailsService {
  static fetchSongs(
    session: MMSession,
    album: Mixtape,
    retryCb?: () => unknown
  ): Promise<Array<Song>> {
    const args = {
      session,
      albumId: album.id,
    };

    return execCmd<Record<string, unknown>>(
      Command.FetchAlbumDetails,
      args,
      retryCb
    ).then((json) =>
      (json.songs as Array<Record<string, unknown>>).map(
        (songJson) => new Song(songJson, album)
      )
    );
  }

  static fetchSongLocation(
    session: MMSession,
    songId: number,
    retryCb?: () => unknown
  ): Promise<string> {
    const args = {
      session,
      songId,
    };

    return execCmd<string>(Command.FetchSongLocation, args, retryCb);
  }
}
