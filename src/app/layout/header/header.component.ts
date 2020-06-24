import { Component, OnInit, ViewChild } from "@angular/core";
const screenfull = require("screenfull");

import { UserblockService } from "../sidebar/userblock/userblock.service";
import { SettingsService } from "../../core/settings/settings.service";
import { MenuService } from "../../core/menu/menu.service";
import { Router } from '@angular/router';
import { AgricolaAgronodo } from "../../Services/agricola-agronodo.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  navCollapsed = true; // for horizontal layout
  menuItems = []; // for horizontal layout
  user: any;
  isNavSearchVisible: boolean;
  @ViewChild("fsbutton") fsbutton; // the fullscreen button

  constructor(
    public menu: MenuService,
    public userblockService: UserblockService,
    public settings: SettingsService,
    private router: Router,
    public admin: AgricolaAgronodo
  ) {
    router.events.subscribe((res) => {
      this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
    });

    // show only a few items on demo
  }

  ngOnInit() {
    this.isNavSearchVisible = false;

  }

  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    // console.log(stat);
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.toggleLayoutSetting("offsidebarOpen");
  }

  toggleCollapsedSideabar() {
    this.settings.toggleLayoutSetting("isCollapsed");
  }

  isCollapsedText() {
    return this.settings.getLayoutSetting("isCollapsedText");
  }

  toggleFullScreen(event) {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  logout() {
    
    this.admin.logout().subscribe(resp => {
    }, err => {        
    })
  }
}
