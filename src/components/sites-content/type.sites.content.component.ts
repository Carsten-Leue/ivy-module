import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { selectAccessor } from '../../utils/common';
import { AbstractSitesContentComponent } from './abstract.sites.content.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name Sites Content
 * @id 21a8b4fd-0236-4187-bfea-7a94283e7b80
 */
export abstract class TypeSitesContentComponent extends AbstractSitesContentComponent {
  readonly accessor$: Observable<string>;

  /*
   * TODO add custom fields here. These fields should be those
   * common to all layouts.
   */

  protected constructor() {
    super();
    this.accessor$ = rxPipe(this.renderingContext$, selectAccessor());
  }
}
