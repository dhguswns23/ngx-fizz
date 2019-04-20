import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizUserComponent } from './fiz-user.component';

@NgModule({
    declarations: [
        FizUserComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizUserComponent,
    ],
})
export class FizUserModule {}
