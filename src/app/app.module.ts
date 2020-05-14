import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { OptionsComponent } from './options/options.component';
import { ConnectorService } from './connector.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThreeDPreviewComponent } from './three-d-preview/three-d-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    OptionsComponent,
    HeaderComponent,
    FooterComponent,
    ThreeDPreviewComponent,
  ],
  imports: [BrowserModule, FormsModule, ColorPickerModule],
  providers: [ConnectorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
