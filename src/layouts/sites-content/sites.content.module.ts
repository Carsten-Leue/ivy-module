import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SitesContentLayoutComponent } from './sites.content.layout';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesContentLayoutComponent],
    exports: [SitesContentLayoutComponent],
    entryComponents: [SitesContentLayoutComponent]
})
export class SitesContentModule {
  private readonly ref = SitesContentLayoutComponent;
}
