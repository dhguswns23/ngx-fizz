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
    selector: 'fiz-out',
    templateUrl: './fiz-out.component.html',
    styleUrls: ['./fiz-out.component.scss'],
})
export class FizOutComponent extends ShowHideIcon implements OnInit {
    @ViewChild('door') public door: ElementRef;
    @ViewChild('arrow') public arrow: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, door, arrow } = this;

        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
        arrow.nativeElement.style.opacity = 0;
        arrow.nativeElement.style.transform = 'translateX(-10px)';

        nextTimeline.add({
            targets: door.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        }).add({
            targets: arrow.nativeElement,
            opacity: 1,
            translateX: '0',
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, door, arrow } = this;

        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        arrow.nativeElement.style.opacity = 1;
        arrow.nativeElement.style.transform = 'translateX(0px)';

        nextTimeline.add({
            targets: arrow.nativeElement,
            opacity: 0,
            translateX: '-10px',
        }).add({
            targets: door.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }

}
