import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from "./mainpage/mainpage.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {   path: '',
                component: MainPageComponent
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
