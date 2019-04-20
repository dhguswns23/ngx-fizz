import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizChevronBottomComponent } from './fiz-chevron-bottom.component';

@NgModule({
    declarations: [
        FizChevronBottomComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizChevronBottomComponent,
    ]
})
export class FizChevronBottomModule {}
