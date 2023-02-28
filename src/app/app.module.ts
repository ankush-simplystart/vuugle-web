import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


/** Import Alyle UI */
import { LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2, LyCommonModule, LyClasses, lyl } from '@alyle/ui';
import { MinimaLight, MinimaDeepDark, MinimaDark } from '@alyle/ui/themes/minima';
import { Color } from '@alyle/ui/color';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LyCommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDeepDark, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    // { provide: LY_THEME, useClass: CustomMinimaLight, multi: true }, // name minima-light
    // { provide: LY_THEME, useClass: CustomMinimaDark, multi: true }, // name minima-dark
    // { provide: LY_THEME, useClass: CustomMinimaDeepDark, multi: true }, // name minima-deep-dark
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
