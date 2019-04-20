import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizChevronRightComponent } from './fiz-chevron-right.component';

@NgModule({
    declarations: [
        FizChevronRightComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizChevronRightComponent,
    ],
})
export class FizChevronRightModule {}
