import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizCodeComponent } from './fiz-code.component';

@NgModule({
    declarations: [
        FizCodeComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizCodeComponent,
    ],
})
export class FizCodeModule {}
