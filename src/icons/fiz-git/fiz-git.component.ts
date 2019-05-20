import { Component, OnInit } from '@angular/core';
import { BaseIcon } from '../../core';

@Component({
  selector: 'fiz-git',
  templateUrl: './fiz-git.component.html',
  styleUrls: ['./fiz-git.component.scss']
})
export class FizGitComponent extends BaseIcon implements OnInit {

  constructor() {
      super();
  }

  ngOnInit() {
  }

}
