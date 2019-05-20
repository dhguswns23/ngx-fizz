import {
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import anime from 'animejs';
import {
    AVAILABLE_STATE,
    ETCState,
    ShowHideState,
} from '../core/states';
import {
    NotAvailableStateError,
    NotSupportedMethodError,
} from '../exceptions';
import { FizTimeline } from '../timeline';
import { EnumUtils } from '../utils/enum.util';
import { StringUtils } from '../utils/string.utils';

export interface AnimCallbackData {
    began: boolean;
    progress: number;
    completed: boolean;
}

export class CallbackData {
    constructor(
        public state: string,
    ) {}
}

export class UpdateData extends CallbackData {
    public progress: number;

    constructor(state: string, progress: number) {
        super(state);
        this.progress = progress;
    }
}

export abstract class BaseIcon implements OnChanges {
    @ViewChild('vector') public vector: ElementRef;

    @Input() public strokeColor = '#777';
    @Input() public fillColor: string;
    @Input() public strokeWidth = 1.5;
    @Input() public size = '40px';
    @Input() public state: string;
    @Input() public duration = 500;
    @Input() public easing = 'easeInOutQuad';

    @Output() public stateChange = new EventEmitter();
    @Output() public animationBegin = new EventEmitter();
    @Output() public animationComplete = new EventEmitter();
    @Output() public animating = new EventEmitter();

    @Output() public componentClick = new EventEmitter();
    @Output() public componentMouseDown = new EventEmitter();
    @Output() public componentMouseUp = new EventEmitter();
    @Output() public componentMouseMove = new EventEmitter();
    @Output() public componentMouseEnter = new EventEmitter();
    @Output() public componentMouseLeave = new EventEmitter();
    @Output() public componentMouseOver = new EventEmitter();

    public availableState: object;

    /* tslint:disable */
    protected _anime = anime;

    public ngOnChanges(changes: SimpleChanges): void {
        const { availableState, state } = this;
        const stateList = EnumUtils.valueList(availableState);
        if (!stateList.includes(state)) {
            throw new NotAvailableStateError(
                `Only [${stateList.join(', ')}] are available. But '${state}' is given.`,
            );
        }
        if (changes.hasOwnProperty('state')) {
            this[changes.state.currentValue]();
        }
    }

    public onClick(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentClick.emit(data);
    }

    public onMouseEnter(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentMouseEnter.emit(data);
    }

    public onMouseLeave(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentMouseLeave.emit(data);
    }

    public onMouseOver(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentMouseOver.emit(data);
    }

    public onMouseDown(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentMouseDown.emit(data);
    }

    public onMouseUp(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentMouseUp.emit(data);
    }

    public onMouseMove(event) {
        const data = {
            component: this,
            event: event,
        };
        this.componentMouseMove.emit(data);
    }

    public onBegin(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            this.animationBegin.emit(new CallbackData(state));
        };
    }

    public onUpdate(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            this.animating.emit(new UpdateData(state, anim.progress));
        };
    }

    public onComplete(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            this.animationComplete.emit(new CallbackData(state));
        };
    }

    public bindCallback(state, callbackName = ['begin', 'update', 'complete']) {
        const callbacks = {};
        for (const name of callbackName) {
            callbacks[name] = this[`on${StringUtils.capitalizeFirstLetter(name)}`].bind(this)(state).bind(this);
        }
        return callbacks;
    }

    public rotate() {
        throw new NotSupportedMethodError(`${this.constructor.name} does not support rotate method.`);
    }
}

export class ShowHideIcon extends BaseIcon {
    @ViewChild('target') target: ElementRef;

    public isHide = false;
    public availableState = ShowHideState;

    protected activeTimeline: anime.timeline;
    public nextTimeline: FizTimeline;

    constructor() {
        super();
        if (this.state === undefined) {
            this.state = ShowHideState.SHOW;
        }
    }

    public onBegin(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            if (state === ShowHideState.SHOW) {
                this.isHide = false;
            }
            this.animationBegin.emit(new CallbackData(state));
        };
    }

    public onComplete(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            if (state === ShowHideState.HIDE) {
                this.isHide = true;
            }
            this.animationComplete.emit(new CallbackData(state));
        };
    }

    public initNextTimeline(
        status: AVAILABLE_STATE,
        duration: number,
        stopPrevious = true,
    ): FizTimeline {
        const { easing } = this;
        if (typeof this.nextTimeline !== 'undefined' && stopPrevious) {
            this.nextTimeline.pause();
        }
        const nextTimeline = new FizTimeline(anime.timeline({
            duration, easing,
            ...this.bindCallback(status),
        }));
        if (stopPrevious) {
            this.nextTimeline = nextTimeline;
        }

        return nextTimeline;
    }

    public endAnimation(state: AVAILABLE_STATE, timeline: FizTimeline): Promise<anime.Animation> {
        if (EnumUtils.valueList(ShowHideState).includes(state)) {
            this.stateChange.emit(state);
        }
        return timeline.injectEnd();
    }

    protected _show(duration: number): Promise<anime.Animation> {
        const { _anime, target } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        nextTimeline.add({
            targets: target.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration: number): Promise<anime.Animation> {
        const { _anime, target } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        nextTimeline.add({
            targets: target.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }

    public show() {
        return this._show(this.duration);
    }

    public hide() {
        return this._hide(this.duration);
    }

    public immediateShow() {
        return this._show(1);
    }

    public immediateHide() {
        return this._hide(0);
    }

    public pulse() {
        const { vector } = this;
        const nextTimeline = this.initNextTimeline(ETCState.PULSE, 300, false);
        nextTimeline.add({
            targets: vector.nativeElement,
            keyframes: [{
                scale: 1.2,
            }, {
                scale: 1,
            }],
        });
        return this.endAnimation(ETCState.PULSE, nextTimeline);
    }
}

export abstract class ChevronIcon extends ShowHideIcon {
    @ViewChild('vector') vector: ElementRef;
    @ViewChild('polygon') polygon: ElementRef;

    public availableState = ShowHideState;
    public isHide = false;
    public rotationDegree: number;

    protected pathStep = [
        '20 13 20 13 20 13 20 13',
        '20 13 30 27 30 27 30 27',
        '20 13 30 27 10 27 10 27',
        '20 13 30 27 10 27 20 13',
    ];

    protected get reversePathStep(): Array<string> {
        const { pathStep } = this;
        return Object.assign([], pathStep).reverse();
    }

    public onBegin(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            if (state === ShowHideState.SHOW) {
                this.isHide = false;
            }
            this.animationBegin.emit(new CallbackData(state));
        };
    }

    public onComplete(state: string): (anim: AnimCallbackData) => void {
        return (anim: AnimCallbackData) => {
            if (state === ShowHideState.HIDE) {
                this.isHide = true;
            }
            this.animationComplete.emit(new CallbackData(state));
        };
    }

    protected _show(duration): Promise<anime.Animation> {
        const { polygon, pathStep } = this;

        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
        nextTimeline.add({
            targets: polygon.nativeElement,
            points: pathStep,
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration): Promise<anime.Animation> {
        const { polygon, pathStep } = this;

        const reverseStep = Object.assign([], pathStep).reverse();
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        nextTimeline.add({
            targets: polygon.nativeElement,
            points: reverseStep,
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
