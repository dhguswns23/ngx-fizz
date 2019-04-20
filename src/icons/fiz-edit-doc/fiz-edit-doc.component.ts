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
    selector: 'fiz-edit-doc',
    templateUrl: './fiz-edit-doc.component.html',
    styleUrls: ['./fiz-edit-doc.component.scss'],
})
export class FizEditDocComponent extends ShowHideIcon implements OnInit {
    @ViewChild('paper') public paper: ElementRef;
    @ViewChild('line') public line: ElementRef;
    @ViewChild('pen') public pen: ElementRef;

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { _anime, paper, pen, line } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        pen.nativeElement.style.transform = 'translateX(-12px)';

        nextTimeline.add({
            targets: paper.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        }).add({
            targets: pen.nativeElement,
            translateX: 0,
            opacity: 1,
        }, duration / 2).add({
            targets: line.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
        });
        return this.endAnimation(nextTimeline);
    }


    protected _hide(duration) {
        const { _anime, paper, pen, line } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        pen.nativeElement.style.transform = 'translateX(0px)';

        nextTimeline.add({
            targets: line.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        }).add({
            targets: pen.nativeElement,
            translateX: -12,
            opacity: 0,
        }, 0).add({
            targets: paper.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
        }, 0);
        return this.endAnimation(nextTimeline);
    }

}
