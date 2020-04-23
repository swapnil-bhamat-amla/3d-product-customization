import { Component, OnInit } from '@angular/core';
import { ActionType, IAction } from '../type';
import { ConnectorService } from '../connector.service';

interface IView {
  name: string;
  code: string;
}

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],
})
export class ViewsComponent implements OnInit {
  views: IView[] = [];
  selectedViewCode = 'Front';
  constructor(private service: ConnectorService) {
    this.views = [
      {
        name: 'Front Side',
        code: 'Front',
      },
      {
        name: 'Back Side',
        code: 'Back',
      },
    ];
  }

  ngOnInit(): void {}

  changeView(code: string) {
    this.selectedViewCode = code;
    this.sendViewDetails(code);
  }

  sendViewDetails(code: string) {
    let updatedProp: IAction = {
      type: ActionType.Views,
      data: {
        code: code,
      },
    };
    this.service.emitUpdatedEvent(updatedProp);
  }
}
