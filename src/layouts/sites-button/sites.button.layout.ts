import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { opFilterNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import {
  KEY_ALIGNMENT,
  KEY_BACKGROUND_COLOR,
  KEY_CORNER_RADIUS,
  KEY_LINE_HEIGHT,
  KEY_PADDING,
  KEY_STYLE,
  rxSelectLabel,
  rxSelectLink
} from './../../elements/sites-button/sites.button.type';
import { getStyles, Styles } from './../../utils/style.utils';
import { TypeSitesButtonComponent } from './../../components/sites-button/type.sites.button.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name sitesButtonLayout
 * @id sites-button-layout
 */
@LayoutComponent({
  selector: 'sites-button-layout'
})
@Component({
  selector: 'app-sites-button-layout-component',
  templateUrl: './sites.button.layout.html',
  styleUrls: ['./sites.button.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesButtonLayoutComponent extends TypeSitesButtonComponent {
  readonly link$: Observable<string>;
  readonly label$: Observable<string>;
  readonly styles$: Observable<Styles>;

  constructor() {
    super();

    this.link$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      rxSelectLink({ linkURL: '' }),
      pluck('linkURL')
    );

    this.label$ = rxPipe(this.renderingContext$, rxSelectLabel());

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_ALIGNMENT]: rc[KEY_ALIGNMENT],
        [KEY_BACKGROUND_COLOR]: rc[KEY_BACKGROUND_COLOR],
        [KEY_CORNER_RADIUS]: rc[KEY_CORNER_RADIUS],
        [KEY_LINE_HEIGHT]: rc[KEY_LINE_HEIGHT],
        [KEY_PADDING]: rc[KEY_PADDING],
        [KEY_STYLE]: rc[KEY_STYLE]
      })),
      map(getStyles)
    );
  }
}
