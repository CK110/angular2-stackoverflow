import { NgModule } from '@angular/core';
import {ComponentOneComponent} from "./component-one.component";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";


const Routes: Routes = [
    {
        path: 'w',
        component: ComponentOneComponent

    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Routes),
    ],
    exports: [],
    declarations: [ComponentOneComponent],
    providers: [],
})
export class ComponentOneModule { }
