import {
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-check',
    templateUrl: './fiz-check.component.html',
    styleUrls: ['./fiz-check.component.scss'],
})
export class FizCheckComponent extends ShowHideIcon {
    @ViewChild('checker') public checker: ElementRef;
    @ViewChild('polygon') public polygon: ElementRef;

    private pathStep = [
        '6 18.50590891 6 18.50590891 6 18.50590891',
        '6 18.50590891 14.52484413 30 14.52484413 30',
        '6 18.50590891 14.52484413 30 34 10',
    ];

    constructor() {
        super();
    }

    protected _show(duration) {
        const { polygon, pathStep } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        nextTimeline.add({
            targets: polygon.nativeElement,
            points: pathStep,
        });
        return this.endAnimation(nextTimeline);
    }

    protected _hide(duration) {
        const { polygon, pathStep } = this;
        const reverseStep = Object.assign([], pathStep).reverse();
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        nextTimeline.add({
            targets: polygon.nativeElement,
            points: reverseStep,
        });
        return this.endAnimation(nextTimeline);
    }
}
