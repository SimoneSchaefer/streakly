import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from '../services/store.service';

import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let storeService: StoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPage ],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['localstorage']
        }),
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    storeService = TestBed.inject(StoreService);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
