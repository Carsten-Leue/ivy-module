import { LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'sample-component',
  templateUrl: './sample.html',
  styleUrls: ['./sample.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SampleComponent {
  constructor(
    @Optional() @Inject(WCH_TOKEN_LOGGER_SERVICE) aLogSvc: LoggerService
  ) {
    const logger = aLogSvc.get('Test');
    logger.info('logging');
  }
}
