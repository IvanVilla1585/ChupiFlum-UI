import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {MachineService} from "../../../../../services/production/machine.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-machine',
  templateUrl: 'machine.component.html',
  styleUrls: ['machine.component.styl'],
  providers: [MachineService, ExtracErrorMessages]
})
export class MachineComponent implements OnInit {

  machineForm: FormGroup;
  keys: any [];
  units: any [];

  constructor(
    private _machineService: MachineService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages
  ) {
    this.keys = [];
    this.units = [];
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.getUnits()
    this.keys = ['nombre', 'capacidad', 'unidad_medida'];
  }

  createForm() {
    this.machineForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      description: '',
      quantity: ['', Validators.required ],
      unit: ['', Validators.required ]
    });
  }

  getUnits(){
          debugger
    this._machineService.getUnits().subscribe(
      (res) => {

          debugger
        let data = res.json();
        this.units = data;
      },
      (err) => {
        this.units = [];
        console.log(err.json())
      }
    );
  }

  save(){
    if (this.machineForm['_status'] === 'VALID'){
      let machine = {
        nombre: this.machineForm.get('name').value,
        descripcion: this.machineForm.get('description').value,
        capacidad: this.machineForm.get('quantity').value,
        unidad_medida: parseInt(this.machineForm.get('unit').value)
      };
      this._machineService.save(machine).subscribe(
        (res) => {
          let data = res.json();
          this.machineForm.reset();
          this._toast.success(`La máquina ${data.nombre} fue guardada`, 'Máquina!');
        },
        (err) => {
          if (err.status === 400){
            let message = '';
            message = this._extracErrorMessages.getMessages(err.json(), this.keys);
            this._toast.info(message, 'Máquina!', {toastLife: 10000})
          }else{
            this._toast.error('Ocurrio un error al crear', 'Máquina!')
          }
          console.log(err.json())
        }
      );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Máquina!')
    }
  }

}
