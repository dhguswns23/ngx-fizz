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
    selector: 'fiz-image',
    templateUrl: './fiz-image.component.html',
    styleUrls: ['./fiz-image.component.scss'],
})
export class FizImageComponent extends ShowHideIcon implements OnInit {
    @ViewChild('frame') public frame: ElementRef;
    @ViewChild('sun') public sun: ElementRef;
    @ViewChild('mountain') public mountain: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, frame, sun, mountain } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        sun.nativeElement.style.transform = 'scale(0)';

        nextTimeline.add({
            targets: frame.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        }).add({
            targets: mountain.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],

        }).add({
            targets: sun.nativeElement,
            transformOrigin: '13px 14px 0',
            scale: 1,
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, frame, sun, mountain } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        sun.nativeElement.style.transform = 'scale(1)';

        nextTimeline.add({
            targets: sun.nativeElement,
            transformOrigin: '13px 14px 0',
            scale: 0,
        }).add({
            targets: mountain.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        }).add({
            targets: frame.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }

}
