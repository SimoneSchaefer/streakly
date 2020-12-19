import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { PersistService } from 'src/app/services/persist.service';

import { EditGoalComponent } from './edit-goal.component';

describe('EditGoalComponent', () => {
  let component: EditGoalComponent;
  let fixture: ComponentFixture<EditGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EditGoalComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['localstorage']
        }),
        ReactiveFormsModule,
        TranslateModule.forRoot() 
      ],
      providers: [
        PersistService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
