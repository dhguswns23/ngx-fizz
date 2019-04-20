import { ElementRef } from '@angular/core';
import anime from 'animejs';

export const animatePulse = (angularTargets: ElementRef, duration: number, easing: string, count: number = 1) => {

    const targets = angularTargets.nativeElement;
    anime({
        targets, duration, easing,
        keyframes: [{
            scale: 1.1,
            transformOrigin: '50% 0px 0px',
        }, {
            scale: 1,
        }],
        loop: count,
    });
};
