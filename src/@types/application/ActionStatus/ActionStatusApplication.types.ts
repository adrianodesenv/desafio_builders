export interface IActionStatus<T = null> {
  status: TActionTypeStatus<T>
  message?: string
}

export type TActionTypeStatus<T = null> =
  | 'waiting'
  | 'busy'
  | 'success'
  | 'error'
  | T

export enum EActionTypeStatus {
  Waiting = 'waiting',
  Busy = 'busy',
  Success = 'success',
  Error = 'error',
}
