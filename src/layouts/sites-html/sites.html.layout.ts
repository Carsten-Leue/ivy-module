import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TypeSitesHtmlComponent } from './../../components/sites-html/type.sites.html.component';
import { Observable } from 'rxjs';
import { Styles, getStyles } from './../../utils/style.utils';
import { rxPipe, opFilterNotNil } from '@acoustic-content-sdk/utils';
import { map } from 'rxjs/operators';
import {
  KEY_MARGIN,
  KEY_PADDING,
  KEY_CODE
} from './../../elements/sites-html/sites.html.type';
import { KEY_VALUE } from '@acoustic-content-sdk/api';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name sitesHtmlLayout
 * @id sites-html-layout
 */
@LayoutComponent({
  selector: 'sites-html-layout'
})
@Component({
  selector: 'app-sites-html-layout-component',
  templateUrl: './sites.html.layout.html',
  styleUrls: ['./sites.html.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesHtmlLayoutComponent extends TypeSitesHtmlComponent {
  readonly styles$: Observable<Styles>;
  readonly htmlAccessor$: Observable<string>;

  constructor() {
    super();

    this.htmlAccessor$ = rxPipe(
      this.accessor$,
      map((accessor) => `${accessor}.${KEY_CODE}.${KEY_VALUE}`)
    );

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_MARGIN]: rc[KEY_MARGIN],
        [KEY_PADDING]: rc[KEY_PADDING]
      })),
      map(getStyles)
    );
  }
}
