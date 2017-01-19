import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ComponentTwoComponent} from "./component-two.component";


const Routes: Routes = [
    {
        path: '',
        component: ComponentTwoComponent

    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Routes),
    ],
    exports: [],
    declarations: [ComponentTwoComponent],
    providers: [],
})
export class ComponentTwoModule { }
