import { Component, OnInit } from '@angular/core';

interface IProduct {
  sku: string;
  name: string;
  hex: string;
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  selectedSKU = '#fff';
  products: IProduct[] = [];
  constructor() {
    this.products = [
      {
        sku: 'Product_V_Black',
        name: 'Black',
        hex: '#000000',
      },
      {
        sku: 'Product_V_Blue',
        name: 'Blue',
        hex: '#0000ff',
      },
      {
        sku: 'Product_V_Red',
        name: 'Red',
        hex: '#ff0000',
      },
    ];
  }

  ngOnInit(): void {}

  colorChangedHnd(sku: string) {
    this.selectedSKU = sku;
    console.log(sku);
  }
}
