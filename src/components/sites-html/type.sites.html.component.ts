import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { selectAccessor } from '../../utils/common';
import { AbstractSitesHtmlComponent } from './abstract.sites.html.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name Sites HTML
 * @id 85bdc88c-5b4c-4002-a665-37ba5bf95cb6
 */
export abstract class TypeSitesHtmlComponent extends AbstractSitesHtmlComponent {
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
