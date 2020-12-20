import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from '../services/store.service';

import { DashboardPage } from './dashboard.page';
import { StreakCountComponent } from './streak-count/streak-count.component';


describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let storeService: StoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardPage ,
        StreakCountComponent
      ],
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

  describe('initial view', () => {

    describe('when no goals have been set', () => {
      beforeEach(() => {
        spyOn(storeService, "getGoals").and.returnValue(Promise.resolve([]));
        fixture.detectChanges();
      });
  
      it('should display no-goals note', () => {
        expect(getNoGoalsHint()).toBeTruthy();
        expect(getNoGoalsHint().query(By.css('h4')).nativeElement.innerText).toEqual('dashboard.no_goals_header');
        expect(getNoGoalsHint().query(By.css('.ion-padding div')).nativeElement.innerText).toEqual('dashboard.no_goals_subheader');
      });
    });

    describe('when goals have been set', () => {
      beforeEach(() => {
        spyOn(storeService, "getGoals").and.callFake(() => Promise.resolve([{
          id: 'goal1',
          activityName: 'Running'
        }, {
          id: 'goal2',
          activityName: 'Yoga'
        }]));
        updateComponent();
      });
      
      it('should NOT display no-goals note', () => {
        expect(getNoGoalsHint()).toBeFalsy();     
      });
    });
  });

  function updateComponent() {
    component.ionViewWillEnter();
    fixture.detectChanges();
  }

  function getNoGoalsHint() {
    return fixture.debugElement.query(By.css('.jumbotron'));
  }

});
