import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { FormFieldsComponent } from './components/form-fields/form-fields.component';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    EditAppComponent,
    FormFieldsComponent
    // LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Modules
    FormsModule,
    DndModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
