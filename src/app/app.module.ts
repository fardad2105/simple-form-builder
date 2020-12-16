import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { FormFieldsComponent } from './components/form-fields/form-fields.component';
import { LoginComponent } from './components/Login/Login.component';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Security/jwt.interceptor';
import { ErrorInterceptor } from './Security/error.interceptor';
import { fakeBackendProvider } from './Security/fake-backend';


@NgModule({
  declarations: [
    AppComponent,
    EditAppComponent,
    FormFieldsComponent,
    LoginComponent
    // LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    // Modules
    FormsModule,
    DndModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
