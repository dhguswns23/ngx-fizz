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
    selector: 'fiz-new-doc',
    templateUrl: './fiz-new-doc.component.html',
    styleUrls: ['./fiz-new-doc.component.scss'],
})
export class FizNewDocComponent extends ShowHideIcon implements OnInit {
    @ViewChild('shortLine') public shortLine: ElementRef;
    @ViewChild('longLine') public longLine: ElementRef;
    @ViewChild('plus') public plus: ElementRef;
    @ViewChild('paper') public paper: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, shortLine, longLine, plus, paper } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, duration);

        paper.nativeElement.style.opacity = 0;
        shortLine.nativeElement.style.opacity = 0;
        longLine.nativeElement.style.opacity = 0;
        plus.nativeElement.style.opacity = 0;

        nextTimeline.add({
            targets: paper.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: [shortLine.nativeElement, longLine.nativeElement],
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: plus.nativeElement,
            transformOrigin: '28px 14px 0',
            rotate: 360,
            opacity: 1,
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, shortLine, longLine, plus, paper } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, duration);

        paper.nativeElement.style.opacity = 1;
        shortLine.nativeElement.style.opacity = 1;
        longLine.nativeElement.style.opacity = 1;
        plus.nativeElement.style.opacity = 1;

        nextTimeline.add({
            targets: plus.nativeElement,
            transformOrigin: '28px 14px 0',
            rotate: 0,
            opacity: 0,
        }).add({
            targets: [shortLine.nativeElement, longLine.nativeElement],
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        }).add({
            targets: paper.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }

}
