import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import {ToastsManager} from "ng2-toastr";
import {ProductService} from "../../../../../services/production/product.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.styl'],
  providers: [ProductService, ExtracErrorMessages]
})
export class ProductComponent implements OnInit {

  currentTab: String;
  formProduct: FormGroup;
  formFormula: FormGroup;
  formProcess: FormGroup;
  units: any [];
  categories: any [];
  keys: any [];
  presentations: any [];
  process: any [];
  processSelected: any [];
  processDetail: any [];
  products: any [];
  formulaSelected: any [];
  formulas: any [];
  productDetail: any;
  product: string;
  unit: string;
  quantity: string;
  productId: string;

  constructor(
    private _productService: ProductService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages,
    private _route: ActivatedRoute
  ) {
    this.units = [];
    this.process = [];
    this.formulas = [];
    this.categories = [];
    this.presentations = [];
    this.processSelected = [];
    this.formulaSelected = [];
    this.processDetail = [];
    this.productDetail = {};
    this.product = '';
    this.unit = '';
    this.quantity = '';
    this.productId = '';
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.getParamsId();
    this.currentTab = 'product';
    this.createForm();
    this.getUnits();
    this.getCategory();
    this.getDataProcess();
    this.getDataPresentations();
    this.getDataProducts();
    this.keys = ['nombre', 'maquina', 'tiempo'];
    if (this.productId) {
      this.getDataProductById();
      this.setDataForms()
    }
  }

  getParamsId() {
    this._route.params.subscribe(params => {
      if(params['id']!=null){
        this.productId = params['id'];
        debugger
      }
    });
  }

  setDataForms() {
    this.formProduct.setValue({
      id: this.productDetail.id,
      name: this.productDetail.nombre,
      description: this.productDetail.descripcion,
      category: this.productDetail.categoria.id,
      unit: this.productDetail.unidad_medida.id,
      quantity: this.productDetail.quantity,
      stock: this.productDetail.stock
    });
  }

  getDataProductById() {
    this._productService.getById(parseInt(this.productId)).subscribe(
      (res) => {
        debugger
        let data = res.json();
        this.productDetail = data;
      },
      (err) => {
        this.productDetail = {};
        console.log(err.json())
      }
    );
  }

  createForm() {
    this.formProduct = this.fb.group({ // <-- the parent FormGroup
      id: '',
      name: ['', Validators.required ],
      description: '',
      unit: ['', Validators.required ],
      category: ['', Validators.required ],
      quantity: '',
      stock: ['', Validators.required ]
    });
    this.formFormula = this.fb.group({ // <-- the parent FormGroup
      presentation: ['', Validators.required ],
      quantity: ['', Validators.required ]
    });
    this.formProcess = this.fb.group({ // <-- the parent FormGroup
      time: ['', Validators.required ]
    });
  }

  setCurrentTab (tab: String){
    this.currentTab = tab;
  }

  getUnits(){
    this._productService.getDataUnits().subscribe(
      (res) => {
        let data = res.json();
        this.units = data;
      },
      (err) => {
        this.units = [];
        console.log(err.json())
      }
    );
  }

  getCategory(){
    this._productService.getDataCategory().subscribe(
      (res) => {
        let data = res.json();
        this.categories = data;
      },
      (err) => {
        this.categories = [];
        console.log(err.json())
      }
    );
  }

  getDataPresentations(){
    this._productService.getDataPresentations().subscribe(
      (res) => {
        let data = res.json();
        this.presentations = data;
      },
      (err) => {
        this.presentations = [];
        console.log(err.json())
      }
    );
  }

  getDataProcess(){
    this._productService.getDataProcess().subscribe(
      (res) => {
        let data = res.json();
        this.process = data;
      },
      (err) => {
        this.process = [];
        console.log(err.json())
      }
    );
  }

  getDataProducts(){
    this._productService.getDataMaterial().subscribe(
      (res) => {
        let data = res.json();
        this.products = data;
      },
      (err) => {
        this.products = [];
        console.log(err.json())
      }
    );
  }

  selectProcess(process) {
    this.process = this.process.filter((data, index) => process.id !== data.id);
    this.processSelected.push(process);
    this.processDetail.push({proceso: process.id, proceso_id: process.id})
  }

  unselectProcess(process) {
    this.processSelected = this.processSelected.filter((data, index) => process.id !== data.id);
    this.processDetail = this.processDetail.filter((data, index) => process.id !== data.proceso);
    this.process.push(process);
  }

  save(){
    let newProduct = {
      nombre: '',
      descripcion: '',
      categoria: '',
      categoria_id: '',
      unidad_medida: '',
      unidad_medida_id: '',
      stock: '',
      cantidad: '',
      presentacion: '',
      presentacion_id: '',
      cantidad_produccion: '',
      materia_prima: [],
      proceso: []
    };
    if (this.formProduct.status === 'VALID'){
      newProduct.nombre = this.formProduct.get('name').value,
      newProduct.descripcion = this.formProduct.get('description').value,
      newProduct.categoria = this.formProduct.get('category').value,
      newProduct.categoria_id = this.formProduct.get('category').value,
      newProduct.unidad_medida = this.formProduct.get('unit').value,
      newProduct.unidad_medida_id = this.formProduct.get('unit').value,
      newProduct.stock = this.formProduct.get('stock').value,
      newProduct.cantidad = this.formProduct.get('quantity').value

      if (this.formFormula.status === 'VALID'){
        newProduct.presentacion = this.formFormula.get('presentation').value;
        newProduct.presentacion_id = this.formFormula.get('presentation').value;
        newProduct.cantidad_produccion = this.formFormula.get('quantity').value;
      }else{
        this._toast.info('Todos los campos marcados con * son obligatorios', 'Campos obligatorios');
        return;
      }

      if (!this.formulaSelected.length){
        this._toast.info('Seleccione al menos un proceso', 'Producto Terminado!');
        return;
      }

      if (!this.processDetail.length){
        this._toast.info('Seleccione al menos una materia prima para la formula', 'Producto Terminado!');
        return;
      }

      newProduct.materia_prima = this.formulaSelected;
      newProduct.proceso = this.processDetail;

      this._productService.save(newProduct)
        .subscribe(
          (res) => {
            let data = res.json();
            this.resetForms();
            this._toast.success(`Se guradó el producto ${data.nombre}`, 'Producto Terminado!');
          },
          (err) => {
            if (err.status === 400){
              let message = '';
              message = this._extracErrorMessages.getMessages(err.json(), this.keys);
              this._toast.info(message, 'Producto Terminado!', {toastLife: 10000})
            }else{
              this._toast.error('Ocurrio un error al crear', 'Producto Terminado!')
            }
            console.log(err.json())
          }
        );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Campos obligatorios');
    }

  }

  cancel(){
    this.resetForms();
  }

  resetForms() {
    this.formProduct.reset({
      category: '',
      unit: ''
    });
    this.formFormula.reset({
      presentation: ''
    });
    this.formProcess.reset();
    this.formulas = [];
    this.formulaSelected = [];
    this.processDetail = [];
    this.processSelected = [];
  }

  addRow() {
    if (!this.product || !this.unit || !this.quantity) {
      this._toast.info('Ingrese todos los datos de la formula', 'Producto Terminado!');
      return;
    }

    const data = {materia_prima: parseInt(this.product), materia_prima_id: parseInt(this.product), unidad_medida: parseInt(this.unit), unidad_medida_id: parseInt(this.unit), cantidad: this.quantity};

    this.formulaSelected.push(data);

    const materia = this.products.find(data => data.id === parseInt(this.product));
    const unit = this.units.find(data => data.id === parseInt(this.unit));
    const quantity = this.quantity;

    this.formulas.push({materia, unit, quantity});

    this.product = '';
    this.unit = '';
    this.quantity = '';
  }

  deleteRow(data) {
    if (!this.formulas.length){
      this.product = '';
      this.unit = '';
      this.product = '';
      return;
    }

    this.formulas = this.formulas.filter(formula => formula.materia.id !== data.materia.id);
    this.formulaSelected = this.formulaSelected.filter(formula => formula.materia_prima !== data.materia.id);
  }

}
