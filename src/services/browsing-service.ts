import { Album } from "@/models/album";
import { MMSession } from "@/models/backend/mm-session";
import { Command, execCmd } from "@/models/backend/command";
import { Single } from "@/models/single";

export abstract class BrowsingService {
  static fetchFeatured(
    session: MMSession,
    retryCb?: () => unknown
  ): Promise<Array<Album>> {
    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchFeatured,
      { session },
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Album(jsonValue)));
  }

  static fetchLatest(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Album>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchLatest,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Album(jsonValue)));
  }

  static fetchTrendingTapes(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Album>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchTrendingTapes,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Album(jsonValue)));
  }

  static fetchGreatestTapes(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Album>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchGreatestTapes,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Album(jsonValue)));
  }

  static fetchTrendingSingles(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Single>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchTrendingSingles,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Single(jsonValue)));
  }

  static fetchGreatestSingles(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Single>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchGreatestSingles,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Single(jsonValue)));
  }
}
