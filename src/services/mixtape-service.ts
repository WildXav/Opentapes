import { Mixtape } from "@/models/mixtape";
import { MMSession } from "@/models/backend/mm-session";
import { Command, execCmd } from "@/models/backend/command";

export abstract class MixtapeService {
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
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchLatest,
      { session },
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }

  static fetchTrendingTapes(
    session: MMSession,
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchTrendingTapes,
      { session },
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }

  static fetchGreatestTapes(
    session: MMSession,
    retryCb?: () => unknown
  ): Promise<Array<Mixtape>> {
    return execCmd<Array<Record<string, unknown>>>(
      Command.FetchGreatestTapes,
      { session },
      retryCb
    ).then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)));
  }
}
