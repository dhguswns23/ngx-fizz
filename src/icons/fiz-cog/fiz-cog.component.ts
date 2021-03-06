import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-cog',
    templateUrl: './fiz-cog.component.html',
    styleUrls: ['./fiz-cog.component.scss'],
})
export class FizCogComponent extends ShowHideIcon implements OnInit {
    @ViewChild('vector') public vector: ElementRef;
    @ViewChild('innerCircle') public innerCircle: ElementRef;
    @ViewChild('outerCircle') public outerCircle: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, innerCircle, outerCircle } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;

        nextTimeline.add({
            targets: innerCircle.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        }).add({
            targets: outerCircle.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);

    }

    protected _hide(duration) {
        const { _anime, innerCircle, outerCircle } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        nextTimeline.add({
            targets: outerCircle.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        }).add({
            targets: innerCircle.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);

    }
}
