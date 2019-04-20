import {
    Component,
    OnInit,
} from '@angular/core';
import { ShowHideIcon } from '../../core';

@Component({
    selector: 'fiz-star',
    templateUrl: './fiz-star.component.html',
    styleUrls: ['./fiz-star.component.scss'],
})
export class FizStarComponent extends ShowHideIcon implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit() {

    }

}
