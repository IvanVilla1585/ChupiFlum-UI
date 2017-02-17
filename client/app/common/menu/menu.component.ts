import { Component, OnInit } from '@angular/core';
import any = jasmine.any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

  dataMenu: any [];
  isHidden: boolean;
  menuActivated: {label: '', url: '', id: ''};
  urlIconRight: string;
  urlIconDown: string;

  constructor() {
    this.dataMenu = [];
    this.isHidden = true;
    this.menuActivated = {label: '', url: '', id: ''};
    this.urlIconDown = '';
    this.urlIconRight = '';
  }

  ngOnInit() {
    this.getDataMenu();
    this.urlIconRight = 'assets/images/icons/arrow_right.png';
    this.urlIconDown = 'assets/images/icons/arrow_down.png';
  }

  getDataMenu(){
    this.dataMenu = [
      {
        label: 'Home',
        url: '/',
        subMenu: []
      },
      {
        label: 'Permisos',
        url: '/menu/permisos',
        subMenu: [
          {
            label: 'Usuarios',
            url: '/usuarios',
          },
          {
            label: 'Roles',
            url: '/roles',
          }
        ],
        id: 'sub-permissions'
      },
      {
        label: 'Compras',
        url: '/menu/compras',
        subMenu: [
          {
            label: 'Proveedores',
            url: '/proveedores',
          },
          {
            label: 'Pedidos',
            url: '/pedidos',
          },
          {
            label: 'Kardex Pedidos',
            url: '',
          },
          {
            label: 'Materia Prima',
            url: '/materiaprima',
          }
        ],
        id: 'sub-shopping'
      },
      {
        label: 'Producción',
        url: '/menu/produccion',
        subMenu: [
          {
            label: 'Ordenes de Producción',
            url: '',
          },
          {
            label: 'Maquinas',
            url: '/maquinas',
          },
          {
            label: 'Unidades de Medida',
            url: '/unidadmedidas',
          },
          {
            label: 'Producto Terminado',
            url: '/productoterminado',
          }
        ],
        id: 'sub-production'
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
            url: '/productoterminado',
          }
        ],
        id: 'sub-rawmaterial'
      },
      {
        label: 'Ayudas',
        url: '/menu/ayudas',
        subMenu: [
          {
            label: 'Acerca de',
            url: '/acercade',
          },
          {
            label: 'Manual de Usuario',
            url: '/manualusuario',
          }
        ],
        id: 'sub-help'
      }
    ]
  }

  openSubMenu(menu){
    let sub = document.getElementById(menu.id);
    let idSelect = `img_${menu.id}`;
    let iconSelect = document.getElementById(idSelect);

    if (this.menuActivated.id !== '' && this.menuActivated !== menu){
      let lastMenu = document.getElementById(this.menuActivated.id);
      let id = `img_${this.menuActivated.id}`;
      let icon = document.getElementById(id);
      lastMenu.classList.remove("activated");
      lastMenu.classList.add('inactivated');
      icon.classList.remove("img-activated");
    }
    sub.classList.add('activated');
    iconSelect.classList.add("img-activated");

    this.menuActivated = menu;
  }

}
