/* eslint-disable @typescript-eslint/naming-convention */
import { PersistedReducer } from '@/store/StoreConfig'

declare module 'ApplicationStore' {
  export type State = ReturnType<typeof PersistedReducer>
}
