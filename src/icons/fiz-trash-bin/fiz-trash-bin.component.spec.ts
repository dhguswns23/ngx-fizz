import { ComponentFixture } from '@angular/core/testing';
import { OpenCloseState } from '../../core';
import { testIcon } from '../../test/icon';
import { FizTrashBinComponent } from './fiz-trash-bin.component';

describe('FizTrashBinComponent', () => {
    testIcon<FizTrashBinComponent>(FizTrashBinComponent, (creationFn => {
        let component: FizTrashBinComponent;
        let fixture: ComponentFixture<FizTrashBinComponent>;

        beforeEach(async () => {
            fixture = creationFn(FizTrashBinComponent, false);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it(`open() should emit openStateChange Emitter.`, () => {
            spyOn(component.openStateChange, 'emit');
            component['open']();
            expect(component.openStateChange.emit).toHaveBeenCalledWith(OpenCloseState.OPEN);
        });

        it(`Change open state from close to open should call open().`, () => {
            component.openState = OpenCloseState.CLOSE;
            spyOn(component,  'open');
            component.openState = OpenCloseState.OPEN;
            expect(component.open).toHaveBeenCalled();
        });

        it(`close() should emit openStateChange Emitter.`, () => {
            spyOn(component.openStateChange, 'emit');
            component['close']();
            expect(component.openStateChange.emit).toHaveBeenCalledWith(OpenCloseState.CLOSE);
        });

        it(`Change open state from open to close should call close().`, () => {
            component.openState = OpenCloseState.OPEN;
            spyOn(component,  'close');
            component.openState = OpenCloseState.CLOSE;
            expect(component.close).toHaveBeenCalled();
        });
    }));
});
