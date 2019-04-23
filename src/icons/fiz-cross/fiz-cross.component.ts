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
    selector: 'fiz-cross',
    templateUrl: './fiz-cross.component.html',
    styleUrls: ['./fiz-cross.component.scss'],
})
export class FizCrossComponent extends ShowHideIcon {
    @ViewChild('vector') public vector: ElementRef;
    @ViewChild('path1') public path1: ElementRef;
    @ViewChild('path2') public path2: ElementRef;

    private pathStep = [
        '6 18.50590891 6 18.50590891 6 18.50590891',
        '6 18.50590891 14.52484413 30 14.52484413 30',
        '6 18.50590891 14.52484413 30 34 10',
    ];

    constructor() {
        super();
    }

    public _show(duration) {
        const { path1, path2 } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        nextTimeline.add({
            targets: path1.nativeElement,
            translateX: 0,
            translateY: 0,
            opacity: 1,
        }).add({
            targets: path2.nativeElement,
            translateX: 0,
            translateY: 0,
            opacity: 1,
            delay: 200,
        }, `-=${duration}`);
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { path1, path2 } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        nextTimeline.add({
            targets: path1.nativeElement,
            translateX: -50,
            translateY: -50,
            delay: 200,
            opacity: 0,
        }).add({
            targets: path2.nativeElement,
            translateX: 50,
            translateY: -50,
            opacity: 0,
            delay: 200,
        }, `-=${duration}`);
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }

    public rotate() {
        const { _anime, vector, easing, duration } = this;
        _anime({
            targets: vector.nativeElement,
            keyframes: [
                { rotate: 0 },
                { rotate: 360 },
            ],
            easing, duration,
        });
    }

}
