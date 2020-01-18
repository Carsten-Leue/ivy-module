import {
    LayoutComponent
} from '@acoustic-content-sdk/ng';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TypeSitesPromotionComponent } from './../../components/sites-promotion/type.sites.promotion.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name sitesPromotionLayout
 * @id sites-promotion-layout
 */
@LayoutComponent({
    selector: 'sites-promotion-layout'
})
@Component({
  selector: 'app-sites-promotion-layout-component',
  templateUrl: './sites.promotion.layout.html',
  styleUrls: ['./sites.promotion.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesPromotionLayoutComponent extends TypeSitesPromotionComponent {

    /*
     * TODO add custom fields here. These fields should be those
     * specific to this layout.
     */

    constructor() {
        super();
    }

}
