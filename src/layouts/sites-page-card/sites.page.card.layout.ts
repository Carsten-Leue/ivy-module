import { LayoutComponent } from '@acoustic-content-sdk/ng';
import {
  opFilterNotNil,
  rxPipe,
  opPluckResourceOrigin,
  opDistinctUntilChanged,
  NOOP_LOGGER_SERVICE,
  rxNext
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional
} from '@angular/core';
import { Observable, combineLatest, MonoTypeOperatorFunction } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import {
  SitesImageType,
  KEY_IMAGE
} from './../../elements/sites-image/sites.image.type';
import {
  KEY_BACKGROUND,
  KEY_LAYOUT,
  KEY_MARGIN,
  rxSelectHeading,
  rxSelectImage,
  rxSelectLink,
  rxSelectSummary,
  KEY_HEADING,
  KEY_SUMMARY
} from './../../elements/sites-page-card/sites.page.card.type';
import { getStyles, Styles } from './../../utils/style.utils';
import { TypeSitesPageCardComponent } from './../../components/sites-page-card/type.sites.page.card.component';
import {
  Link,
  KEY_VALUE,
  LoggerService,
  KEY_METADATA,
  KEY_ACCESSOR
} from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const LOGGER = 'SitesPageCardLayoutComponent';

/*
 * @name sitesPageCardLayout
 * @id sites-page-card-layout
 */
@LayoutComponent({
  selector: 'sites-page-card-layout'
})
@Component({
  selector: 'app-sites-page-card-layout-component',
  templateUrl: './sites.page.card.layout.html',
  styleUrls: ['./sites.page.card.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesPageCardLayoutComponent extends TypeSitesPageCardComponent {
  readonly styles$: Observable<Styles>;
  readonly heading$: Observable<string>;
  readonly summary$: Observable<string>;
  readonly link$: Observable<Link>;
  readonly imageUrl$: Observable<string>;

  readonly headingAccessor$: Observable<string>;
  readonly summaryAccessor$: Observable<string>;
  readonly imageAccessor$: Observable<string>;

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

    this.heading$ = rxPipe(this.renderingContext$, rxSelectHeading());
    this.headingAccessor$ = rxPipe(
      this.accessor$,
      map((accessor) => `${accessor}.${KEY_HEADING}.${KEY_VALUE}`),
      log('headingAccessor')
    );

    this.summary$ = rxPipe(this.renderingContext$, rxSelectSummary());
    this.summaryAccessor$ = rxPipe(
      this.accessor$,
      map((accessor) => `${accessor}.${KEY_SUMMARY}.${KEY_VALUE}`),
      log('summaryAccessor')
    );

    this.link$ = rxPipe(this.renderingContext$, opFilterNotNil, rxSelectLink());

    const resourceOrigin$ = rxPipe(
      this.renderingContext$,
      opPluckResourceOrigin,
      opFilterNotNil,
      opDistinctUntilChanged
    );

    const image$ = rxPipe(
      this.renderingContext$,
      log('renderingContext'),
      rxSelectImage()
    );

    const suffix$ = rxPipe(
      image$,
      pluck(KEY_IMAGE, 'url'),
      opFilterNotNil,
      opDistinctUntilChanged
    );

    this.imageUrl$ = rxPipe(
      combineLatest([resourceOrigin$, suffix$]),
      map(([resourceOrigin, suffix]) => `${resourceOrigin}${suffix}`)
    );

    this.imageAccessor$ = rxPipe(
      image$,
      pluck(KEY_METADATA, KEY_ACCESSOR),
      map((accessor) => `${accessor}.${KEY_IMAGE}`),
      log('imageAccessor')
    );

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_BACKGROUND]: rc[KEY_BACKGROUND],
        [KEY_MARGIN]: rc[KEY_MARGIN]
      })),
      map(getStyles)
    );
  }
}
