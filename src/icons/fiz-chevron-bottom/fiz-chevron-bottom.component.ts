import {
    Component,
    OnInit,
} from '@angular/core';
import { ChevronIcon } from '../../core';

@Component({
    selector: 'fiz-chevron-bottom',
    templateUrl: './fiz-chevron-bottom.component.html',
    styleUrls: ['./fiz-chevron-bottom.component.scss'],
})
export class FizChevronBottomComponent extends ChevronIcon implements OnInit {
    public rotationDegree = 180;

    constructor() {
        super();
    }

    public ngOnInit() {
    }
}
