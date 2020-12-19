import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Serializable } from '../models/serializable';

@Injectable({
  providedIn: 'root'
})
export class PersistService {
  constructor(private storage: Storage) { }


  /**
   * Awaits and returns stored value for the given store key.
   * Returns the passed default value instead when the stored value is Falsy.
   */
  public async getItem(storeKey: string, defaultValue: Serializable | number) {
    return await this.storage.get(storeKey) || defaultValue;
  }


  /**
   * Awaits and returns stored value for the given store key.
   * Returns an empty array instead when the stored value is Falsy.
   */
  public async getItems(storeKey: string) {
    return await this.storage.get(storeKey) || [];
  }


  /**
   * Save an item or complete list as-is in the store with the given key.
   * If you want to add or update an item within a list in the store use #addOrUpdateItemInList
   */
  public async saveItem(storeKey: string, items: Serializable[] | Serializable) {
    return await this.storage.set(storeKey, items); 
  }

  
  public async addOrUpdateItemInList(storeKey: string, item: Serializable) {
    const items = await this.getItems(storeKey);
    if (!item.id)  {
      item.id = `id_${Math.random()}`;   
    }
    const itemIndex = items.findIndex(existing => item.id === existing.id);
    if (itemIndex >= 0) {
      items[itemIndex] = item;
    } else {
      items.push(item);
    }
    await this.saveItem(storeKey, items);
    return items
  }  
  /**
   * Delete an item from the array stored under the given key.
   * 
   * @param storeKey the store key - make sure that this key is mapped to an array!
   * @param id the id of the item to be deleted
   */
  public async deleteItemFromList(storeKey: string, id: string) {
    const items = await this.getItems(storeKey);
    const index = items.findIndex(act => act.id === id);
    if (index >= 0) {
      items.splice(index, 1);
      await this.storage.set(storeKey, items);
    }
    return items;
  }
}
