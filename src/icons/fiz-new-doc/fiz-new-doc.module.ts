import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizNewDocComponent } from './fiz-new-doc.component';

@NgModule({
    declarations: [
        FizNewDocComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizNewDocComponent,
    ],
})
export class FizNewDocModule {}
