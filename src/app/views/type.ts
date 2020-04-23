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

export enum FontWeightType {
  Normal = 'normal',
  Bold = 'bold',
}

export enum FontStyleType {
  Normal = 'normal',
  Italic = 'italic',
}

export interface ITextProp {
  fill: string;
  text: string;
  fontSize: number;
  type: 'textbox';
  fontWeight: FontWeightType;
  fontStyle: FontStyleType;
  fontFamily: string;
  left: number;
  top: number;
  width: number;
  height: number;
  widget_key: string;
}
