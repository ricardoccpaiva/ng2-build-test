import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ExpenseRequestModule } from './expense-request/expense-request.module';
import { ExpenseRequestListComponent } from './expense-request/list/expense-request-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './login/services/auth.service';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/callback.component';
import { LoginModule } from './login/login.module';
import { NgProgressModule } from 'ng2-progressbar';

const appRoutes: Routes = [
  { path: 'expense-requests', component: ExpenseRequestListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: '#', component: CallbackComponent },
  { path: '**', component: CallbackComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ExpenseRequestModule,
    LoginModule,
    NgProgressModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
