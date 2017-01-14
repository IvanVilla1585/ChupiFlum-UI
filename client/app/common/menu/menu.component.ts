import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

  dataMenu: any [];
  isHidden: boolean;

  constructor() {
    this.dataMenu = [];
    this.isHidden = true;
  }

  ngOnInit() {
    this.getDataMenu();
  }

  getDataMenu(){
    this.dataMenu = [
      {
        label: 'Home',
        url: '',
        subMenu: []
      },
      {
        label: 'Permisos',
        url: '',
        subMenu: [
          {
            label: 'Usuarios',
            url: '',
          },
          {
            label: 'Roles',
            url: '',
          },
          {
            label: 'Permisos',
            url: '',
          }
        ]
      },
      {
        label: 'Compras',
        url: '',
        subMenu: [
          {
            label: 'Proveedores',
            url: '',
          },
          {
            label: 'Pedidos',
            url: '',
          },
          {
            label: 'Kardex Pedidos',
            url: '',
          }
        ]
      },
      {
        label: 'Producción',
        url: '',
        subMenu: [
          {
            label: 'Ordenes de Producción',
            url: '',
          },
          {
            label: 'Maquinas',
            url: '',
          },
          {
            label: 'Unidades de Medida',
            url: '',
          }
        ]
      },
      {
        label: 'Inventario',
        url: '',
        subMenu: [
          {
            label: 'Materia Prima',
            url: '',
          },
          {
            label: 'Producto Terminado',
            url: '',
          }
        ]
      },
      {
        label: 'Ayudas',
        url: '',
        subMenu: [
          {
            label: 'Acerca de',
            url: '',
          },
          {
            label: 'Manual de Usuario',
            url: '',
          }
        ]
      }
    ]
  }

  openSubMenu(){
    this.isHidden = !this.isHidden;
  }

}
