import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    menuItems: Array<any>;
    public status: any = false;

    constructor() {
        this.menuItems = [];
    }

    addMenu(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {
        let current;
        let equal = false;
    }
    push(value){
        this.menuItems = value
    }
    //     for(let i = 0; i < items.length; i++){
    //         if(this.menuItems.length == 0){
    //             this.menuItems = [items[i]]
    //         }else{
    //             for(let j=0; j < this.menuItems.length; j++){
    //                 if(this.menuItems[j].text != items[i].text){
    //                     this.status = true;
    //                 }else{
    //                     this.status = false;
    //                     break;
    //                 }
    //             }
    //         }
    //         if(this.status == true){
    //             this.menuItems.push(items[i]);
    //         }
          
    //     }
    //     for(let a = 0; a < this.menuItems.length; a++){
    //         current = this.menuItems[a];
    //         equal = false;
    //         for(let b = 0; b < items.length; b++){
    //             if(this.menuItems[a].text == items[b].text){
    //                 if(!equal){
    //                     if(this.menuItems[a].text == items[b].text){
    //                         equal = true;
    //                     }
    //                 }
    //             }
    //         }
    //         if(!equal){
    //             this.menuItems.splice(a);
    //         }
    //     }
    // }

    getMenu() {
        return this.menuItems;
    }

}
