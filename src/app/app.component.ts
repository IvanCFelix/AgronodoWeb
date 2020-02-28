import { Menu } from './routes/menu';
import { Router,NavigationStart } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { MenuService } from './core/menu/menu.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.getLayoutSetting('isFixed'); };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.getLayoutSetting('isCollapsed'); };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.getLayoutSetting('isBoxed'); };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.getLayoutSetting('useFullLayout'); };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.getLayoutSetting('hiddenFooter'); };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.getLayoutSetting('horizontal'); };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.getLayoutSetting('isFloat'); };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.getLayoutSetting('offsidebarOpen'); };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.getLayoutSetting('asideToggled'); };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.getLayoutSetting('isCollapsedText'); };

    constructor(public settings: SettingsService, public route:Router,public menuService:MenuService) { 

        this.route.events.forEach( event => {
            if(event instanceof NavigationStart){
                let user:any = <any>JSON.parse(localStorage.getItem("USER"));
                if(user){
                    let role =  user.user_type;
                    let menu = Menu.menu(role)
                    this.menuService.addMenu(menu)
                }else{
                    console.log("no hay nada");
                    
                }
                }
                
            
        })

    }

    ngOnInit() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') e.preventDefault();
        })
    }
}
