import {
    NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren, QueryList,
    IterableDiffer, ViewChild, ViewContainerRef, ChangeDetectorRef, IterableDiffers, ComponentFactoryResolver,Compiler,
} from '@angular/core';
import {CommonModule} from '@angular/common';



@Component({
    selector: 'p-tabPanel',
    template: `
        <div class="ui-tabview-panel ui-widget-content" [style.height.px]="iframeHeight" [style.display]="selected ? 'block' : 'none'" *ngIf="!closed">
            <ng-content></ng-content>            
            <div #insertion></div>
        
        </div>
    `,
})
export class TabPanel {

    @Input() iframeHeight: any;

    @Input() header: string = 'name';

    @Input() selected: boolean = false;

    @Input() disabled: boolean;

    @Input() closable: boolean;

    @Input() headerStyle: any;

    @Input() headerStyleClass: string;

    @Input() leftIcon: string;

    @Input() rightIcon: string;

    @Input() url: string;

    public hoverHeader: boolean;

    public closed: boolean;

    public _actUrl: string;

    compModule:any;
    compType:any;

    @ViewChild('insertion',{read: ViewContainerRef})
    insertion: ViewContainerRef;


    constructor(private compiler?:Compiler, protected el?: ElementRef) {

    }

    ngAfterViewInit() {

        // debugger;
        if(this.compModule && this.compType ){
            this.compiler.compileModuleAndAllComponentsAsync(this.compModule)
                .then((componentFactories)=> {
                    const factory = componentFactories.componentFactories.find((comp) =>
                            comp.componentType === this.compType
                    );
                    this.insertion.createComponent(factory);
                })

        }

    }

}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass" >
            <div class="ui-tabview-bar-header">
                <div class="tabview-bar-left">
                    <Button pButton *ngIf="visible" class="tabview-slide-left" (click)="clickLeft()" > < </Button>
                </div>
                <div class="tabview-bar-right">
                    <Button pButton *ngIf="visible" class="tabview-slide-right" (click)="clickRight()" > > </Button>
                </div>
                <div class="tabs-nav-wrap">
                    <ul class="ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                        <template ngFor let-tab [ngForOf]="tabs">
                            <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle"
                                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-hover': tab.hoverHeader&&!tab.disabled, 'ui-state-disabled': tab.disabled}"
                                (mouseenter)="tab.hoverHeader=true" (mouseleave)="tab.hoverHeader=false" (click)="open($event,tab)" *ngIf="!tab.closed">
                                <a href="#">
                                    <span class="ui-tabview-left-icon fa" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                                    {{tab.header}}
                                    <span class="ui-tabview-right-icon fa" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                                </a>
                                <span *ngIf="tab.closable" class="ui-tabview-close fa fa-close" (click)="close($event,tab)"></span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
                <div #insertion></div>
            </div>
        </div>
    `,
    providers: [QueryList],
    entryComponents:[TabPanel]
})
export class TabView {

    @Input() orientation: string = 'top';

    @Input() style: any;

    @Input() styleClass: string;

    @ContentChildren(TabPanel) tabPanels: QueryList<TabPanel>;


    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    tabs: TabPanel[];

    differ: IterableDiffer;

    @ViewChild('insertion', {read: ViewContainerRef})
    insertion: ViewContainerRef;

    initialized: boolean = false;

    visible: boolean = false;

    constructor(private compiler:Compiler ,private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef, private differs: IterableDiffers, protected el: ElementRef) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterContentInit() {
        this.initTabs();

        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }

    initTabs(): void {
        this.tabs = this.tabPanels.toArray();
        let selectedTab: TabPanel = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            this.tabs[0].selected = true;
        }
    }

    open(event, tab: TabPanel) {
        if (tab.disabled) {
            event.preventDefault();
            return;
        }

        if (!tab.selected) {
            let selectedTab: TabPanel = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false
            }
            tab.selected = true;

            this.onChange.emit({originalEvent: event, index: this.findTabIndex(tab)});
        }

        if(event!=null){
            event.preventDefault();

        }
    }

    close(event, tab: TabPanel) {

    }

    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }

    findTabIndex(tab: TabPanel) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }

    getDefaultHeaderClass(tab: TabPanel) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }

    addTab(tabPanel?: TabPanel) {
        let tab ;
        if (tabPanel && tabPanel.header ) {
             tab = this.tabs.find((tab) =>
                tab.header == tabPanel.header
            )
        }
        if(tab){
            this.open(null,tab);
        }else{
            let factory = this.componentFactoryResolver.resolveComponentFactory(TabPanel);
            const tabRef = this.insertion.createComponent(factory);
            const tabInstance = tabRef.instance;
            if (tabPanel) {
                tabInstance.header = tabPanel.header != undefined ? tabPanel.header : tabInstance.header;
                tabInstance.compModule = tabPanel.compModule != undefined ? tabPanel.compModule : tabInstance.compModule;
                tabInstance.compType = tabPanel.compType != undefined ? tabPanel.compType : tabInstance.compType;
            }
            tabInstance.selected = true;

            this.tabs.push(tabInstance);
            this.findSelectedTab().selected = false;
        }
    }

    ngOnDestroy() {
        this.initialized = false;
    }
}


@NgModule({
    imports: [CommonModule, ],
    exports: [TabView, TabPanel],
    declarations: [TabView, TabPanel]
})
export class TabViewModule {
}