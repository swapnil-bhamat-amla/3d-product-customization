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
import { ConnectorService } from './connector.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    TextBoxComponent,
    ImageComponent,
    OptionsComponent,
    ViewsComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailsComponent,
  ],
  imports: [BrowserModule, FormsModule, ColorPickerModule],
  providers: [ConnectorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
