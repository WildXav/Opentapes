import { MMSession } from "@/models/backend/mm-session";
import { Command, execCmd } from "@/models/backend/command";
import { Song } from "@/models/song";

export abstract class DetailsService {
  static fetchSongs(
    session: MMSession,
    albumId: number,
    retryCb?: () => unknown
  ): Promise<Array<Song>> {
    const args = {
      session,
      albumId,
    };

    return execCmd<Record<string, unknown>>(
      Command.FetchAlbumDetails,
      args,
      retryCb
    ).then((json) =>
      (json.songs as Array<Record<string, unknown>>).map(
        (songJson) => new Song(songJson)
      )
    );
  }
}
