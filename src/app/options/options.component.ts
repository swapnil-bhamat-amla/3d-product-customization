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
        sku: 'White',
        name: 'White',
        hex: '#E5E7E7',
      },
      {
        sku: 'Steel Blue',
        name: 'Steel Blue',
        hex: '#4682B4',
      },
      {
        sku: 'Steel Grey',
        name: 'Steel Grey',
        hex: '#7B9095',
      },
      {
        sku: 'Metallic Red',
        name: 'Metallic Red',
        hex: '#871614',
      },
    ];
    this.selectedSKU = this.products[0].sku;
  }

  ngOnInit(): void {}

  colorChangedHnd(sku: string, hex: string) {
    this.selectedSKU = sku;
    this.sendSKUDetails(sku, hex);
  }

  sendSKUDetails(sku: string, hex: string) {
    let updatedProp: IAction = {
      type: ActionType.Options,
      data: {
        sku: sku,
        hex: hex,
      },
    };
    this.service.emitUpdatedEvent(updatedProp);
  }
}
