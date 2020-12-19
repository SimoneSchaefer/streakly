import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';

import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['localstorage']
        }),
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
