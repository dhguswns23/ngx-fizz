import { NgModule } from '@angular/core';
import { FizCheckModule } from './icons/fiz-check/fiz-check.module';
import { FizChevronBottomModule } from './icons/fiz-chevron-bottom/fiz-chevron-bottom.module';
import { FizChevronLeftModule } from './icons/fiz-chevron-left/fiz-chevron-left.module';
import { FizChevronRightModule } from './icons/fiz-chevron-right/fiz-chevron-right.module';
import { FizChevronTopModule } from './icons/fiz-chevron-top/fiz-chevron-top.module';
import { FizCodeModule } from './icons/fiz-code/fiz-code.module';
import { FizCogModule } from './icons/fiz-cog/fiz-cog.module';
import { FizCrossModule } from './icons/fiz-cross/fiz-cross.module';
import { FizEditDocModule } from './icons/fiz-edit-doc/fiz-edit-doc.module';
import { FizHeartModule } from './icons/fiz-heart/fiz-heart.module';
import { FizImageModule } from './icons/fiz-image/fiz-image.module';
import { FizLockerModule } from './icons/fiz-locker/fiz-locker.module';
import { FizNewDocModule } from './icons/fiz-new-doc/fiz-new-doc.module';
import { FizOutModule } from './icons/fiz-out/fiz-out.module';
import { FizSearchModule } from './icons/fiz-search/fiz-search.module';
import { FizStarModule } from './icons/fiz-star/fiz-star.module';
import { FizTrashBinModule } from './icons/fiz-trash-bin/fiz-trash-bin.module';
import { FizUserModule } from './icons/fiz-user/fiz-user.module';
// import { FizzLogoModule } from './icons';

@NgModule({
    imports: [],
    exports: [
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
        // FizzLogoModule,
        FizStarModule,
        FizImageModule,
        FizOutModule,
        FizUserModule,
        FizSearchModule,
        FizNewDocModule,
        FizTrashBinModule,
        FizLockerModule,
    ],
    declarations: [],
})
export class FizIconSetModule {}
