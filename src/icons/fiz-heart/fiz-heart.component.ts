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
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
        nextTimeline.add({
            targets: heart.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, vector, heart } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);
        nextTimeline.add({
            targets: heart.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
