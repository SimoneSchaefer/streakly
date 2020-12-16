import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-streak-count',
  templateUrl: './streak-count.component.html',
  styleUrls: ['./streak-count.component.scss'],
})
export class StreakCountComponent implements OnInit {

  @Input() streakCount: number;

  constructor() { }

  ngOnInit() {}

}
