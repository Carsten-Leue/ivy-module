import { LoggerService } from '@acoustic-content-sdk/api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFilterNotNil,
  opShareLast,
  rxNext,
  rxPipe,
  opPluckResourceOrigin
} from '@acoustic-content-sdk/utils';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, combineLatest } from 'rxjs';
import { map, mergeMap, pluck } from 'rxjs/operators';
import {
  KEY_ALIGNMENT,
  KEY_IMAGE,
  KEY_MARGIN,
  KEY_PADDING
} from './../../elements/sites-image/sites.image.type';
import { getStyles, Styles } from './../../utils/style.utils';
import { TypeSitesImageComponent } from './../../components/sites-image/type.sites.image.component';

const LOGGER = 'SitesImageLayoutComponent';

/*
 * @name sitesImageLayout
 * @id sites-image-layout
 */
@LayoutComponent({
  selector: 'sites-image-layout'
})
@Component({
  selector: 'app-sites-image-layout-component',
  templateUrl: './sites.image.layout.html',
  styleUrls: ['./sites.image.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesImageLayoutComponent extends TypeSitesImageComponent {
  readonly imageUrl$: Observable<string>;
  readonly styles$: Observable<Styles>;
  readonly imageAccessor$: Observable<string>;

  constructor(
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    this.imageAccessor$ = rxPipe(
      this.accessor$,
      map((accessor) => `${accessor}.${KEY_IMAGE}`)
    );

    const resourceOrigin$ = rxPipe(
      this.renderingContext$,
      opPluckResourceOrigin,
      log('Resource Origin'),
      opFilterNotNil,
      opDistinctUntilChanged
    );

    const suffix$ = rxPipe(
      this.renderingContext$,
      log('RC'),
      pluck(KEY_IMAGE, 'url'),
      log('URL suffix'),
      opFilterNotNil,
      opDistinctUntilChanged
    );

    this.imageUrl$ = rxPipe(
      combineLatest([resourceOrigin$, suffix$]),
      map(([resourceOrigin, suffix]) => `${resourceOrigin}${suffix}`),
      log('Image URL')
    );

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_ALIGNMENT]: rc[KEY_ALIGNMENT],
        [KEY_MARGIN]: rc[KEY_MARGIN],
        [KEY_PADDING]: rc[KEY_PADDING]
      })),
      map(getStyles)
    );
  }
}
