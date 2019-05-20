import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    AVAILABLE_STATE,
    LockState,
    ShowHideIcon,
    ShowHideState,
} from '../../core';
import { NotAvailableStateError } from '../../exceptions';
import { FizTimeline } from '../../timeline';
import { EnumUtils } from '../../utils/enum.util';
import anime from 'animejs';

@Component({
    selector: 'fiz-locker',
    templateUrl: './fiz-locker.component.html',
    styleUrls: ['./fiz-locker.component.scss'],
})
export class FizLockerComponent extends ShowHideIcon implements OnChanges {
    @ViewChild('body') public body: ElementRef;
    @ViewChild('head') public head: ElementRef;
    @ViewChild('hole') public hole: ElementRef;

    @Input() public lockState = LockState.LOCK;

    @Output() public lockStateChange = new EventEmitter();

    private headStep = [
        'M3.5,15.5V13c0-2.5,2-4.5,4.5-4.5h2c2.5,0,4.5,2,4.5,4.5v5.5',
        'M25.5,15.5V13c0-2.5-2-4.5-4.5-4.5h-2c-2.5,0-4.5,2-4.5,4.5v5.5',
        'M25.5,18.5V13c0-2.5-2-4.5-4.5-4.5h-2c-2.5,0-4.5,2-4.5,4.5v5.5',
    ];

    constructor() {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.reactToLockChange(changes);
    }

    public reactToLockChange(changes: SimpleChanges) {
        if (!changes.hasOwnProperty('lockState')) {
            return;
        }

        const stateList = EnumUtils.valueList(LockState);
        const state = changes.lockState.currentValue;

        if (!stateList.includes(state)) {
            throw new NotAvailableStateError(
                `Only [${stateList.join(', ')}] are available. But '${state}' is given.`,
            );
        }
        this[state]();
    }

    public endAnimation(state: AVAILABLE_STATE, timeline: FizTimeline): Promise<anime.Animation> {
        if (EnumUtils.valueList(ShowHideState).includes(state)) {
            this.stateChange.emit(state);
        } else if (EnumUtils.valueList(LockState).includes(state)) {
            this.lockStateChange.emit(state);
        }
        return timeline.injectEnd();
    }

    public lock() {
        const { head, duration, headStep } = this;
        const nextTimeline = this.initNextTimeline(LockState.LOCK, duration);

        nextTimeline.add({
            targets: head.nativeElement,
            d: headStep,
        });
        return this.endAnimation(LockState.LOCK, nextTimeline);
    }

    public unLock() {
        const { head, duration, headStep } = this;
        const nextTimeline = this.initNextTimeline(LockState.UNLOCK, duration);
        const reverseStep = Object.assign([], headStep).reverse();

        nextTimeline.add({
            targets: head.nativeElement,
            d: reverseStep,
        });

        return this.endAnimation(LockState.UNLOCK, nextTimeline);
    }

    protected _show(duration) {
        const { _anime, body, head, hole } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
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
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, body, head, hole } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

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
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
