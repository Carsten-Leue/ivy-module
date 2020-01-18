import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesButtonLayoutComponent } from './sites.button.layout';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesButtonLayoutComponent],
    exports: [SitesButtonLayoutComponent],
    entryComponents: [SitesButtonLayoutComponent]
})
export class SitesButtonModule {
  private readonly ref = SitesButtonLayoutComponent;
}
