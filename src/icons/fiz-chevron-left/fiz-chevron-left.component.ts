import {
    Component,
    OnInit,
} from '@angular/core';
import { ChevronIcon } from '../../core';

@Component({
    selector: 'fiz-chevron-left',
    templateUrl: './fiz-chevron-left.component.html',
    styleUrls: ['./fiz-chevron-left.component.scss'],
})
export class FizChevronLeftComponent extends ChevronIcon implements OnInit {
    public rotationDegree = 270;
    constructor() {
        super();
    }

    ngOnInit() {
    }

}
