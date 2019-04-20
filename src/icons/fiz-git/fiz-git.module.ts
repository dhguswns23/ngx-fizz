import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared.module';
import { FizGitComponent } from './fiz-git.component';

@NgModule({
    declarations: [
        FizGitComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FizGitComponent,
    ]
})
export class FizGitModule {}
