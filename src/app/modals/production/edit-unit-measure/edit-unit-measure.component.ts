import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalEditUnitService} from "./edit-unit-measure.service";

@Component({
  selector: 'app-edit-unit-measure',
  templateUrl: './edit-unit-measure.component.html',
  styleUrls: ['./edit-unit-measure.component.styl']
})
export class EditUnitMeasureComponent implements OnInit {

  public unitForm: FormGroup;
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MatDialogRef<EditUnitMeasureComponent>;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.errorMessage = '';
    this.createForm();
    this.setDataForm();
    console.log(this.data)
  }

  createForm() {
    this.unitForm = this.fb.group({ // <-- the parent FormGroup
      id: ['', Validators.required ],
      name: ['', Validators.required ],
      description: '',
      code: ['', Validators.required ],
      equivalence: ['', Validators.required ]
    });
  }

  setDataForm(){
    this.unitForm.setValue({
      id: this.data.id,
      name: this.data.nombre,
      description: this.data.descripcion,
      code: this.data.code,
      equivalence: this.data.equivalencia
    });
  }

  update(){
    let data = {
      unit: {},
      valid: false
    };
    if (this.unitForm['_status'] === 'VALID') {
      let unit = {
        id: this.unitForm.get('id').value,
        nombre: this.unitForm.get('name').value,
        descripcion: this.unitForm.get('description').value,
        code: this.unitForm.get('code').value,
        equivalencia: this.unitForm.get('equivalence').value
      };
      data.unit = unit;
      data.valid = true;
      this.dialogRef.close(data);
    }else{
      this.errorMessage = 'Los campos marcados con * son obligatorios'
    }
  }

  closeModal(){
    let data = {
      unit: {},
      valid: false
    };
    this.dialogRef.close(data);
  }


}
