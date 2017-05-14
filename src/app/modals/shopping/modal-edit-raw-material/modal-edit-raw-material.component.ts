import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {RawMaterialService} from "../../../services/shopping/raw-material.service";

@Component({
  selector: 'app-modal-edit-raw-material',
  templateUrl: './modal-edit-raw-material.component.html',
  styleUrls: ['./modal-edit-raw-material.component.styl'],
  providers: [RawMaterialService]
})
export class ModalEditRawMaterialComponent implements OnInit {

  public formMaterial: FormGroup;
  public categories: any [];
  public units: any [];
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MdDialogRef<ModalEditRawMaterialComponent>;

  constructor(
    private _rawMaterialService: RawMaterialService,
    private fb: FormBuilder
  ) {
    this.categories = [];
    this.units = [];
  }

  ngOnInit() {
    this.errorMessage = '';
    this.createForm();
    this.getUnits();
    this.getCategories();
    this.setDataForm();
  }

  createForm() {
    this.formMaterial = this.fb.group({ // <-- the parent FormGroup
      id: ['', Validators.required ],
      name: ['', Validators.required ],
      description: '',
      unit: ['', Validators.required ],
      category: ['', Validators.required ],
      quantity: ['', ],
      stock: ['', Validators.required ]
    });
  }

  getUnits(){
    this._rawMaterialService.getUnits().subscribe(
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

  getCategories(){
    this._rawMaterialService.getCategories().subscribe(
      (res) => {
        let data = res.json();
        this.categories = data.results;
      },
      (err) => {
        this.categories = [];
        console.log(err.json())
      }
    );
  }

  setDataForm(){
    this.formMaterial.setValue({
      id: this.data.id,
      name: this.data.nombre,
      description: this.data.descripcion,
      unit: this.data.unidad_medida.id,
      category: this.data.categoria.id,
      quantity: this.data.cantidad,
      stock: this.data.stock
    });
  }

  update(){
    let data = {
      material: {},
      error: {},
      valid: false
    };
    if (this.formMaterial['_status'] === 'VALID') {
      let material = {
        id: this.formMaterial.get('id').value,
        nombre: this.formMaterial.get('name').value,
        descripcion: this.formMaterial.get('description').value,
        unidad_medida: this.formMaterial.get('unit').value,
        unidad_medida_id: this.formMaterial.get('unit').value,
        categoria: this.formMaterial.get('category').value,
        categoria_id: this.formMaterial.get('category').value,
        cantidad: this.formMaterial.get('quantity').value,
        stock: this.formMaterial.get('stock').value
      };
      this._rawMaterialService.update(material)
        .subscribe(
          (res) => {
            data.material = res.json();
            data.valid = true;
            this.dialogRef.close(data);
          },
          (err) => {
            data.error = err.json();
            data.valid = false;
            this.dialogRef.close(data);
          }
        );
    }else{
      this.errorMessage = 'Los campos marcados con * son obligatorios';
    }
  }

  closeModal(){
    let data = {
      process: {},
      valid: false
    };
    this.dialogRef.close(data);
  }

}
