import { MMSession } from "@/models/backend/mm-session";
import { Command, execCmd } from "@/models/backend/command";
import { Song } from "@/models/song";
import { Album } from "@/models/album";
import { Single } from "@/models/single";

export abstract class DetailsService {
  static fetchAlbumSongs(
    session: MMSession,
    album: Album,
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

  static fetchSingleSong(
    session: MMSession,
    single: Single,
    retryCb?: () => unknown
  ): Promise<Song> {
    const args = {
      session,
      singleId: single.id,
    };

    return execCmd<Record<string, unknown>>(
      Command.FetchSingleDetails,
      args,
      retryCb
    ).then((json) => new Song(json, single));
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
