import { ComponentFixture } from '@angular/core/testing';
import { testIcon } from '../../test/icon';
import { FizCheckComponent } from './fiz-check.component';

describe('FizCheckComponent', () => {
    testIcon(FizCheckComponent, (creationFn) => {
        let component: FizCheckComponent;
        let fixture: ComponentFixture<FizCheckComponent>;

        beforeEach(async () => {
            fixture = creationFn(FizCheckComponent, false);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it(`inner additional test`, () => {
            console.log(component);
            expect(component).toBe(component);
        });
    });
});
