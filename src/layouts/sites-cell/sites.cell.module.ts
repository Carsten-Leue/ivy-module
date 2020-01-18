import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SitesCellLayoutComponent } from './sites.cell.layout';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesCellLayoutComponent],
    exports: [SitesCellLayoutComponent],
    entryComponents: [SitesCellLayoutComponent]
})
export class SitesCellModule {
  private readonly ref = SitesCellLayoutComponent;
}
