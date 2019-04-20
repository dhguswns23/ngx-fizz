import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizChevronLeftComponent } from './fiz-chevron-left.component';

@NgModule({
    declarations: [
        FizChevronLeftComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizChevronLeftComponent,
    ],
})
export class FizChevronLeftModule {}
