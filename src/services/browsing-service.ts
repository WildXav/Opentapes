import { Mixtape } from "@/models/mixtape";
import { MMSession } from "@/models/backend/mm-session";
import { Command, execCmd } from "@/models/backend/command";

export abstract class BrowsingService {
  static fetchFeatured(
    session: MMSession,
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchFeatured,
      { session },
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }

  static fetchLatest(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchLatest,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }

  static fetchTrendingTapes(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchTrendingTapes,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }

  static fetchGreatestTapes(
    session: MMSession,
    page: number,
    size: number,
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    const args = {
      session,
      page,
      size,
    };

    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchGreatestTapes,
      args,
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }
}
