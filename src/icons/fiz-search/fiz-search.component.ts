import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-search',
    templateUrl: './fiz-search.component.html',
    styleUrls: ['./fiz-search.component.scss'],
})
export class FizSearchComponent extends ShowHideIcon implements OnInit {
    @ViewChild('glass') public glass: ElementRef;
    @ViewChild('handle') public handle: ElementRef;
    @ViewChild('reflectLine') public reflectLine: ElementRef;
    @ViewChild('reflectCircle') public reflectCircle: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { glass, handle, reflectLine, reflectCircle } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
        handle.nativeElement.style.transform = 'translateX(15px)';
        handle.nativeElement.style.transform = 'translateY(15px)';
        handle.nativeElement.style.opacity = 0;

        glass.nativeElement.style.opacity = 0;
        glass.nativeElement.style.transform = 'scale(0)';

        reflectCircle.nativeElement.style.opacity = 0;
        reflectCircle.nativeElement.style.transform = 'rotate(0deg)';
        reflectLine.nativeElement.style.opacity = 0;
        reflectLine.nativeElement.style.transform = 'rotate(0deg)';

        nextTimeline.add({
            targets: handle.nativeElement,
            translateX: 0,
            translateY: 0,
            opacity: 1,
        }).add({
            targets: glass.nativeElement,
            transformOrigin: '15px 15px 0',
            scale: 1,
            opacity: 1,
        }).add({
            targets: [reflectLine.nativeElement, reflectCircle.nativeElement],
            transformOrigin: '15px 15px 0',
            opacity: 1,
            rotate: 360,
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { glass, handle, reflectCircle, reflectLine } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        handle.nativeElement.style.transform = 'translate(0, 0)';

        handle.nativeElement.style.opacity = 1;
        glass.nativeElement.style.opacity = 1;

        glass.nativeElement.style.transform = 'scale(1)';
        reflectCircle.nativeElement.style.opacity = 1;
        reflectLine.nativeElement.style.opacity = 1;

        nextTimeline.add({
            targets: [reflectCircle.nativeElement, reflectLine.nativeElement],
            opacity: 0,
        }).add({
            targets: glass.nativeElement,
            transformOrigin: '15px 15px 0',
            scale: 0,
            opacity: 0,
        }).add({
            targets: handle.nativeElement,
            translateX: 15,
            translateY: 15,
            opacity: 1,
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
