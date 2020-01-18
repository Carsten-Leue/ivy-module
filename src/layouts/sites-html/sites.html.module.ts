import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesHtmlLayoutComponent } from './sites.html.layout';


@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [SitesHtmlLayoutComponent],
    exports: [SitesHtmlLayoutComponent],
    entryComponents: [SitesHtmlLayoutComponent]
})
export class SitesHtmlModule {
  private readonly ref = SitesHtmlLayoutComponent;
}
