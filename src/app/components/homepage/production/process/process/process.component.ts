import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ProcessService} from "../../../../../services/production/process.service";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.styl'],
  providers: [ProcessService]
})
export class ProcessComponent implements OnInit {

  formProcess: FormGroup;
  units: any [];

  constructor(
    private _processService: ProcessService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager
  ) {
    this.units = [];
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.formProcess = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      description: '',
      machine: ['', Validators.required ],
      time: ['', Validators.required ]
    });
  }

  getUnits(){
    this._processService.getUnits().subscribe(
      (res) => {
        this.units = res.json();
      },
      (err) => {
        this.units = [];
        console.log(err.json())
      }
    );
  }

}
