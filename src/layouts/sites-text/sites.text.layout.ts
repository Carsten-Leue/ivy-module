import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LoggerService, KEY_VALUE } from '@acoustic-content-sdk/api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  NOOP_LOGGER_SERVICE,
  opFilterNotNil,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import {
  KEY_ALIGNMENT,
  KEY_BACKGROUND,
  KEY_LINE_HEIGHT,
  KEY_LINK_COLOR,
  KEY_MARGIN,
  KEY_PADDING,
  KEY_TEXT,
  KEY_TEXT_STYLE
} from './../../elements/sites-text/sites.text.type';
import { Styles, getStyles } from './../../utils/style.utils';
import { TypeSitesTextComponent } from './../../components/sites-text/type.sites.text.component';

const LOGGER = 'SitesTextLayoutComponent';

/*
 * @name sitesTextLayout
 * @id sites-text-layout
 */
@LayoutComponent({
  selector: 'sites-text-layout'
})
@Component({
  selector: 'app-sites-text-layout-component',
  templateUrl: './sites.text.layout.html',
  styleUrls: ['./sites.text.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesTextLayoutComponent extends TypeSitesTextComponent {
  readonly text$: Observable<string>;
  readonly textAccessor$: Observable<string>;
  readonly styles$: Observable<Styles>;

  constructor(
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    this.text$ = rxPipe(this.renderingContext$, pluck(KEY_TEXT));
    this.textAccessor$ = rxPipe(
      this.accessor$,
      map((accessor) => `${accessor}.${KEY_TEXT}.${KEY_VALUE}`)
    );

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_BACKGROUND]: rc[KEY_BACKGROUND],
        [KEY_ALIGNMENT]: rc[KEY_ALIGNMENT],
        [KEY_LINE_HEIGHT]: rc[KEY_LINE_HEIGHT],
        [KEY_LINK_COLOR]: rc[KEY_LINK_COLOR],
        [KEY_MARGIN]: rc[KEY_MARGIN],
        [KEY_PADDING]: rc[KEY_PADDING],
        [KEY_TEXT_STYLE]: rc[KEY_TEXT_STYLE]
      })),
      map(getStyles)
    );
  }
}
