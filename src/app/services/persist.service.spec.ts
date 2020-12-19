import { TestBed } from '@angular/core/testing';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Serializable } from '../models/serializable';

import { PersistService } from './persist.service';

describe('PersistService', () => {
  let service: PersistService;
  let storeSetSpy: jasmine.Spy;
  let storeGetSpy: jasmine.Spy;
  const testKey = 'storage/key'
  const testItem: Serializable = {
    id: '123',
    name: 'some name'
  } as Serializable;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['localstorage']
        })
      ]
    });
    service = TestBed.inject(PersistService);
    storeGetSpy = spyOn(TestBed.inject(Storage), 'get');
    storeSetSpy = spyOn(TestBed.inject(Storage), 'set');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem', () => {
    describe('if item is in store', () => {
      beforeEach(() => {
        storeGetSpy.and.returnValue(mockItem(testItem));
      });
      it('returns item ', (done) => {
        service.getItem(testKey, 123).then((resolved) => {
          expect(resolved).toEqual(testItem);
          done();
        })
      })
    });   
    describe('if item is NOT in store', () => {
      it('returns default item ', (done) => {
        service.getItem(testKey, 123).then((resolved) => {
          expect(resolved).toEqual(123);
          done();
        })      
      })
    });   
  });

  describe('getItems', () => {
    describe('if item is in store', () => {
      beforeEach(() => {
        storeGetSpy.and.returnValue(mockItem([testItem]));
      });
      it('returns item ', (done) => {
        service.getItems(testKey).then((resolved) => {
          expect(resolved).toEqual([testItem]);
          done();
        })
      })
    });   

    describe('if item is NOT in store', () => {
      it('returns empty array ', (done) => {
        service.getItems(testKey).then((resolved) => {
          expect(resolved).toEqual([]);
          done();
        })      
      })
    });   
  });

  describe('save items', () => {
    it('should call storage', () => {
      service.saveItem(testKey, [testItem]);
      expect(storeSetSpy).toHaveBeenCalledTimes(1);
      expect(storeSetSpy).toHaveBeenCalledWith(testKey, [testItem]);
    });
  });

  describe('addOrUpdateItemInList', () => {
    const existingItem = {
      id: "Arg!"
    }

    describe('when item has NO id', () => {
      it('should add new item', (done) => {
        storeGetSpy.and.returnValue(mockItem([existingItem]));
        const newItem = { id: null, name: 'new name'} as Serializable;

        service.addOrUpdateItemInList(testKey, newItem).then(() => {
          const lastCallArgs = storeSetSpy.calls.mostRecent().args;
          expect(lastCallArgs[0]).toEqual(testKey);

          expect(lastCallArgs[1].length).toEqual(2);
          expect(lastCallArgs[1][0]).toEqual(existingItem);
          expect(lastCallArgs[1][1].name).toEqual('new name');
          expect(lastCallArgs[1][0].id.length).toBeGreaterThan(3);
          done();
        });
      });
    });

    describe('when item has an id', () => {
      it('should add new item', (done) => {
        storeGetSpy.and.returnValue(mockItem([existingItem]));

        service.addOrUpdateItemInList(testKey, testItem).then(() => {
          expect(storeSetSpy).toHaveBeenCalledWith(testKey, [existingItem, testItem]);
          done();
        });
      });

      it('should update existing item', (done) => {
        storeGetSpy.and.returnValue(mockItem([testItem]));
        const updatedItem = Object.assign({}, testItem, {name: "newName"});

        service.addOrUpdateItemInList(testKey, updatedItem).then(() => {
          expect(storeSetSpy).toHaveBeenCalledWith(testKey, [updatedItem]);
          done();
        });
      });
    });
  });


  describe('deleteItemFromList', () => {
    beforeEach(() => {
      storeGetSpy.and.returnValue(mockItem([testItem, {id: 'other item'}]));
    });

    it('should remove item and update store', (done) => {
      service.deleteItemFromList(testKey, testItem.id).then(() => {
        expect(storeSetSpy).toHaveBeenCalledWith(testKey, [{id: 'other item'}]);
        done();
      });
    });
  });

  function mockItem(item) {
    return Promise.resolve(item);
  }
});
