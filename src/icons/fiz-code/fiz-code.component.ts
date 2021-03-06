import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-code',
    templateUrl: './fiz-code.component.html',
    styleUrls: ['./fiz-code.component.scss'],
})
export class FizCodeComponent extends ShowHideIcon implements OnInit {
    @ViewChild('leftTri') public leftTri: ElementRef;
    @ViewChild('rightTri') public rightTri: ElementRef;
    @ViewChild('centerBar') public centerBar: ElementRef;

    @Input() public barColor: string;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, leftTri, rightTri, centerBar } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        /* Manually set isHide false since anime.js has bug which on begin is not called when duration is very short. */
        this.isHide = false;
        nextTimeline.add({
            targets: [leftTri.nativeElement, rightTri.nativeElement],
            strokeDashoffset: [_anime.setDashoffset, 0],
        }).add({
            targets: centerBar.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, leftTri, rightTri, centerBar } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        nextTimeline.add({
            targets: centerBar.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        }).add({
            targets: [leftTri.nativeElement, rightTri.nativeElement],
            strokeDashoffset: [0, _anime.setDashoffset],
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
