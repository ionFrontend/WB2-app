import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'notebookData';

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  setData(data: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
