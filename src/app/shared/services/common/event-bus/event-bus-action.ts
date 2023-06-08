import { AppUser } from 'src/app/shared/core/models/app-user';
import { ILookUp } from "src/app/shared/core/models/app-constants";
import { JWTToken } from "src/app/shared/core/models/jwtToken";
import { StoreService } from "../store/store.service";

export const EventBusActions = {
  state: {
    currentUser: 'state:currentUser',
    jwt: 'state:jwt',
    toast: 'state:toast',
    menu: 'state:menu',
    lookUps: 'state:lookUps',
  },
  toast: 'toast'
};

export class EventBusData<T> {
  public key: string = '';
  public value: T = {} as T;
};

export class EventBusState {

  user: EventBusData<AppUser|null> = { key: EventBusActions.state.currentUser, value: null };
  jwt: EventBusData<JWTToken|null> = { key: EventBusActions.state.jwt, value: null };
  lookUps: EventBusData<ILookUp[]|null> = { key: EventBusActions.state.lookUps, value: null };

  constructor(data: Partial<EventBusState> = {}) {
    Object.assign(this, data);
  }

  async updateState<T>(newData: EventBusData<T>, store: StoreService): Promise<void> {
    const keys = Object.keys(this);

    keys.forEach(async x => {
      const d: any = (this as any)[x];
      if (d.key === newData.key)
      {
        d.value = newData.value;
        await store.saveState(this);
        return;
      }
    });
  }
};
