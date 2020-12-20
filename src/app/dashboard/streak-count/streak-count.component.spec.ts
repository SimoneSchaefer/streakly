import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { StreakCountComponent } from './streak-count.component';

describe('StreakCountComponent', () => {
  let component: StreakCountComponent;
  let fixture: ComponentFixture<StreakCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreakCountComponent ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot() 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StreakCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('color change', () => {
    it('should display bronze for streaks < 10', () => {
      setCount(9);
      expect(getMedal('bronze')).toBeTruthy();
      expect(getMedal('silver')).toBeFalsy();
      expect(getMedal('gold')).toBeFalsy();

    });

    it('should display silver for streaks < 20', () => {
      setCount(19);
      expect(getMedal('bronze')).toBeFalsy();
      expect(getMedal('silver')).toBeTruthy();
      expect(getMedal('gold')).toBeFalsy();
    });

    it('should display gold for streaks > 20', () => {
      setCount(20);
      expect(getMedal('bronze')).toBeFalsy();
      expect(getMedal('silver')).toBeFalsy();
      expect(getMedal('gold')).toBeTruthy();
    });
   });

   function setCount(count: number) {
     component.streakCount = count;
     fixture.detectChanges();
   }

  function getMedal(color: string) {
    return fixture.debugElement.query(By.css('.quiz-medal__circle--' + color));
  }
});
