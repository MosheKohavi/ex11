import {BehaviorSubject, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {LocalStorageService} from "../services/local-storage.service";
import {HttpClient} from "@angular/common/http";

export interface item {
  id: number;
}

export abstract class JsonData<T extends item> {

  protected _data = new BehaviorSubject<T[] | null>(this.lsService.get<T[]>(this.lsKey));

  protected data$ = this._data.pipe(
    map(data => data || [])
  );

  protected constructor(
    protected lsService: LocalStorageService,
    protected http: HttpClient,
    protected readonly initSrc: string,
    protected readonly lsKey: string,
  ) {
    this._data.subscribe(data => {
      if (data === null) {
        this.http.get<T[]>(this.initSrc, {responseType: "json"}).subscribe(data => {
          this._data.next(data);
        });
      }
      this.lsService.set(this.lsKey, data);
    });
  }

  protected add(item: T) {
    item.id = Date.now();
    const list = this._data.value;
    list?.push(item);
    this._data.next(list);
  }

  protected edit(item: T) {
    const list = this._data.value;
    const idx = list?.findIndex(i => i.id === item.id);
    if (typeof idx !== "undefined" && idx >= 0) {
      list?.splice(idx, 1, item);
      this._data.next(list);
    }
  }

  protected delete(id: number) {
    const list = this._data.value;
    const idx = list?.findIndex(i => i.id === id);
    if (typeof idx !== "undefined" && idx >= 0) {
      list?.splice(idx, 1);
      this._data.next(list);
    }
  }

}
