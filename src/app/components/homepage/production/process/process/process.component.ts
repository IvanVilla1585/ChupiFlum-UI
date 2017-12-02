import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ProcessService} from "../../../../../services/production/process.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.styl'],
  providers: [ProcessService, ExtracErrorMessages]
})
export class ProcessComponent implements OnInit {

  formProcess: FormGroup;
  machines: any [];
  keys: any [];

  constructor(
    private _processService: ProcessService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages
  ) {
    this.machines = [];
    this.keys = [];
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.getProcess();
    this.keys = ['nombre', 'maquina', 'tiempo']
  }

  createForm() {
    this.formProcess = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      description: '',
      machine: ['', Validators.required ],
      time: ['', Validators.required ]
    });
  }

  getProcess(){
    this._processService.findAllMachines().subscribe(
      (res) => {
        let data = res.json();
        this.machines = data;
      },
      (err) => {
        this.machines = [];
        console.log(err.json())
      }
    );
  }

  save(){
    debugger
    if (this.formProcess.status){
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
          if (err.status === 400){
            let message = '';
            message = this._extracErrorMessages.getMessages(err.json(), this.keys);
            this._toast.info(message, 'Proceso!', {toastLife: 10000})
          }else{
            this._toast.error('Ocurrio un error al crear', 'Proceso!')
          }
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
