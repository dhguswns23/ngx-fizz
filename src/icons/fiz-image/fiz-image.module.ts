import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizImageComponent } from './fiz-image.component';

@NgModule({
    declarations: [
        FizImageComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizImageComponent,
    ],
})
export class FizImageModule {}
