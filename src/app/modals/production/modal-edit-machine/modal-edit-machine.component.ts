import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {MachineService} from "../../../services/production/machine.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-modal-edit-machine',
  templateUrl: './modal-edit-machine.component.html',
  styleUrls: ['./modal-edit-machine.component.styl'],
  providers: [MachineService]
})
export class ModalEditMachineComponent implements OnInit {

  public machineForm: FormGroup;
  public units: any [];
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MdDialogRef<ModalEditMachineComponent>;

  constructor(
    private _machineService: MachineService,
    private fb: FormBuilder
  ) {
    this.units = [];
  }

  ngOnInit() {
    this.errorMessage = '';
    this.createForm();
    this.getUnits();
    this.setDataForm();
  }

  createForm() {
    this.machineForm = this.fb.group({ // <-- the parent FormGroup
      id: ['', Validators.required ],
      name: ['', Validators.required ],
      description: '',
      quantity: ['', Validators.required ],
      unit: ['', Validators.required ]
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

  setDataForm(){
    this.machineForm.setValue({
      id: this.data.id,
      name: this.data.nombre,
      description: this.data.descripcion,
      quantity: this.data.capacidad,
      unit: this.data.unidad_medida.id
    });
  }

  update(){
    let data = {
      machine: {},
      valid: false
    };
    if (this.machineForm['_status'] === 'VALID') {
      let machine = {
        id: this.machineForm.get('id').value,
        nombre: this.machineForm.get('name').value,
        descripcion: this.machineForm.get('description').value,
        capacidad: this.machineForm.get('quantity').value,
        unidad_medida: this.machineForm.get('unit').value
      };
      data.machine = machine;
      data.valid = true;
      this.dialogRef.close(data);
    }else{
      this.errorMessage = 'Los campos marcados con * son obligatorios'
    }
  }

  closeModal(){
    let data = {
      machine: {},
      valid: false
    };
    this.dialogRef.close(data);
  }
}
