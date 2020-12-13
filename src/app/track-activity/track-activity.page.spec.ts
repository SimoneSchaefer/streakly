import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackActivityPage } from './track-activity.page';

describe('TrackActivityPage', () => {
  let component: TrackActivityPage;
  let fixture: ComponentFixture<TrackActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
