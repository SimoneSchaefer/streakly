import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddActivityPage } from './add-activity.page';

describe('AddActivityPage', () => {
  let component: AddActivityPage;
  let fixture: ComponentFixture<AddActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
