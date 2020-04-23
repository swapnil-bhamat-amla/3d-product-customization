export interface IAction {
  type: ActionType;
  data: ITextBoxAction;
}

export enum ActionType {
  TextBox = 'TEXT-BOX',
  Image = 'IMAGE',
  Options = 'OPTIONS',
}

export interface ITextBoxAction {
  id: string;
  props: ITextProp;
}

export interface ITextProp {
  fill: string;
  text: string;
  fontSize: number;
  fontWeight: boolean;
  fontStyle: boolean;
  fontFamily: string;
  left: number;
  top: number;
  widget_key: string;
}
