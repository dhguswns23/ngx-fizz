export enum ShowHideState {
    HIDE = 'hide',
    SHOW = 'show',
}

export enum ETCState {
    PULSE = 'pulse',
}

export enum LockState {
    LOCK = 'lock',
    UNLOCK = 'unLock',
}

export enum OpenCloseState {
    OPEN = 'open',
    CLOSE = 'close',
}

export type AVAILABLE_STATE = ShowHideState | ETCState | LockState | OpenCloseState;
