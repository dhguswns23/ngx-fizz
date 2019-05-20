import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    BaseIcon,
    ETCState,
    ShowHideIcon,
    ShowHideState,
} from '../core';

export type InitiationFnType = (iconType: typeof BaseIcon, configure?: boolean) => any;

export const initiateTest = (icon, configure: boolean = true) => {
    if (configure) {
        TestBed.configureTestingModule({
            declarations: [icon],
        }).compileComponents();
    }

    const fixture = TestBed.createComponent(icon);
    fixture.detectChanges();
    return fixture;
};

export const testIcon = <IconType extends ShowHideIcon>(
    icon: typeof BaseIcon,
    additionalTest?: (creationFn: InitiationFnType) => void,
    creationFn?: InitiationFnType,
) => {
    describe('General Icon Test', () => {
        let component: IconType;
        let fixture: ComponentFixture<IconType>;

        creationFn = creationFn ? creationFn : initiateTest;

        beforeEach(async () => {
            fixture = creationFn(icon);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        const states = [ShowHideState.SHOW, ShowHideState.HIDE, ETCState.PULSE];

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

        it('should \'immediateHide\' emit stateChange', () => {
            spyOn(component.stateChange, 'emit');
            component.immediateHide();
            expect(component.stateChange.emit).toHaveBeenCalledWith(ShowHideState.HIDE);
        });

        it('should \'immediateShow\' emit stateChange', () => {
            spyOn(component.stateChange, 'emit');
            component.immediateShow();
            expect(component.stateChange.emit).toHaveBeenCalledWith(ShowHideState.SHOW);
        });

        it('should \'strokeWidth\' change svg\'s strokeWidth.', () => {
            const width = 3;
            component.strokeWidth = width;
            fixture.detectChanges();
            const appliedWidth = (component.vector.nativeElement.childNodes[0] as Element).getAttribute('stroke-width');
            expect(appliedWidth).toBe(width.toString());
        });

        it('should \'strokeWidth\' change svg\'s strokeColor.', () => {
            const color = '#ccc';
            component.strokeColor = color;
            fixture.detectChanges();
            const appliedColor = (component.vector.nativeElement.childNodes[0] as Element).getAttribute('stroke');
            expect(appliedColor).toBe(color);
        });

        const customEventList = [{
            eventName: 'click',
            emitterName: 'componentClick',
        }, {
            eventName: 'mouseenter',
            emitterName: 'componentMouseEnter',
        }, {
            eventName: 'mouseover',
            emitterName: 'componentMouseOver',
        }, {
            eventName: 'mousemove',
            emitterName: 'componentMouseMove',
        }, {
            eventName: 'mouseleave',
            emitterName: 'componentMouseLeave',
        }, {
            eventName: 'mouseup',
            emitterName: 'componentMouseUp',
        }, {
            eventName: 'mousedown',
            emitterName: 'componentMouseDown',
        }];

        for (const eventDef of customEventList) {
            it(`should ${eventDef.eventName} event emit fiz custom ${eventDef.emitterName} event with its own component.`,
                fakeAsync(() => {
                    spyOn(component[eventDef.emitterName], 'emit');
                    const elem = fixture.debugElement.query(By.css('svg'));
                    const event = new MouseEvent(eventDef.eventName, {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                    elem.nativeElement.dispatchEvent(event);
                    // elem.triggerEventHandler('click', null);
                    tick();
                    fixture.detectChanges();
                    expect(component[eventDef.emitterName].emit).toHaveBeenCalledWith({ component, event });
                }));

        }
    });
    if (additionalTest) {
        describe('Additional Icon Test', () => {
            let component: IconType;
            let fixture: ComponentFixture<IconType>;

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
