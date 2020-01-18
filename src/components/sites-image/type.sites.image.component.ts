import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { selectAccessor, selectId } from '../../utils/common';
import { AbstractSitesImageComponent } from './abstract.sites.image.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name Sites Image
 * @id c8295d37-7235-495e-8d40-f3b8bafe4099
 */
export abstract class TypeSitesImageComponent extends AbstractSitesImageComponent {
  readonly accessor$: Observable<string>;
  readonly id$: Observable<string>;

  /*
   * TODO add custom fields here. These fields should be those
   * common to all layouts.
   */

  protected constructor() {
    super();
    // access the accessor
    this.accessor$ = rxPipe(this.renderingContext$, selectAccessor());
    this.id$ = rxPipe(this.renderingContext$, selectId());
  }
}
