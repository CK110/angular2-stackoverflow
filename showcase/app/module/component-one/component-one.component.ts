import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'component-one',
    template:  `
        <p>
            component-one works
            
        </p>
        <button pButton (click)="childRoute()">click</button>
        
        <div [style.width.px]="200" [style.height.px]="200" style="border: 1px solid red">
        
            <router-outlet></router-outlet>

        </div>
    `
})
export class ComponentOneComponent implements OnInit {
    constructor(public router: Router, public route: ActivatedRoute) { }

    ngOnInit() {


    }

    childRoute(){

        this.router.navigate(['w'], { relativeTo: this.route });

    }
}


