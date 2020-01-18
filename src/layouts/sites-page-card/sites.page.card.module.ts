import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesPageCardLayoutComponent } from './sites.page.card.layout';


@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesPageCardLayoutComponent],
    exports: [SitesPageCardLayoutComponent],
    entryComponents: [SitesPageCardLayoutComponent]
})
export class SitesPageCardModule {
  /**
   * Reference the component to prevent ivy from tree shaking it
   */
  private readonly ref = SitesPageCardLayoutComponent;
}
