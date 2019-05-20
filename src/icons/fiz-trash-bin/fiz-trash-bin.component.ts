import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    AVAILABLE_STATE,
    LockState,
    OpenCloseState,
    ShowHideIcon,
    ShowHideState,
} from '../../core';
import { NotAvailableStateError } from '../../exceptions';
import { FizTimeline } from '../../timeline';
import { EnumUtils } from '../../utils/enum.util';
import anime from 'animejs';

@Component({
    selector: 'fiz-trash-bin',
    templateUrl: './fiz-trash-bin.component.html',
    styleUrls: ['./fiz-trash-bin.component.scss'],
})
export class FizTrashBinComponent extends ShowHideIcon implements OnChanges {
    @ViewChild('body') public body: ElementRef;
    @ViewChild('lid') public lid: ElementRef;
    @ViewChild('line1') public line1: ElementRef;
    @ViewChild('line2') public line2: ElementRef;
    @ViewChild('line3') public line3: ElementRef;

    @Input() public openState = OpenCloseState.CLOSE;

    @Output() public openStateChange = new EventEmitter();

    public lidStyle: object;

    constructor() {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.reactToOpenChange(changes);
    }

    public reactToOpenChange(changes: SimpleChanges) {
        if (!changes.hasOwnProperty('openState')) {
            return;
        }

        const stateList = EnumUtils.valueList(OpenCloseState);
        const state = changes.openState.currentValue;
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
        } else if (EnumUtils.valueList(OpenCloseState).includes(state)) {
            this.openStateChange.emit(state);
        }
        return timeline.injectEnd();
    }

    public open() {
        const { lid, duration } = this;
        const nextTimeline = this.initNextTimeline(OpenCloseState.OPEN, duration);

        nextTimeline.add({
            targets: lid.nativeElement,
            rotate: '-30deg',
            transformOrigin: '12px 12px 0',
        });

        return this.endAnimation(OpenCloseState.OPEN, nextTimeline);
    }

    public close() {
        const { lid, duration } = this;
        const nextTimeline = this.initNextTimeline(OpenCloseState.CLOSE, duration);

        nextTimeline.add({
            targets: lid.nativeElement,
            rotate: '0deg',
            transformOrigin: '12px 12px 0',
        });
        return this.endAnimation(OpenCloseState.CLOSE, nextTimeline);
    }

    protected _show(duration) {
        const { _anime, body, lid, line1, line2, line3 } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
        body.nativeElement.style.opacity = 0;
        body.nativeElement.style.lid = 0;
        body.nativeElement.style.line1 = 0;
        body.nativeElement.style.line2 = 0;
        body.nativeElement.style.line3 = 0;

        nextTimeline.add({
            targets: body.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: [line1.nativeElement, line2.nativeElement, line3.nativeElement],
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: [lid.nativeElement],
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, body, lid, line1, line2, line3 } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        body.nativeElement.style.opacity = 1;
        body.nativeElement.style.lid = 1;
        body.nativeElement.style.line1 = 1;
        body.nativeElement.style.line2 = 1;
        body.nativeElement.style.line3 = 1;

        nextTimeline.add({
            targets: [lid.nativeElement],
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        }).add({
            targets: [line1.nativeElement, line2.nativeElement, line3.nativeElement],
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        }).add({
            targets: body.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
