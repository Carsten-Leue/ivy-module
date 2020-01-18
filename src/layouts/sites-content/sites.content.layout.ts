import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RenderingContextElements } from '@acoustic-content-sdk/api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeSitesContentComponent } from './../../components/sites-content/type.sites.content.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name sitesContentLayout
 * @id sites-content-layout
 */
@LayoutComponent({
  selector: 'sites-content-layout'
})
@Component({
  selector: 'app-sites-content-layout-component',
  templateUrl: './sites.content.layout.html',
  styleUrls: ['./sites.content.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesContentLayoutComponent extends TypeSitesContentComponent {
  readonly content$: Observable<RenderingContextElements>;

  constructor() {
    super();

    this.content$ = rxPipe(
      this.renderingContext$,
      map(rc => rc[rc.selected as any])
    );
  }
}
