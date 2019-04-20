import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizChevronTopComponent } from './fiz-chevron-top.component';

@NgModule({
    declarations: [
        FizChevronTopComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizChevronTopComponent,
    ],
})
export class FizChevronTopModule {}
