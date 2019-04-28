import anime from 'animejs';
import { CantCallableError } from '../exceptions';

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
        public args: Array<any> = [],
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
                `${this.comp.constructor.name} has no function named '${this.funcName}'.`
            );
        }
        return this.bindedFunc();
    }
}

export class FizFlow {
    constructor(
        public funcs: Array<FizFlowFunction<any>>,
    ) {

    }

    public run(): void {
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
            next = next.then(nextPromise());
        }
    }
}
