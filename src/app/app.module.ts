import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { PreviewComponent } from './preview/preview.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { ImageComponent } from './image/image.component';
import { OptionsComponent } from './options/options.component';
import { ViewsComponent } from './views/views.component';

@NgModule({
  declarations: [AppComponent, PreviewComponent, TextBoxComponent, ImageComponent, OptionsComponent, ViewsComponent],
  imports: [BrowserModule, FormsModule, ColorPickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
