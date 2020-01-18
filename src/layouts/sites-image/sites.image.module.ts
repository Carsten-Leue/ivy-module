import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesImageLayoutComponent } from './sites.image.layout';


@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesImageLayoutComponent],
    exports: [SitesImageLayoutComponent],
    entryComponents: [SitesImageLayoutComponent]
})
export class SitesImageModule {
  private readonly ref = SitesImageLayoutComponent;
}
