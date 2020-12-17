import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-streak-count',
  templateUrl: './streak-count.component.html',
  styleUrls: ['./streak-count.component.scss'],
})
export class StreakCountComponent implements OnInit {

  @Input() streakCount: number;
  @Input() size: 'small' | 'large';
  @Input() label: string = '';

  constructor() { }

  ngOnInit() {}

  get color() {
    if (this.streakCount < 10) {
      return 'bronze';
    }
    if (this.streakCount < 20) {
      return 'silver';
    }
    return 'gold';
  }

}
