import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreakCountComponent } from './streak-count.component';

describe('StreakCountComponent', () => {
  let component: StreakCountComponent;
  let fixture: ComponentFixture<StreakCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreakCountComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreakCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
