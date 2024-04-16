import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './navbar/navbar.module';
import { MainModule } from './main/main.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PaletteModule } from './palette/palette.module';
import { HttpClientModule } from '@angular/common/http';
import { SigninModule } from './signin/signin.module';
import { RegisterModule } from './register/register.module';
import { AuthService } from './auth.service';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    MainModule,
    PaletteModule,
    HttpClientModule,
    SigninModule,
    RegisterModule,
    ProfileModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
