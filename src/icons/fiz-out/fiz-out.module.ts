import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FizOutComponent } from './fiz-out.component';

@NgModule({
    declarations: [
        FizOutComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FizOutComponent,
    ],
})
export class FizOutModule {}
