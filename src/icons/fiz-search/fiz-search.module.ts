import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizSearchComponent } from './fiz-search.component';

@NgModule({
    declarations: [
        FizSearchComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizSearchComponent,
    ],
})
export class FizSearchModule {}
