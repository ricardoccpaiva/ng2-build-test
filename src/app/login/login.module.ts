import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, CallbackComponent]
})
export class LoginModule { }
