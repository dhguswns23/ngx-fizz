import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizTrashBinComponent } from './fiz-trash-bin.component';

@NgModule({
    declarations: [
        FizTrashBinComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizTrashBinComponent,
    ]
})
export class FizTrashBinModule {}
