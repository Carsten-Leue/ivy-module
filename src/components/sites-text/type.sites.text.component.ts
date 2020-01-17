import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { selectAccessor, selectId } from '../../utils/common';
import { AbstractSitesTextComponent } from './abstract.sites.text.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name Sites Text
 * @id 373c81a5-d86b-4740-8f11-62fcbccfca08
 */
export abstract class TypeSitesTextComponent extends AbstractSitesTextComponent {
  // base accessor string
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
