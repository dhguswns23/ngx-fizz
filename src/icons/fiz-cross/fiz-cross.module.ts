import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizCrossComponent } from './fiz-cross.component';

@NgModule({
    declarations: [
        FizCrossComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizCrossComponent,
    ],
})
export class FizCrossModule {}
