import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-locker',
    templateUrl: './fiz-locker.component.html',
    styleUrls: ['./fiz-locker.component.scss'],
})
export class FizLockerComponent extends ShowHideIcon implements OnInit, OnChanges {
    @ViewChild('body') public body: ElementRef;
    @ViewChild('head') public head: ElementRef;
    @ViewChild('hole') public hole: ElementRef;
    @Input() public isLock = true;

    private headStep = [
        'M3.5,15.5V13c0-2.5,2-4.5,4.5-4.5h2c2.5,0,4.5,2,4.5,4.5v5.5',
        'M25.5,15.5V13c0-2.5-2-4.5-4.5-4.5h-2c-2.5,0-4.5,2-4.5,4.5v5.5',
        'M25.5,18.5V13c0-2.5-2-4.5-4.5-4.5h-2c-2.5,0-4.5,2-4.5,4.5v5.5',
    ];

    constructor() {
        super();
    }

    public ngOnInit() {
        this.isLock ? this.lock() : this.unLock();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.hasOwnProperty('isLock')) {
            changes.isLock.currentValue ? this.lock() : this.unLock();
        }
    }

    public lock() {
        const { _anime, head, duration, easing, headStep } = this;
        _anime({
            duration, easing,
            targets: head.nativeElement,
            d: headStep,
        });
    }

    public unLock() {
        const { _anime, head, duration, easing, headStep } = this;
        const reverseStep = Object.assign([], headStep).reverse();
        _anime({
            duration, easing,
            targets: head.nativeElement,
            d: reverseStep,
        });
    }

    protected _show(duration) {
        const { _anime, body, head, hole } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);
        body.nativeElement.style.opacity = 0;

        hole.nativeElement.style.opacity = 0;
        hole.nativeElement.style.transform = 'scale(0)';

        head.nativeElement.style.opacity = 0;

        nextTimeline.add({
            targets: body.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: hole.nativeElement,
            opacity: 1,
            transformOrigin: '20px 25px 0',
            scale: 1,
        }).add({
            targets: head.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        });
        return this.endAnimation(nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, body, head, hole } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        body.nativeElement.style.opacity = 1;

        hole.nativeElement.style.opacity = 1;
        hole.nativeElement.style.transform = 'scale(1)';

        head.nativeElement.style.opacity = 1;

        nextTimeline.add({
            targets: head.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        }).add({
            targets: hole.nativeElement,
            opacity: 0,
            transformOrigin: '20px 25px 0',
            scale: 0,
        }).add({
            targets: body.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        });
        return this.endAnimation(nextTimeline);
    }
}
