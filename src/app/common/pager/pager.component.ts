import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {UnitmeasureService} from "../../services/production/unitmeasure/unitmeasure.service";

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.styl'],
  providers: [UnitmeasureService]
})
export class PagerComponent implements OnInit {

  public baseUrl: string;

  @Input()
  public pages: any[];
  @Input()
  public totalPages: number;
  @Input()
  public nextPage: string;
  @Input()
  public previusPage: string;

  @Output()
  updateDataPager = new EventEmitter();

  constructor(private _unitmeasureService: UnitmeasureService) {
    this.baseUrl = '';
    this.pages = [];
  }

  ngOnInit() {
    this.baseUrl = 'http://localhost:8000/api/unidadesmedidas/?page=';
  }



  updateData(data){
    let newData = {
      totalPages: data.count,
      nextPage: data.next,
      previusPage: data.previous,
      units: data.results
    };
    this.updateDataPager.emit(newData);
  }

  updateStep(type){
    debugger
    let url: string = '';
    switch (type){
      case 'next':
        url = this.nextPage;
        break;
      case 'back':
        url = this.previusPage;
        break;
      case 'first':
        url = `${this.baseUrl}1`;
        break;
      case 'last':
        url = `${this.baseUrl}${this.pages.length}`;
        break;
      default:
        url = `${this.baseUrl}1`;
        break;
    }
    if (!url) return;
    this._unitmeasureService.listPage(url)
      .subscribe(
        (res) => {
          this.updateData(res.json());
        },
        (err) => {
          let newData = {
            totalPages: 0,
            nextPage: '',
            previusPage: '',
            units: []
          };
          this.updateDataPager.emit(newData);
        }
      )
  }

}
