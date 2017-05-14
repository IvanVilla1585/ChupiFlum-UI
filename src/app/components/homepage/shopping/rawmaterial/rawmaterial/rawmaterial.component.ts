import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {RawMaterialService} from "../../../../../services/shopping/raw-material.service";

@Component({
  selector: 'app-rawmaterial',
  templateUrl: './rawmaterial.component.html',
  styleUrls: ['./rawmaterial.component.styl'],
  providers: [RawMaterialService]
})
export class RawmaterialComponent implements OnInit {

  formMaterial: FormGroup;
  units: any [];
  categories: any [];

  constructor(
    private _rawMaterialService: RawMaterialService,
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
    this.getCategories();
  }

  createForm() {
    this.formMaterial = this.fb.group({ // <-- the parent FormGroup
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

  save(){
    if (this.formMaterial.status === 'VALID'){
      let material = {
        nombre: this.formMaterial.get('name').value,
        descripcion: this.formMaterial.get('description').value,
        unidad_medida: this.formMaterial.get('unit').value,
        unidad_medida_id: parseInt(this.formMaterial.get('unit').value),
        categoria: this.formMaterial.get('category').value,
        categoria_id: this.formMaterial.get('category').value,
        cantidad: this.formMaterial.get('quantity').value,
        stock: this.formMaterial.get('stock').value
      };
      this._rawMaterialService.save(material).subscribe(
        (res) => {
          let data = res.json();
          this.formMaterial.reset({
            unit: "",
            category: ""
          });
          this._toast.success(`La materia prima ${data.nombre} fue guardada`, 'Materia Prima!');
        },
        (err) => {
          this.formMaterial.reset();
          console.log(err)
        }
      );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Materia Prima!')
    }
  }

}
