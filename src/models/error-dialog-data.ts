import { Error } from "@/models/backend/error";

export class ErrorDialogData {
  constructor(
    readonly error: Error,
    readonly showClose: boolean,
    readonly retryCallback?: () => unknown
  ) {}
}
