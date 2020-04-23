export interface IAction {
  type: ActionType;
  data: IObjectAction | IAttribute | IView;
}

export enum ActionType {
  TextBox = 'TEXT-BOX',
  Image = 'IMAGE',
  Options = 'OPTIONS',
  Views = ' VIEWS',
}

interface IAttribute {
  sku: string;
}

interface IView {
  code: string;
}

interface IObjectAction {
  id: string;
  props: ITextProp | IImage;
}

export enum FontWeightType {
  Normal = 'normal',
  Bold = 'bold',
}

export enum FontStyleType {
  Normal = 'normal',
  Italic = 'italic',
}

export interface IObject {
  id: string;
  value: string;
}

export interface ITextProp {
  type: 'textbox';
  fill: string;
  text: string;
  fontSize: number;
  fontWeight: FontWeightType;
  fontStyle: FontStyleType;
  fontFamily: string;
  left: number;
  top: number;
  width: number;
  height: number;
  widget_key: string;
}

export interface IImage {
  type: 'image';
  src: string;
  widget_key: string;
  left: number;
  top: number;
  width: number;
  height: number;
}
