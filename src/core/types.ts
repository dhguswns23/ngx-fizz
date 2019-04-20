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
import { animatePulse } from '../animations';
import { ShowHideState } from '../core/states';
import {
    NotAvailableStateError,
    NotSupportedMethodError,
} from '../exceptions';
import { FizTimeline } from '../timeline';
import { StringUtls } from '../utils/string.utls';

export interface AnimCallbackData {
    began: boolean;
    progress: number;
    completed: boolean;
}

export class CallbackData {
    public state: string;

    constructor(state: string) {
        this.state = state;
    }
}

export class UpdateData extends CallbackData {
    public progress: number;

    constructor(state: string, progress: number) {
        super(state);
        this.progress = progress;
    }
}

export abstract class BaseIcon implements OnChanges {
    @Input() public strokeColor = '#777';
    @Input() public fillColor: string;
    @Input() public strokeWidth = 1.5;
    @Input() public size = '40px';
    @Input() public state: string;
    @Input() public duration = 500;
    @Input() public easing = 'easeInOutQuad';

    @Output() public animationBegin = new EventEmitter();
    @Output() public animationComplete = new EventEmitter();
    @Output() public animating = new EventEmitter();
    public availableState: object;

    /* tslint:disable */
    protected _anime = anime;

    public ngOnChanges(changes: SimpleChanges): void {
        const { availableState, state } = this;
        const stateList = Object.values(availableState);
        if (!stateList.includes(state)) {
            throw new NotAvailableStateError(
                `Only [${stateList.join(', ')}] are available. But '${state}' is given.`,
            );
        }
        if (changes.hasOwnProperty('state')) {
            this[changes.state.currentValue]();
        }
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
            callbacks[name] = this[`on${StringUtls.capitalizeFirstLetter(name)}`].bind(this)(state);
        }
        return callbacks;
    }

    public rotate() {
        throw new NotSupportedMethodError(`${this.constructor.name} does not support rotate method.`);
    }
}

export class ShowHideIcon extends BaseIcon {
    @ViewChild('vector') vector: ElementRef;
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

    public initNextTimeline(status: ShowHideState, duration: number): FizTimeline {
        const { easing } = this;
        if (typeof this.nextTimeline !== 'undefined') {
            this.nextTimeline.pause();
        }
        this.nextTimeline = new FizTimeline(anime.timeline({
            duration, easing,
            ...this.bindCallback(status),
        }));

        return this.nextTimeline;
    }

    public endAnimation(timeline: FizTimeline): Promise<anime.Animation> {
        return timeline.injectEnd();
    }


    protected _show(duration: number): Promise<anime.Animation> {
        const { _anime, target, easing } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        nextTimeline.add({
            targets: target.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
            ...this.bindCallback(ShowHideState.SHOW),
        });
        return this.endAnimation(nextTimeline);
    }

    protected _hide(duration: number): Promise<anime.Animation> {
        const { _anime, target } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        nextTimeline.add({
            targets: target.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
            ...this.bindCallback(ShowHideState.HIDE),
        });
        return this.endAnimation(nextTimeline);
    }

    public show() {
       return this._show(this.duration);
    }

    public hide() {
        return this._hide(this.duration);
    }

    public immediateShow() {
        return this._show(0);
    }

    public immediateHide() {
        return this._hide(0);
    }

    public pulse(autoplay = true, duration: number = 100, count: number = 1) {
        const { target, easing } = this;

        animatePulse(target, duration, easing, count);
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

    protected _show(): Promise<anime.Animation> {
        const { polygon, pathStep } = this;

        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);
        nextTimeline.add({
            targets: polygon.nativeElement,
            points: pathStep,
            ...this.bindCallback(ShowHideState.SHOW),
        });
        return this.endAnimation(nextTimeline);
    }

    protected _hide(): Promise<anime.Animation> {
        const { polygon, pathStep } = this;

        const reverseStep = Object.assign([], pathStep).reverse();
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        nextTimeline.add({
            targets: polygon.nativeElement,
            points: reverseStep,
            ...this.bindCallback(ShowHideState.HIDE),
        });
        return this.endAnimation(nextTimeline);
    }

    public pulse() {

    }
}
