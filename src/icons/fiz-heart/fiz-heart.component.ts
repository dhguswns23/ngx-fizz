import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { animatePulse } from '../../animations';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-heart',
    templateUrl: './fiz-heart.component.html',
    styleUrls: ['./fiz-heart.component.scss'],
})
export class FizHeartComponent extends ShowHideIcon implements OnInit {
    @ViewChild('vector') public vector: ElementRef;
    @ViewChild('heart') public heart: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, heart } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);
        nextTimeline.add({
            targets: heart.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        });
        return this.endAnimation(nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, vector, heart } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);
        nextTimeline.add({
            targets: heart.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(nextTimeline);
    }

    public pulse(autoplay = true, duration: number = 100, count: number = 1) {
        const { heart, easing } = this;

        animatePulse(heart, duration, easing, count);
    }
}
