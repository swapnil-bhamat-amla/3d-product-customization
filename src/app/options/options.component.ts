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
        sku: 'Pacific',
        name: 'Pacific',
        hex: '#009BD7',
      },
      {
        sku: 'Black',
        name: 'Black',
        hex: '#231F20',
      },
      {
        sku: 'White',
        name: 'White',
        hex: '#F1F1F1',
      },
      {
        sku: 'Stone',
        name: 'Stone',
        hex: '#686766',
      },
      {
        sku: 'Cobalt',
        name: 'Cobalt',
        hex: '#454F69',
      },
      {
        sku: 'Olive',
        name: 'Olive',
        hex: '#5C663A',
      },
      {
        sku: 'Fog',
        name: 'Fog',
        hex: '#C5C2D0',
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
