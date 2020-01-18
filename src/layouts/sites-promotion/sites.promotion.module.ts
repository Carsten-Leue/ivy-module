import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesPromotionLayoutComponent } from './sites.promotion.layout';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesPromotionLayoutComponent],
    exports: [SitesPromotionLayoutComponent],
    entryComponents: [SitesPromotionLayoutComponent]
})
export class SitesPromotionModule {
  private readonly ref = SitesPromotionLayoutComponent;
}
