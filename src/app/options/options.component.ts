import { Component, OnInit } from '@angular/core';
import { IAction, ActionType } from '../type';
import { ConnectorService } from '../connector.service';

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
  constructor(private service: ConnectorService) {
    this.products = [
      {
        sku: 'Product_V_Black',
        name: 'Black',
        hex: '#1A1A1A',
      },
      {
        sku: 'Product_V_Blue',
        name: 'Blue',
        hex: '#365D78',
      },
      {
        sku: 'Product_V_Red',
        name: 'Red',
        hex: '#7C0106',
      },
    ];
  }

  ngOnInit(): void {}

  colorChangedHnd(sku: string) {
    this.selectedSKU = sku;
    this.sendSKUDetails(sku);
  }

  sendSKUDetails(sku: string) {
    let updatedProp: IAction = {
      type: ActionType.Options,
      data: {
        sku: sku,
      },
    };
    this.service.emitUpdatedEvent(updatedProp);
  }
}
