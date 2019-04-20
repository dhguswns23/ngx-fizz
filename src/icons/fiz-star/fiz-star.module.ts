import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizStarComponent } from './fiz-star.component';

@NgModule({
    declarations: [
        FizStarComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizStarComponent,
    ],
})
export class FizStarModule {}
