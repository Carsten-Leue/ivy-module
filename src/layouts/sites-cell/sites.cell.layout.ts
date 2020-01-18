import { LoggerService } from '@acoustic-content-sdk/api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  NOOP_LOGGER_SERVICE,
  opFilterNotNil,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  Optional
} from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypeSitesCellComponent } from './../../components/sites-cell/type.sites.cell.component';
import {
  KEY_MARGIN,
  KEY_PADDING,
  rxSelectContent
} from './../../elements/sites-cell/sites.cell.type';
import { SitesContentType } from './../../elements/sites-content/sites.content.type';
import { getStyles, Styles } from './../../utils/style.utils';

const LOGGER = 'SitesCellLayoutComponent';

/*
 * @name sitesCellLayout
 * @id sites-cell-layout
 */
@LayoutComponent({
  selector: 'sites-cell-layout'
})
@Component({
  selector: 'app-sites-cell-layout-component',
  templateUrl: './sites.cell.layout.html',
  styleUrls: ['./sites.cell.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesCellLayoutComponent extends TypeSitesCellComponent
  implements OnDestroy {
  readonly content$: Observable<SitesContentType[]>;
  readonly styles$: Observable<Styles>;

  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    this.content$ = rxPipe(this.renderingContext$, rxSelectContent([]));

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_PADDING]: rc[KEY_PADDING],
        [KEY_MARGIN]: rc[KEY_MARGIN]
      })),
      map(getStyles),
      log('Styles')
    );
  }

  // needed for AOT
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
