import { Component, OnInit } from '@angular/core';
import { BaseIcon } from '../../core';

@Component({
  selector: 'fiz-menu',
  templateUrl: './fiz-menu.component.html',
  styleUrls: ['./fiz-menu.component.css']
})
export class FizMenuComponent extends BaseIcon implements OnInit {

  constructor() {
      super();
  }

  ngOnInit() {
  }

}
