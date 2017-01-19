import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms'
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";


import {AppComponent} from './app.component';
import {TabViewModule} from "../../components/tabview/tabview";

import {MainPageComponent} from "./mainpage/mainpage.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        TabViewModule,
    ],
    declarations: [
        AppComponent,
        MainPageComponent,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }