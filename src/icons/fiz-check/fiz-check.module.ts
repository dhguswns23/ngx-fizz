import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizCheckComponent } from './fiz-check.component';

@NgModule({
    declarations: [
        FizCheckComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizCheckComponent,
    ],
})
export class FizCheckModule {}
