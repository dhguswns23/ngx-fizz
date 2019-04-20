import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizCogComponent } from './fiz-cog.component';

@NgModule({
    declarations: [
        FizCogComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizCogComponent,
    ],
})
export class FizCogModule {}
