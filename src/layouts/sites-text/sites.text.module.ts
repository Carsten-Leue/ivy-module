import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SitesTextLayoutComponent } from './sites.text.layout';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesTextLayoutComponent],
    exports: [SitesTextLayoutComponent],
    entryComponents: [SitesTextLayoutComponent]
})
export class SitesTextModule {
  private readonly ref = SitesTextLayoutComponent;
}
