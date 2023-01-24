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

import { FizCheckComponent } from './icons/fiz-check/fiz-check.component';
import { FizChevronBottomComponent } from './icons/fiz-chevron-bottom/fiz-chevron-bottom.component';
import { FizChevronLeftComponent } from './icons/fiz-chevron-left/fiz-chevron-left.component';
import { FizChevronRightComponent } from './icons/fiz-chevron-right/fiz-chevron-right.component';
import { FizChevronTopComponent } from './icons/fiz-chevron-top/fiz-chevron-top.component';
import { FizCodeComponent } from './icons/fiz-code/fiz-code.component';
import { FizCogComponent } from './icons/fiz-cog/fiz-cog.component';
import { FizCrossComponent } from './icons/fiz-cross/fiz-cross.component';
import { FizEditDocComponent } from './icons/fiz-edit-doc/fiz-edit-doc.component';
import { FizHeartComponent } from './icons/fiz-heart/fiz-heart.component';
import { FizImageComponent } from './icons/fiz-image/fiz-image.component';
import { FizLockerComponent } from './icons/fiz-locker/fiz-locker.component';
import { FizNewDocComponent } from './icons/fiz-new-doc/fiz-new-doc.component';
import { FizOutComponent } from './icons/fiz-out/fiz-out.component';
import { FizSearchComponent } from './icons/fiz-search/fiz-search.component';
import { FizStarComponent } from './icons/fiz-star/fiz-star.component';
import { FizTrashBinComponent } from './icons/fiz-trash-bin/fiz-trash-bin.component';
import { FizUserComponent } from './icons/fiz-user/fiz-user.component';

const iconComponents = [
    FizCheckComponent,
    FizCodeComponent,
    FizChevronBottomComponent,
    FizChevronLeftComponent,
    FizChevronRightComponent,
    FizChevronTopComponent,
    FizCogComponent,
    FizCrossComponent,
    FizEditDocComponent,
    FizHeartComponent,
    FizImageComponent,
    FizLockerComponent,
    FizNewDocComponent,
    FizOutComponent,
    FizSearchComponent,
    FizStarComponent,
    FizTrashBinComponent,
    FizUserComponent,
];
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
    entryComponents: [
      ...iconComponents,
    ],
})
export class FizIconSetModule {}
