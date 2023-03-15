import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';
import { StoreService } from '../store/store.service';
import { EventBusData, EventBusState } from './event-bus-action';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  public static subject$ = new Subject<EventBusData<any>>();

  private static appState: EventBusState = new EventBusState();

  constructor(
    private storeService: StoreService,
  ) { }

  async emit(event: EventBusData<any>): Promise<void> {
    await this.updateState(event);
    EventBusService.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return EventBusService.subject$.pipe(
      filter((e: EventBusData<any>) => e.key === eventName),
      map((e: EventBusData<any>) => e.value)
    ).subscribe(action);
  }

  async initialize(): Promise<void> {
    EventBusService.appState = await this.storeService.initializeState();
  }

  getState(): EventBusState{
    return EventBusService.appState;
  }

  private async updateState(event: EventBusData<any>): Promise<void> {
    await EventBusService.appState.updateState(event, this.storeService);
    // EventBusService.appState = await this.storeService.initializeState();
  }

  async clearState(): Promise<void> {
    EventBusService.appState = new EventBusState();
    await this.storeService.clearAll();
  }

}
