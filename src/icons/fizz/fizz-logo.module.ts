import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizzComponent } from './fizz.component';

@NgModule({
    declarations: [
        FizzComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizzComponent,
    ],
})
export class FizzLogoModule {}
