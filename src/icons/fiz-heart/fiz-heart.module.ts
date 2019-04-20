import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizHeartComponent } from './fiz-heart.component';

@NgModule({
    declarations: [
        FizHeartComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizHeartComponent,
    ],
})
export class FizHeartModule {}
