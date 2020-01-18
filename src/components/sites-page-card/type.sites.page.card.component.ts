import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { selectAccessor, selectId } from '../../utils/common';
import { AbstractSitesPageCardComponent } from './abstract.sites.page.card.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name Sites Page Card
 * @id 8eb34ed3-fbdf-439e-aaeb-00060cdeb63a
 */
export abstract class TypeSitesPageCardComponent extends AbstractSitesPageCardComponent {
  readonly accessor$: Observable<string>;
  readonly id$: Observable<string>;
  /*
   * TODO add custom fields here. These fields should be those
   * common to all layouts.
   */

  protected constructor() {
    super();
    this.accessor$ = rxPipe(this.renderingContext$, selectAccessor());
    this.id$ = rxPipe(this.renderingContext$, selectId());
  }
}
