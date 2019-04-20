import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizLockerComponent } from './fiz-locker.component';

@NgModule({
    declarations: [
        FizLockerComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizLockerComponent,
    ],
})
export class FizLockerModule {

}
