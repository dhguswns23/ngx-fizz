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
    selector: 'fiz-user',
    templateUrl: './fiz-user.component.html',
    styleUrls: ['./fiz-user.component.scss'],
})
export class FizUserComponent extends ShowHideIcon implements OnInit {
    @ViewChild('head') public head: ElementRef;
    @ViewChild('body') public body: ElementRef;

    // bodyPath = [
    //     'M7.5,32.5h24c-2.7,0-5.3,0-8,0s-5.3,0-8,0S10.2,32.5,7.5,32.5z',
    //     'M9.5,32.5h20c1.1,0,2-0.9,2-2v0c0-5.5-4.5-10-10-10h-4c-5.5,0-10,4.5-10,10v0C7.5,31.6,8.4,32.5,9.5,32.5z',
    // ];

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    protected _show(duration) {
        const { body, head } = this;

        const nextTimeline = this.initNextTimeline(ShowHideState.SHOW, this.duration);

        body.nativeElement.style.opacity = 0;
        body.nativeElement.style.transform = 'translateY(20px)';
        head.nativeElement.style.opacity = 0;
        head.nativeElement.style.transform = 'scale(0)';

        nextTimeline.add({
            targets: body.nativeElement,
            opacity: 1,
            translateY: 0,
        }).add({
            targets: head.nativeElement,
            opacity: 1,
            scale: 1,
            transformOrigin: '19.5px 11.5px 0',
        });
        return this.endAnimation(nextTimeline);
    }

    protected _hide(duration) {
        const { body, head } = this;

        const nextTimeline = this.initNextTimeline(ShowHideState.HIDE, this.duration);

        body.nativeElement.style.opacity = 1;
        body.nativeElement.style.transform = 'translateY(0px)';
        head.nativeElement.style.opacity = 1;
        head.nativeElement.style.transform = 'scale(1)';

        nextTimeline.add({
            targets: head.nativeElement,
            opacity: 0,
            scale: 0,
            transformOrigin: '19.5px 11.5px 0',
        }).add({
            targets: body.nativeElement,
            opacity: 0,
            translateY: 20,
        });
        return this.endAnimation(nextTimeline);
    }

}
