import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {MachineService} from "../../../../../services/production/machine.service";

@Component({
  selector: 'app-machine',
  templateUrl: 'machine.component.html',
  styleUrls: ['machine.component.styl'],
  providers: [MachineService]
})
export class MachineComponent implements OnInit {

  machineForm: FormGroup;
  units: any [];

  constructor(
    private _machineService: MachineService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager
  ) {
    this.units = [];
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.getUnits();
  }

  createForm() {
    this.machineForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      description: '',
      quantity: ['', Validators.required ],
      unit: ['', Validators.required ],
      time: ['', Validators.required ]
    });
  }

  getUnits(){
    this._machineService.getUnits().subscribe(
      (res) => {
        let data = res.json();
        this.units = data.results;
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
        unidad_medida: parseInt(this.machineForm.get('unit').value),
        tiempo: this.machineForm.get('time').value
      };
      this._machineService.save(machine).subscribe(
        (res) => {
          let data = res.json();
          this.machineForm.reset();
          this._toast.success(`La máquina ${data.nombre} fue guardada`, 'Máquina!');
        },
        (err) => {
          this.machineForm.reset();
          console.log(err)
        }
      );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Máquina!')
    }
  }

}
