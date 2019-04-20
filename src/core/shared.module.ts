import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
    ],
    exports: [
        BrowserAnimationsModule,
        CommonModule,
    ],
    declarations: [],
})
export class SharedModule {}
