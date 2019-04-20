import { NgModule } from '@angular/core';
import { FizIconSetModule } from '../fiz-icon-set.module';
import { FizCheckModule } from '../icons';
import { FizChevronBottomModule } from '../icons';
import { FizChevronLeftModule } from '../icons';
import { FizChevronRightModule } from '../icons';
import { FizChevronTopModule } from '../icons';
import { FizCodeModule } from '../icons';
import { FizCogModule } from '../icons';
import { FizCrossModule } from '../icons';
import { FizEditDocModule } from '../icons';
import { FizHeartModule } from '../icons';
import { FizImageModule } from '../icons';
import { FizLockerModule } from '../icons';
import { FizNewDocModule } from '../icons';
import { FizOutModule } from '../icons';
import { FizSearchModule } from '../icons';
import { FizStarModule } from '../icons';
import { FizTrashBinModule } from '../icons';
import { FizUserModule } from '../icons';
import { FizzLogoModule } from '../icons';
import { FizzComponent } from './fizz.component';

@NgModule({
  declarations: [FizzComponent],
  imports: [
      FizIconSetModule,
      FizCheckModule,
      FizCrossModule,
      FizChevronTopModule,
      FizChevronBottomModule,
      FizChevronLeftModule,
      FizChevronRightModule,
      FizCodeModule,
      FizCogModule,
      FizEditDocModule,
      FizHeartModule,
      FizzLogoModule,
      FizStarModule,
      FizImageModule,
      FizOutModule,
      FizUserModule,
      FizSearchModule,
      FizNewDocModule,
      FizTrashBinModule,
      FizLockerModule,
  ],
  exports: [FizzComponent]
})
export class FizzModule { }
