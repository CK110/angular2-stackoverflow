import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TabView, TabPanel} from "../../../components/tabview/tabview";
import {ComponentOneComponent} from "../module/component-one/component-one.component";
import {ComponentTwoComponent} from "../module/component-two/component-two.component";

@Component({
    selector: 'primeng-mainpage',
    templateUrl: 'showcase/app/mainpage/mainpage.component.html'
})
export class MainPageComponent {

    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;

    @ViewChild('pt') tabView: TabView;

    tabPanel:TabPanel = new TabPanel();


    constructor(public router: Router){

    }

    toggleMenu(e) {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();
    }

    navigate(url:string){

        if(url == '/componentone'){
            new Promise(function (resolve) {
                (require as any).ensure([], function (require: any) {
                    resolve(require('../module/component-one/component-one.module')['ComponentOneModule']);
                });
            }).then((DemoModule)=> {
                    this.tabPanel.closable= true;
                    this.tabPanel.header="ComponentOneComponent";
                    this.tabPanel.compModule = DemoModule;
                    this.tabPanel.compType = ComponentOneComponent;
                    this.tabView.addTab(this.tabPanel);
                }
            )
        }

        if(url == '/componenttwo'){
            new Promise(function (resolve) {
                (require as any).ensure([], function (require: any) {
                    resolve(require('../module/component-two/component-two.module')['ComponentTwoModule']);
                });
            }).then((DemoModule)=> {
                    this.tabPanel.closable= true;
                    this.tabPanel.header="ComponentTwoComponent";
                    this.tabPanel.compModule = DemoModule;
                    this.tabPanel.compType = ComponentTwoComponent;
                    this.tabView.addTab(this.tabPanel);
                }
            )
        }




    }
}