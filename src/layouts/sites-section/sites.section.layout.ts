import { LayoutComponent } from '@acoustic-content-sdk/ng';
import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Optional,
  Inject
} from '@angular/core';
import { TypeSitesSectionComponent } from './../../components/sites-section/type.sites.section.component';
import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { SitesCellType } from './../../elements/sites-cell/sites.cell.type';
import { Styles, getStyles } from './../../utils/style.utils';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { LoggerService } from '@acoustic-content-sdk/api';
import {
  NOOP_LOGGER_SERVICE,
  rxNext,
  rxPipe,
  opFilterNotNil
} from '@acoustic-content-sdk/utils';
import {
  rxSelectCells,
  KEY_BACKGROUND,
  KEY_PADDING,
  KEY_MARGIN
} from './../../elements/sites-section/sites.section.type';
import { map } from 'rxjs/operators';

const LOGGER = 'SitesSectionLayoutComponent';
/*
 * @name sitesSectionLayout
 * @id sites-section-layout
 */
@LayoutComponent({
  selector: 'sites-section-layout'
})
@Component({
  selector: 'app-sites-section-layout-component',
  templateUrl: './sites.section.layout.html',
  styleUrls: ['./sites.section.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesSectionLayoutComponent extends TypeSitesSectionComponent
  implements OnDestroy {
  readonly cells$: Observable<SitesCellType[]>;
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

    this.cells$ = rxPipe(this.renderingContext$, rxSelectCells(), log('cells'));

    this.styles$ = rxPipe(
      this.renderingContext$,
      opFilterNotNil,
      map((rc) => ({
        [KEY_BACKGROUND]: rc[KEY_BACKGROUND],
        [KEY_PADDING]: rc[KEY_PADDING],
        [KEY_MARGIN]: rc[KEY_MARGIN]
      })),
      map(getStyles)
    );
  }

  colClass(cells: SitesCellType[]): string {
    if (cells && cells.length > 0 && 12 % cells.length === 0) {
      const span = 12 / cells.length;
      return `col-md-${span}`;
    } else {
      return 'col-md';
    }
  }

  // needed for AOT
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
