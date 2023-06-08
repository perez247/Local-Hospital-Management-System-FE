import { AppInjector } from 'src/app/app.module';
import { LogService } from './../../../shared/services/log/log.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-finance-paid-item',
  templateUrl: './private-finance-paid-item.component.html',
  styleUrls: ['./private-finance-paid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateFinancePaidItemComponent implements OnInit {

  @Input() arr: any[] = [];

  list = [1,2,3,4,5,6,7,8,9,0]

  constructor(
    private logService: LogService
  ) { }

  ngOnInit(): void {
    this.list.forEach(x => {
      this.logService.addLog(x.toString());
    });
    // console.log(this.logService.printLog());
    // console.log(AppInjector);
  }

  greatings(): void {
    console.log('item...');
  }

}
