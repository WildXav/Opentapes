import { Mixtape } from "@/models/mixtape";
import { MMSession } from "@/models/backend/mm-session";
import { invoke } from "@tauri-apps/api";
import { Commands } from "@/models/backend/commands";

export abstract class MixtapeService {
  static fetchFeatured(session: MMSession): Promise<Array<Mixtape>> {
    return invoke<Array<Record<string, unknown>>>(Commands.FetchFeatured, {
      session,
    })
      .then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)))
      .catch((e) => {
        // TODO: Show error in dialog
        console.error(e);
        throw e;
      });
  }

  static fetchLatest(session: MMSession): Promise<Array<Mixtape>> {
    return invoke<Array<Record<string, unknown>>>(Commands.FetchLatest, {
      session,
    })
      .then((jsonArray) => jsonArray.map((jsonValue) => new Mixtape(jsonValue)))
      .catch((e) => {
        // TODO: Show error in dialog
        console.error(e);
        throw e;
      });
  }
}
