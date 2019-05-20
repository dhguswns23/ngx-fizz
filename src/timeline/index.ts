import anime from 'animejs';
import {
    CantCallableError,
    FizFlowError,
} from '../exceptions';

export class FizFlowFunctionOptions {
    public delay?: number = 0;
}

export class FizFlowOptions extends FizFlowFunctionOptions {
    public repeat?: string | number = 1;
    public delayBetweenRun?: number = 0;

    constructor() {
        super();
    }
}

export class FizTimeline {
    constructor(
        public animeTimeline: anime.timeline,
    ) {

    }

    public add(animeOption: object, opt?: any) {
        this.animeTimeline.add(animeOption, opt);
        return this;
    }

    public injectEnd(): Promise<anime.Animation> {
        return this.animeTimeline.finished;
    }

    public pause(): void {
        this.animeTimeline.pause();
    }

    public restart(): void {
        this.animeTimeline.restart();
    }

    public start(): void {
        this.animeTimeline.start();
    }
}

export interface FizFlowCallable {
    bindedFunc: (...args: any[]) => any;
    opt?: FizFlowFunctionOptions | object;
}

export class FizFlowPromise {
    public bindedFunc;

    constructor(
        executor: (resolve: CallableFunction, reject: CallableFunction) => any,
        public opt?: FizFlowFunctionOptions | object,
    ) {
        this.bindedFunc = () => new Promise(executor);
    }
}

export class FizFlowFunction<T> implements FizFlowCallable {
    constructor(
        private _comp,
        public funcName: string,
        public opt?: FizFlowFunctionOptions | object,
    ) {
        if (typeof _comp === 'undefined') {
            throw new FizFlowError(`FizFlowFunction receives 'undefined'.`);
        }
    }

    public get comp(): T {
        return (this._comp as T);
    }

    public get bindedFunc(): (...args: any[]) => any {
        if (typeof this._comp[this.funcName] === 'undefined') {
            throw new FizFlowError(`${this._comp.constructor.name} doesn't have function named '${this.funcName}'.`);
        }
        return this._comp[this.funcName].bind(this._comp);
    }

    public call(): Promise<Animation> {
        if (!this.comp.hasOwnProperty(this.funcName)) {
            throw new CantCallableError(
                `${this.comp.constructor.name} has no function named '${this.funcName}'.`,
            );
        }
        return this.bindedFunc();
    }
}

export class FizFlow {
    private stopMarked = false;

    constructor(
        public funcs: Array<FizFlowCallable>,
        public opt?: FizFlowOptions | object,
    ) {
        if (typeof opt === 'undefined') {
            this.opt = new FizFlowOptions();
        }
    }

    public run(defOpt?: FizFlowOptions): void {
        this.stopMarked = false;
        if (typeof defOpt === 'undefined') {
            defOpt = this.opt;
        } else {
            defOpt = Object.assign({}, this.opt, defOpt);
        }
        this._run(defOpt, defOpt.repeat);
    }

    private isFizFlowCallable(object: any): object is FizFlowCallable {
        return 'bindedFunc' in object;
    }

    private _run(defOpt: FizFlowOptions, count: number | string): void {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            });
        });
        let next = promise;

        for (const func of this.funcs) {
            if (!this.isFizFlowCallable(func)) {
                throw new CantCallableError(
                    `FizFlow get an uninterpretable function. Please use 'FizFlowFunction' or 'FizFlowPromise'.`,
                );
            }
            const nextPromise = () => {
                const _prom = func.bindedFunc;
                return _prom;
            };
            const opt = func.opt ? Object.assign({}, defOpt, func.opt) : defOpt;

            next = next.then(nextPromise());

            const delayPromise = () => new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, opt.delay);
            });
            next = next.then(delayPromise);
        }
        const nextCount = typeof count === 'number' ? count - 1 : count;
        next.then(this.endOfRun(defOpt, nextCount).bind(this));
    }

    public endOfRun(defOpt: FizFlowOptions, count: number | string): (() => Promise<any>) {
        return () => new Promise((resolve, reject) => {
            if (this.stopMarked) {
                resolve();
                return;
            }
            if ((typeof count === 'number' && count !== 0)
                || (typeof count === 'string' && count === 'infinite')) {
                setTimeout(() => {
                    this._run(defOpt, count);
                    resolve();
                }, defOpt.delayBetweenRun);
            } else {
                resolve();
            }
        });
    }

    public markForStop() {
        this.stopMarked = true;
    }
}
