import { Component, OnInit } from '@angular/core';
import {UnitmeasureService} from "../../../../../services/production/unitmeasure/unitmeasure.service";

@Component({
  selector: 'app-tableunitmeasure',
  templateUrl: './tableunitmeasure.component.html',
  styleUrls: ['./tableunitmeasure.component.styl'],
  providers: [UnitmeasureService]
})
export class TableunitmeasureComponent implements OnInit {

  public units: any [];

  constructor(private _unitmeasureService: UnitmeasureService) {
    this.units = [];
  }

  ngOnInit() {
    this.getUnits();
  }

  getUnits(){
    this._unitmeasureService.list()
      .subscribe(
        (res) => {
          this.units = res.json();
        },
        (err) => {
          this.units = [];
        }
      );
  }

}
