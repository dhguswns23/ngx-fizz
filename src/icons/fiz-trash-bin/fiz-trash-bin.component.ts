import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    ShowHideIcon,
    ShowHideState,
} from '../../core';

@Component({
    selector: 'fiz-trash-bin',
    templateUrl: './fiz-trash-bin.component.html',
    styleUrls: ['./fiz-trash-bin.component.scss'],
})
export class FizTrashBinComponent extends ShowHideIcon implements OnInit, OnChanges {
    @ViewChild('body') public body: ElementRef;
    @ViewChild('lid') public lid: ElementRef;
    @ViewChild('line1') public line1: ElementRef;
    @ViewChild('line2') public line2: ElementRef;
    @ViewChild('line3') public line3: ElementRef;
    @Input() public isOpen = false;
    public lidStyle: object;

    constructor() {
        super();
    }

    public ngOnInit() {
        this.isOpen ? this.open() : this.close();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.hasOwnProperty('isOpen')) {
            changes.isOpen.currentValue ? this.open() : this.close();
        }
    }

    public open() {
        this.lidStyle = {
            transition: '200ms',
            transform: 'rotate(-30deg)',
            transformOrigin: '12px 12px 0',
        };
    }

    public close() {
        this.lidStyle = {
            transition: '200ms',
            transform: 'rotate(0deg)',
            transformOrigin: '12px 12px 0',
        };
    }

    protected _show(duration) {
        const { _anime, body, lid, line1, line2, line3 } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        body.nativeElement.style.opacity = 0;
        body.nativeElement.style.lid = 0;
        body.nativeElement.style.line1 = 0;
        body.nativeElement.style.line2 = 0;
        body.nativeElement.style.line3 = 0;

        nextTimeline.add({
            targets: body.nativeElement,
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: [line1.nativeElement, line2.nativeElement, line3.nativeElement],
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        }).add({
            targets: [lid.nativeElement],
            strokeDashoffset: [_anime.setDashoffset, 0],
            opacity: 1,
        });
        return this.endAnimation(ShowHideState.SHOW, nextTimeline);
    }

    protected _hide(duration) {
        const { _anime, body, lid, line1, line2, line3 } = this;
        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        body.nativeElement.style.opacity = 1;
        body.nativeElement.style.lid = 1;
        body.nativeElement.style.line1 = 1;
        body.nativeElement.style.line2 = 1;
        body.nativeElement.style.line3 = 1;

        nextTimeline.add({
            targets: [lid.nativeElement],
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        }).add({
            targets: [line1.nativeElement, line2.nativeElement, line3.nativeElement],
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        }).add({
            targets: body.nativeElement,
            strokeDashoffset: [0, _anime.setDashoffset],
            opacity: 0,
        });
        return this.endAnimation(ShowHideState.HIDE, nextTimeline);
    }
}
