import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageActivitiesPage } from './manage-activities.page';

describe('ManageActivitiesPage', () => {
  let component: ManageActivitiesPage;
  let fixture: ComponentFixture<ManageActivitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageActivitiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
