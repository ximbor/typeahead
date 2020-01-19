import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypeaheadFieldComponent } from './components/typeahead-field/typeahead-field.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
   declarations: [
      AppComponent,
      TypeaheadFieldComponent,
      SearchBoxComponent,
      SearchResultComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [
      ApiService
   ],
   bootstrap: [
      AppComponent
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ]
})
export class AppModule { }
