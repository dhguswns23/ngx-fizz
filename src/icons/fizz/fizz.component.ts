import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import anime from 'animejs';

@Component({
    selector: 'fiz-z',
    templateUrl: './fizz.component.html',
    styleUrls: ['./fizz.component.scss'],
})
export class FizzComponent implements OnInit, OnChanges {
    @ViewChild('g') public g: ElementRef;
    @ViewChild('p1') public p1: ElementRef;
    @ViewChild('p2') public p2: ElementRef;
    @ViewChild('p3') public p3: ElementRef;
    @ViewChild('p4') public p4: ElementRef;
    @ViewChild('p5') public p5: ElementRef;
    @ViewChild('p6') public p6: ElementRef;

    @Input() public size = 366;

    @Input() public bouncing = false;
    public duration = 1800;
    public easing = 'easeOutElastic';
    public vectorMatrix = {
        p1: [
            'm133,56c0,-5.524862 4.475138,-10 10,-10c5.524862,0 10,4.475138 10,10c0,5.524862 -4.475138,10 -10,10c-5.524862,0' +
            ' -10,-4.475138 -10,-10z',
            'm123.762978,43l-65.762978,0l0,63l0,43',
        ],
        p2: [
            'm133,96c0,-5.524862 4.475138,-10 10,-10c5.524862,0 10,4.475138 10,10c0,5.524862 -4.475138,10 -10,10c-5.524862,0' +
            ' -10,-4.475138 -10,-10z',
            'm102,94.05897c-4.39588,0.00858 -10.22921,0.00858 -17.5,0c-7.27079,-0.00857 -12.10334,-0.02823 -14.49766,-0.05897l-21.00234,' +
            '0.05897l53,0',
        ],
        p3: [
            'm173,96c0,-5.524862 4.475138,-10 10,-10c5.524862,0 10,4.475138 10,10c0,5.524862 -4.475138,10 -10,10c-5.524862,0' +
            '-10,-4.475138 -10,-10z',
            'm133.685593,99l4.314407,-4l-4.5,-4l-4.5,4z',
        ],
        p4: [
            'm173,56c0,-5.524862 4.475138,-10 10,-10c5.524862,0 10,4.475138 10,10c0,5.524862 -4.475138,10 -10,10c-5.524862,0 ' +
            '-10,-4.475138 -10,-10',
            'm133,114l0,13.802818l0,11.830986l0,9.366196',
        ],
        p5: [
            'm213,56c0,-5.524862 4.475138,-10 10,-10c5.524862,0 10,4.475138 10,10c0,5.524862 -4.475138,10 -10,10c-5.524862,0 ' +
            '-10,-4.475138 -10,-10z',
            'm170,94c31,0 48,0 51,0c4.5,0 -45.5,45 -41.5,45c2.66667,0 19.5,0 50.5,0',
        ],
        p6: [
            'm133,136c0,-5.524862 4.475138,-10 10,-10c5.524862,0 10,4.475138 10,10c0,5.524862 -4.475138,10 -10,10c-5.524862,0 ' +
            '-10,-4.475138 -10,-10z',
            'm255,94c31,0 48,0 51,0c4.5,0 -45.5,45 -41.5,45c2.66667,0 19.5,0 50.5,0',
        ],
    };
    public foldProperties = {
        p1: {
            strokeColor: '#fff',
            strokeWidth: 6,
        },
        p2: {
            strokeColor: '#fff',
            strokeWidth: 6,
        },
        p3: {
            strokeColor: '#fff',
            strokeWidth: 6,
        },
        p4: {
            strokeColor: '#fff',
            strokeWidth: 6,
        },
        p5: {
            strokeColor: '#fff',
            strokeWidth: 6,
        },
        p6: {
            strokeColor: '#fff',
            strokeWidth: 6,
        },
    };
    public unfoldProperties = {
        p1: {
            strokeColor: '#8137DE',
            strokeWidth: 20,
        },
        p2: {
            strokeColor: '#FF7AC3',
            strokeWidth: 20,
        },
        p3: {
            strokeColor: '#7349F8',
            strokeWidth: 10,
        },
        p4: {
            strokeColor: '#4004FF',
            strokeWidth: 20,
        },
        p5: {
            strokeColor: '#B384FF',
            strokeWidth: 20,
        },
        p6: {
            strokeColor: '#6200FF',
            strokeWidth: 20,
        },
    };
    @Input() public state = 'fold';
    private bouncingAnimation;

    constructor() { }

    public ngOnInit() {
        // this.bouncing = this.bounce();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('state')) {
            if (changes.state.currentValue === 'fold') {
                this.fold();
            } else {
                this.unfold();
            }
        }

        if (changes.hasOwnProperty('bounce')) {
            if (changes.state.currentValue === true) {
                this.bouncingAnimation.start();
            } else {
                this.bouncingAnimation.stop();
            }
        }
    }

    public height() {
        return this.size * 191 / 366;
    }

    public bounce() {
        return anime({
            duration: 1400,
            easing: 'easeOutCubic',
            targets: 'g path',
            keyframes: [{
                strokeWidth: 6,
                opacity: 1,
                // scale: 1,
            }, {
                // scale: 1.1,
                strokeWidth: 10,
                opacity: 0.5,
            }, {
                strokeWidth: 6,
                opacity: 1,
                // scale: 1,
            }],
            loop: true,
            delay: anime.stagger(100, { grid: [3, 3], from: 0 }),
        });
    }

    public fold() {
        const { vectorMatrix, foldProperties, g, p1, p2, p3, p4, p5, p6, duration, easing } = this;
        anime({
            targets: g.nativeElement,
            strokeWidth: 6,
            duration, easing,
        });
        for (const key of Object.keys(vectorMatrix)) {
            const matric = this.reverseMatrix(key);
            const property = foldProperties[key];
            anime({
                targets: this[key].nativeElement,
                d: matric,
                stroke: property.strokeColor,
                strokeWidth: property.strokeWidth,
                duration, easing,
            });
        }
    }

    public unfold() {
        const { vectorMatrix, unfoldProperties, g, p1, p2, p3, p4, p5, p6, duration, easing } = this;
        anime({
            targets: g.nativeElement,
            strokeWidth: 12,
            duration, easing,
        });
        for (const key of Object.keys(vectorMatrix)) {
            const matric = vectorMatrix[key];
            const property = unfoldProperties[key];
            anime({
                targets: this[key].nativeElement,
                d: matric,
                stroke: property.strokeColor,
                strokeWidth: property.strokeWidth,
                duration, easing,
            });
        }
    }

    private reverseMatrix(key: string) {
        const { vectorMatrix } = this;
        return Object.assign([], vectorMatrix[key]).reverse();
    }

}
