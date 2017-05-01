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
  machines: any [];

  constructor(
    private _processService: ProcessService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager
  ) {
    this.machines = [];
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.getUnits();
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
    this._processService.findAllMachines().subscribe(
      (res) => {
        let data = res.json();
        this.machines = data.results;
      },
      (err) => {
        this.machines = [];
        console.log(err.json())
      }
    );
  }

  save(){
    if (this.formProcess['_status'] === 'VALID'){
      let process = {
        nombre: this.formProcess.get('name').value,
        descripcion: this.formProcess.get('description').value,
        maquina: this.formProcess.get('machine').value,
        tiempo: this.formProcess.get('time').value
      }
      this._processService.save(process).subscribe(
        (res) => {
          let data = res.json();
          this.formProcess.reset();
          this._toast.success(`El proceso ${data.nombre} fue creado`, 'Proceso!');
        },
        (err) => {
          console.log(err);
        }
      );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Proceso!');
    }
  }

  cancel(){
    this.formProcess.reset();
  }

}
