import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from "./app.component";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CookieService } from "./app/core/services/cookie.service";


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [
        TranslateService,
        CookieService
      ],
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

//https://mcvendrell.medium.com/configuring-ngx-translate-to-load-at-startup-in-angular-1995e7dd6fcc
export function appInitializerFactory(translateService: TranslateService, cookieService: CookieService) {
  return () => {
    translateService.addLangs(['en', 'en-GB', 'fr', 'fr-CA', 'es', 'es-US', 'de', 'pl']);
    translateService.setDefaultLang('en');

    if (cookieService.getCookie('acceptedCookies').valueOf() === 'true') {
      if (translateService.langs.includes(cookieService.getCookie('language').valueOf())) {
        translateService.use(cookieService.getCookie('language').valueOf()).subscribe();
      } else {
        cookieService.setCookie('language', 'en', 1000, '/');
        translateService.use('en').subscribe();
      }
    } else {
      let defaultLang = 'en';
      let browserLang = translateService.getBrowserLang();

      if (browserLang) {
        defaultLang = browserLang;
      }
      
      if (translateService.langs.includes(defaultLang)) {
        translateService.use(defaultLang).subscribe();
      }
    }
  };
}