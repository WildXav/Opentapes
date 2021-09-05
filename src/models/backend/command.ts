import { invoke } from "@tauri-apps/api";
import { InvokeArgs } from "@tauri-apps/api/tauri";
import { Error } from "@/models/backend/error";
import store from "@/store";
import { ErrorDialogData } from "@/models/error-dialog-data";

export enum Command {
  ShowWindow = "show_window",
  RequestNewSession = "request_new_session",
  FetchFeatured = "fetch_featured",
  FetchLatest = "fetch_latest",
  FetchTrendingTapes = "fetch_trending_tapes",
  FetchGreatestTapes = "fetch_greatest_tapes",
}

export function execCmd<T>(
  cmd: Command,
  args: InvokeArgs = {},
  retryCb?: () => unknown
): Promise<T> {
  return invoke<T>(cmd, args).catch(async (error: Error) => {
    await store.dispatch.setErrorDialogData(
      new ErrorDialogData(error, true, retryCb)
    );
    throw error;
  });
}
