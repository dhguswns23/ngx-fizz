import {
    Component,
    OnInit,
} from '@angular/core';
import { ChevronIcon } from '../../core';

@Component({
    selector: 'fiz-chevron-top',
    templateUrl: './fiz-chevron-top.component.html',
    styleUrls: ['./fiz-chevron-top.component.scss'],
})
export class FizChevronTopComponent extends ChevronIcon implements OnInit {
    public rotationDegree = 0;

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
