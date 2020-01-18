import { LoggerService } from '@acoustic-content-sdk/api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { hashRandomIdentifier, NOOP_LOGGER_SERVICE, opFilterNotNil, rxNext, rxPipe } from '@acoustic-content-sdk/utils';
import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypeSitesRowsComponent } from './../../components/sites-rows/type.sites.rows.component';
import { KEY_BACKGROUND_COLOR, KEY_MARGIN, KEY_PADDING, KEY_WIDTH } from './../../elements/sites-rows/sites.rows.type';
import { getStyles, Styles } from './../../utils/style.utils';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const LOGGER = 'SitesRowsLayoutComponent';
/*
 * @name sitesRowsLayout
 * @id sites-rows-layout
 */
@LayoutComponent({
  selector: 'sites-rows-layout'
})
@Component({
  selector: 'app-sites-rows-layout-component',
  templateUrl: './sites.rows.layout.html',
  styleUrls: ['./sites.rows.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesRowsLayoutComponent extends TypeSitesRowsComponent {
  readonly styles$: Observable<Styles>;

  state = 0;

  constructor(
    @Optional() @Inject(WCH_TOKEN_LOGGER_SERVICE) aLogSvc: LoggerService
  ) {
    super();

    const id = hashRandomIdentifier();

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
      logger,
      id
    );

    this.styles$ = rxPipe(
      this.renderingContext$,
      log('rendering context'),
      opFilterNotNil,
      map((rc) => ({
        [KEY_WIDTH]: rc[KEY_WIDTH],
        [KEY_PADDING]: rc[KEY_PADDING],
        [KEY_MARGIN]: rc[KEY_MARGIN],
        [KEY_BACKGROUND_COLOR]: rc[KEY_BACKGROUND_COLOR]
      })),
      map(getStyles)
    );
  }

  changeState() {
    this.state++;
    console.log(this.state);
  }
}
