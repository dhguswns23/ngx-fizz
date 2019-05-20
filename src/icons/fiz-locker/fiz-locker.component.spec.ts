import { ComponentFixture } from '@angular/core/testing';
import {
    LockState,
    OpenCloseState,
} from '../../core';
import { testIcon } from '../../test/icon';
import { FizLockerComponent } from './fiz-locker.component';

describe('FizLockerComponent', () => {
    testIcon<FizLockerComponent>(FizLockerComponent, (creationFn => {
        let component: FizLockerComponent;
        let fixture: ComponentFixture<FizLockerComponent>;

        beforeEach(async () => {
            fixture = creationFn(FizLockerComponent, false);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it(`open() should emit lockStateChange Emitter.`, () => {
            spyOn(component.lockStateChange, 'emit');
            component['lock']();
            expect(component.lockStateChange.emit).toHaveBeenCalledWith(LockState.LOCK);
        });

        it(`Change lock state from unlock to lock should call lock().`, () => {
            component.lockState = LockState.UNLOCK;
            spyOn(component,  'lock');
            component.lockState = LockState.LOCK;
            expect(component.lock).toHaveBeenCalled();
        });

        it(`close() should emit lockStateChange Emitter.`, () => {
            spyOn(component.lockStateChange, 'emit');
            component['unLock']();
            expect(component.lockStateChange.emit).toHaveBeenCalledWith(LockState.UNLOCK);
        });

        it(`Change lock state from lock to unlock should call unlock().`, () => {
            component.lockState = LockState.LOCK;
            spyOn(component,  'unLock');
            component.lockState = LockState.UNLOCK;
            expect(component.unLock).toHaveBeenCalled();
        });
    }));
});
