import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SitesRowsLayoutComponent } from './sites.rows.layout';

@NgModule({
  /**
   * TODO explicitly add those modules that are used by the layout
   */
  imports: [CommonModule, WchNgComponentsModule],
  declarations: [SitesRowsLayoutComponent],
  exports: [SitesRowsLayoutComponent],
  entryComponents: [SitesRowsLayoutComponent]
})
export class SitesRowsModule {
  private readonly ref = SitesRowsLayoutComponent;
}
