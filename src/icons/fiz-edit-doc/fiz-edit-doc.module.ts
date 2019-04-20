import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizEditDocComponent } from './fiz-edit-doc.component';

@NgModule({
    declarations: [
        FizEditDocComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizEditDocComponent,
    ],
})
export class FizEditDocModule {}
