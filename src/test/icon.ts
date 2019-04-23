import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import {
    BaseIcon,
    ShowHideState,
} from '../core';

export type InitiationFnType = (iconType: typeof BaseIcon, configure?: boolean) => void;

export const initiateTest = (icon, configure: boolean = true) => {
    if (configure) {
        TestBed.configureTestingModule({
            declarations: [icon],
        }).compileComponents();
    }

    const fixture = TestBed.createComponent(icon);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
};

export const testIcon = (
    icon: typeof BaseIcon,
    additionalTest?: (creationFn: InitiationFnType) => void,
    creationFn?: InitiationFnType,
) => {
    describe('General Icon Test', () => {
        let component: icon;
        let fixture: ComponentFixture<icon>;

        creationFn = creationFn ? creationFn : initiateTest;

        beforeEach(async () => {
            fixture = creationFn(icon);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        const states = [ShowHideState.SHOW, ShowHideState.HIDE];

        for (const state of states) {
            it(`should '${state}' be called`, () => {
                spyOn(component, state);
                component[state]();
                expect(component[state]).toHaveBeenCalled();
            });

            it(`'animationBegin' emitter should gives '${state}'`, (done) => {
                component.animationBegin.subscribe(value => {
                    expect(value.state).toBe(state);
                    done();
                });
                component[state]();
            });

            it(`'animating' emitter should gives '${state}'`, (done) => {
                component.animating.subscribe(value => {
                    expect(value.state).toBe(state);
                    done();
                });
                component[state]();
            });

            it(`'animationComplete' emitter should gives '${state}'`, (done) => {
                component.animationComplete.subscribe(value => {
                    expect(value.state).toBe(state);
                    done();
                });
                component[state]();
            });
        }

        it('should \'hide\' emit stateChange', () => {
            spyOn(component.stateChange, 'emit');
            component.hide();
            expect(component.stateChange.emit).toHaveBeenCalledWith(ShowHideState.HIDE);
        });

        it('should \'show\' emit stateChange', () => {
            spyOn(component.stateChange, 'emit');
            component.show();
            expect(component.stateChange.emit).toHaveBeenCalledWith(ShowHideState.SHOW);
        });

        // additionalTest(component, fixture);

    });
    if (additionalTest) {
        describe('Additional Icon Test', () => {
            let component: icon;
            let fixture: ComponentFixture<icon>;

            creationFn = creationFn ? creationFn : initiateTest;

            beforeEach(async () => {
                fixture = creationFn(icon);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });
            additionalTest(creationFn);
        });
    }
};
