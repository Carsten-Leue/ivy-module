import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesSectionLayoutComponent } from './sites.section.layout';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesSectionLayoutComponent],
    exports: [SitesSectionLayoutComponent],
    entryComponents: [SitesSectionLayoutComponent]
})
export class SitesSectionModule {
  private readonly ref = SitesSectionLayoutComponent;
}
