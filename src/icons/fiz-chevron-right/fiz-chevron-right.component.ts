import {
    Component,
    OnInit,
} from '@angular/core';
import { ChevronIcon } from '../../core';

@Component({
    selector: 'fiz-chevron-right',
    templateUrl: './fiz-chevron-right.component.html',
    styleUrls: ['./fiz-chevron-right.component.scss'],
})
export class FizChevronRightComponent extends ChevronIcon implements OnInit {
    public rotationDegree = 90;

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
