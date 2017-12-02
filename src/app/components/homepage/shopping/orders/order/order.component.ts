import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import {ToastsManager} from "ng2-toastr";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";
import {OrderService} from '../../../../../services/shopping/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.styl'],
  providers: [OrderService, ExtracErrorMessages]
})
export class OrderComponent implements OnInit {

  product: FormControl;
  unit: FormControl;
  quantity: FormControl;
  value: FormControl;
  orderForm: FormGroup;
  products: Array<any>;
  productsSelected: Array<any>;
  materials: Array<any>;
  keys: Array<any>;
  currentMaterial: any;
  currentSupplier: any;
  units: Array<any>;
  productPlaceholder: string;
  productClassStyle: string;
  options: Array<any>;
  suppliers: Array<any>;
  readonly: Boolean;

  filteredOptions: Observable<any[]>;

  constructor(
    private _orderService: OrderService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages,
    private _route: ActivatedRoute,
  ){
    this.products = [];
    this.materials = [];
    this.units = [];
    this.keys = [];
    this.options = [];
    this.suppliers = [];
    this.productsSelected = [];
    this.productPlaceholder = '';
    this.productClassStyle = '';
    this.product = new FormControl();
    this.unit = new FormControl();
    this.quantity = new FormControl();
    this.value = new FormControl();
    this.currentMaterial = {};
    this.readonly = false;
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.productPlaceholder = 'Producto';
    this.productClassStyle = 'input-autocomplete';
    this.keys = ['nombre', 'maquina', 'tiempo'];
    this.unit.setValue("");
    this.getUnits();
    this.getDataProducts();
    this.createForm();
    this.orderForm.get('date').setValue(
      moment().format('lll')
    );
  }

  createForm() {
    this.orderForm = this.fb.group({ // <-- the parent FormGroup
      date: ['', Validators.required ],
      nit: ['', Validators.required ],
      supplier: ['', Validators.required ],
      address: ['', Validators.required ]
    });
  }

  search(event: any) {
    if (event.query.length > 2){
      this._orderService.searchUnitMeasure(event.query)
        .subscribe(
          resp => this.options = resp.json(),
          err => this._toast.error('Ocurrion un error obteniendo la materia prima', 'Pedidos')
        );
    }
  }

  selectData(data) {
    this.currentMaterial = data;
  }

  searchSupplier(event: any) {
    if (event.query.length > 2){
      this._orderService.searchSupplier(event.query)
        .subscribe(
          resp => this.suppliers = resp.json(),
          err => this._toast.error('Ocurrion un error obteniendo la materia prima', 'Pedidos')
        );
    }
  }

  selectDataSupplier(data) {
    this.currentSupplier = data;
    this.orderForm.get('nit').setValue(data.nit);
    this.orderForm.get('address').setValue(data.direccion);
    this.readonly = true;
  }

  getUnits(){
    this._orderService.getDataUnits().subscribe(
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

  getDataProducts(){
    this._orderService.getDataMaterial().subscribe(
      (res) => {
        let data = res.json();
        this.materials = data;
      },
      (err) => {
        this.materials = [];
        console.log(err.json())
      }
    );
  }

  addRow() {
    if (!this.currentMaterial.id || !this.unit.value || !this.quantity.value || !this.value.value) {
      this._toast.info('Ingrese todos los datos del producto', 'Compras a Proveedores!');
      return;
    }

    const data = {
      materia_prima: this.currentMaterial.id,
      materia_prima_id: this.currentMaterial.id,
      unidad_medida: parseInt(this.unit.value),
      unidad_medida_id: parseInt(this.unit.value),
      cantidad: this.quantity.value,
      valor_unitario: this.value.value
    };

    this.productsSelected.push(data);

    const materia = this.currentMaterial;
    const unit = this.units.find(data => data.id === parseInt(this.unit.value));
    const quantity = this.quantity.value;
    const value = this.value.value;

    this.products.push({materia, unit, quantity, value});

    this.currentMaterial = {};
    this.product.setValue("");
    this.unit.setValue("");
    this.quantity.setValue("");
    this.value.setValue("");

  }

  deleteRow(position) {
    this.products = this.products.filter((product, index) => index !== position);
    this.productsSelected = this.productsSelected.filter((product, index) => index !== position);
  }

  save() {
    debugger
    let newOrder = {};
    if (this.orderForm.status === 'VALID') {
      newOrder['fecha'] = moment().format('LLTS');
      newOrder['proveedor'] = this.currentSupplier.id;
      newOrder['proveedor_id'] = this.currentSupplier.id;
      newOrder['total'] = 2000;
      newOrder['usuario'] = 1;
      newOrder['usuario_id'] = 1;
      if (!this.productsSelected.length){
        this._toast.info('Ingrese al menos un producto para la compra', 'Compra Materia Prima!');
        return;
      }

      newOrder['materia_prima'] = this.productsSelected;

      this._orderService.save(newOrder)
        .subscribe(
          (res) => {
            let data = res.json();
            this.orderForm.reset({
              unit: ""
            });
            this.readonly = false;
            this._toast.success(`Se guradó la compra`, 'Compra Materia Prima!');
          },
          (err) => {
            if (err.status === 400){
              let message = '';
              message = this._extracErrorMessages.getMessages(err.json(), this.keys);
              this._toast.info(message, 'Compra Materia Prima!', {toastLife: 10000})
            }else{
              this._toast.error('Ocurrio un error al crear', 'Compra Materia Prima!')
            }
            console.log(err.json())
          }
        );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Campos obligatorios');
    }

  }
}
