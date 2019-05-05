import anime from 'animejs';
import { CantCallableError } from '../exceptions';

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

export class FizFlowFunction<T> {
    constructor(
        private _comp,
        public funcName: string,
        public opt?: FizFlowFunctionOptions | object,
    ) {

    }

    public get comp(): T {
        return (this._comp as T);
    }

    public get bindedFunc(): (...args: any[]) => any {
        return this.comp[this.funcName].bind(this._comp);
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
        public funcs: Array<FizFlowFunction<any>>,
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

    private _run(defOpt: FizFlowOptions, count: number | string): void {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            });
        });
        let next = promise;

        for (const func of this.funcs) {
            if (!(func instanceof FizFlowFunction)) {
                throw new CantCallableError(
                    `FizFlow get an uninterpretable function. Please use 'FizFlowFunction.'`,
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
