(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"+oF+":function(t,n,e){"use strict";e("ItAH"),e("Xfwv"),e("pE7p");var o=e("W+o+");e.d(n,"a",function(){return o.a}),e("TRX7"),e("/wl/"),e("1NRv")},C0gF:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var o=e("sE5F"),r=(e("BuZO"),e("h4Xa")),u=e("CcnG"),i=function(){function t(t){this.http=t,this.token=localStorage.getItem("token")}return t.prototype.register=function(t){return this.http.post(""+r.a.API_ADMIN_AGRICOLA,t,this.jwt()).map(function(t){return t.json()})},t.prototype.listadmin=function(){return this.http.get(""+r.a.API_ADMIN_AGRICOLA,this.jwt()).map(function(t){return t.json()})},t.prototype.getadmin=function(t){return this.http.get(""+r.a.API_ADMIN_AGRICOLA+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.delete=function(t){return this.http.delete(""+r.a.API_ADMIN_AGRICOLA+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.edit=function(t,n){return this.http.patch(""+r.a.API_ADMIN_AGRICOLA+n.user.username+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.Dashboard=function(t){return this.http.get(""+r.a.DASHBORARD+t,this.jwt()).map(function(t){return t.json()})},t.prototype.errorHandler=function(t){console.log("SUPER ERROR",t),localStorage.getItem("token")&&401==t.status&&localStorage.removeItem("token")},t.prototype.jwt=function(){if(this.token){var t=new o.d;return JSON.parse(localStorage.getItem("USER")),t.append("Content-Type","application/json"),t.append("Accept-Language","es"),t.append("Authorization","token "+this.token),new o.g({headers:t})}},t.ngInjectableDef=u.defineInjectable({factory:function(){return new t(u.inject(o.e))},token:t,providedIn:"root"}),t}()},Esh0:function(t,n,e){"use strict";e.d(n,"a",function(){return u}),e.d(n,"b",function(){return p});var o=e("CcnG"),r=e("Ip0R"),u=(e("Xfwv"),o["\u0275crt"]({encapsulation:2,styles:[],data:{}}));function i(t){return o["\u0275vid"](0,[(t()(),o["\u0275eld"](0,0,null,null,0,"input",[["accept","image/*"],["type","file"]],null,[[null,"change"]],function(t,n,e){var o=!0;return"change"===n&&(o=!1!==t.component.fileChangeListener(e)&&o),o},null,null))],null,null)}function p(t){return o["\u0275vid"](0,[o["\u0275qud"](402653184,1,{cropcanvas:0}),(t()(),o["\u0275eld"](1,0,null,null,3,"span",[["class","ng2-imgcrop"]],null,null,null,null,null)),(t()(),o["\u0275and"](16777216,null,null,1,null,i)),o["\u0275did"](3,16384,null,0,r.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),o["\u0275eld"](4,0,[[1,0],["cropcanvas",1]],null,0,"canvas",[],null,[[null,"mousedown"],[null,"mouseup"],[null,"mousemove"],[null,"mouseleave"],[null,"touchmove"],[null,"touchend"],[null,"touchstart"]],function(t,n,e){var o=!0,r=t.component;return"mousedown"===n&&(o=!1!==r.onMouseDown(e)&&o),"mouseup"===n&&(o=!1!==r.onMouseUp(e)&&o),"mousemove"===n&&(o=!1!==r.onMouseMove(e)&&o),"mouseleave"===n&&(o=!1!==r.onMouseUp(e)&&o),"touchmove"===n&&(o=!1!==r.onTouchMove(e)&&o),"touchend"===n&&(o=!1!==r.onTouchEnd(e)&&o),"touchstart"===n&&(o=!1!==r.onTouchStart(e)&&o),o},null,null))],function(t,n){t(n,3,0,!n.component.settings.noFileInput)},null)}},Kcyw:function(t,n,e){"use strict";e.d(n,"a",function(){return o});var o=function(){function t(){}return t.cannotContainSpace=function(t){return t.value.indexOf(" ")>=0?{cannotContainSpace:!0}:null},t}()},S1FE:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var o=e("sE5F"),r=(e("BuZO"),e("h4Xa")),u=e("CcnG"),i=function(){function t(t){this.http=t,this.token=localStorage.getItem("token")}return t.prototype.register=function(t){return this.http.post(""+r.a.API_ADMIN_ENGINEER_AGRICOLA,t,this.jwt()).map(function(t){return t.json()})},t.prototype.listadmin=function(){return this.http.get(""+r.a.API_ADMIN_ENGINEER_AGRICOLA,this.jwt()).map(function(t){return t.json()})},t.prototype.getadmin=function(t){return this.http.get(""+r.a.API_ADMIN_ENGINEER_AGRICOLA+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.delete=function(t){return this.http.delete(""+r.a.API_ADMIN_ENGINEER_AGRICOLA+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.edit=function(t,n){return this.http.patch(""+r.a.API_ADMIN_ENGINEER_AGRICOLA+n.user.username+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.errorHandler=function(t){console.log("SUPER ERROR",t),localStorage.getItem("token")&&401==t.status&&localStorage.removeItem("token")},t.prototype.jwt=function(){if(this.token){var t=new o.d;return t.append("Content-Type","application/json"),t.append("Accept-Language","es"),t.append("Authorization","token "+this.token),new o.g({headers:t})}},t.ngInjectableDef=u.defineInjectable({factory:function(){return new t(u.inject(o.e))},token:t,providedIn:"root"}),t}()},"Sr6/":function(t,n,e){"use strict";e("CcnG"),e("7W/L"),e("Akrg"),e("gISi"),e("TXfF"),e("Q5AY"),e("kevW"),e("j5V/"),e("+YG4"),e("AS99"),e("N59q"),e("HmJj"),e("jeoQ"),e("jJjB"),e("6bMv"),e("zKQG"),e("3FdN"),e("fNGB"),e("y+xJ"),e("4Jtj"),e("rX1C"),e("Ry/H"),e("Izlp"),e("D2gF"),e("/fSM"),e.d(n,"a",function(){return o});var o=function(){function t(){}return t.forRoot=function(){return{ngModule:t}},t}()},UAJp:function(t,n,e){"use strict";e.d(n,"a",function(){return i}),e("BuZO");var o=e("sE5F"),r=e("h4Xa"),u=e("CcnG"),i=function(){function t(t){this.http=t,this.token=localStorage.getItem("token")}return t.prototype.register=function(t){return this.http.post(""+r.a.API_LOTS,t,this.jwt()).map(function(t){return t.json()})},t.prototype.listLots=function(){return this.http.get(""+r.a.API_LOTS,this.jwt()).map(function(t){return t.json()})},t.prototype.getLot=function(t){return this.http.get(""+r.a.API_LOTS+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.delete=function(t){return this.http.delete(""+r.a.API_LOTS+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.edit=function(t,n){return this.http.put(""+r.a.API_LOTS+n+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.deleteSub=function(t){return this.http.delete(""+r.a.API_SUB_LOTS+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.SubloteRegister=function(t){return this.http.post(""+r.a.API_SUB_LOTS,t,this.jwt()).map(function(t){return t.json()})},t.prototype.EditSublote=function(t,n){return this.http.put(""+r.a.API_SUB_LOTS+n+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.GetSublot=function(){return this.http.get(""+r.a.API_SUB_LOTS,this.jwt()).map(function(t){return t.json()})},t.prototype.GetSubloteID=function(t){return this.http.get(""+r.a.API_SUB_LOTS+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.CicleRegister=function(t,n){return this.http.post(""+r.a.API_CICLE+t+"/cicles/",n,this.jwt()).map(function(t){return t.json()})},t.prototype.GetCicleid=function(t){return this.http.get(""+r.a.API_CICLE+t+"/pathingsweeks/",this.jwt()).map(function(t){return t.json()})},t.prototype.GetReportListid=function(t,n){return this.http.get(""+r.a.API_CICLE+t+"/pathings/"+n+"/reports",this.jwt()).map(function(t){return t.json()})},t.prototype.GetListPathingsID=function(t,n){return this.http.get(""+r.a.API_CICLE+t+"/pathings/"+n,this.jwt()).map(function(t){return t.json()})},t.prototype.GetListPathingsList=function(t){return this.http.get(""+r.a.API_CICLE+t+"/pathings/",this.jwt()).map(function(t){return t.json()})},t.prototype.GetReportSolo=function(t,n,e){return this.http.get(""+r.a.API_CICLE+t+"/pathings/"+n+"/reports/"+e+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.Getcrops=function(){return this.http.get(""+r.a.API_CROPS_LIST_GET,this.jwt()).map(function(t){return t.json()})},t.prototype.registerCrops=function(t){return this.http.post(""+r.a.API_CROPS_LIST_GET,t,this.jwt()).map(function(t){return t.json()})},t.prototype.errorHandler=function(t){console.log("SUPER ERROR",t),localStorage.getItem("token")&&401==t.status&&localStorage.removeItem("token")},t.prototype.jwt=function(){if(this.token){var t=new o.d;return t.append("Content-Type","application/json"),t.append("Accept-language","en-es"),t.append("Authorization","token "+this.token),new o.g({headers:t})}},t.ngInjectableDef=u.defineInjectable({factory:function(){return new t(u.inject(o.e))},token:t,providedIn:"root"}),t}()},kwFv:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var o=e("sE5F"),r=(e("BuZO"),e("h4Xa")),u=e("CcnG"),i=function(){function t(t){this.http=t,this.token=localStorage.getItem("token")}return t.prototype.register=function(t){return this.http.post(""+r.a.API_ENGINEER,t,this.jwt()).map(function(t){return t.json()})},t.prototype.listadmin=function(){return this.http.get(""+r.a.API_ENGINEER,this.jwt()).map(function(t){return t.json()})},t.prototype.getadmin=function(t){return this.http.get(""+r.a.API_ENGINEER+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.delete=function(t){return this.http.delete(""+r.a.API_ENGINEER+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.edit=function(t,n){return this.http.patch(""+r.a.API_ENGINEER+n.user.username+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.listSubfield=function(){return this.http.get(""+r.a.API_CICLE,this.jwt()).map(function(t){return t.json()})},t.prototype.listField=function(){return this.http.get(""+r.a.API_LOTS,this.jwt()).map(function(t){return t.json()})},t.prototype.getSubloteID=function(t){return this.http.get(""+r.a.API_SUB_LOTS+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.getLoteID=function(t){return this.http.get(""+r.a.API_LOTS+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.registerTask=function(t,n){return this.http.post(""+r.a.API_TASK_POST+n+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.getTask=function(t){return this.http.get(""+r.a.API_TASK+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.editTask=function(t){return this.http.patch(""+r.a.API_TASK+t.id+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.errorHandler=function(t){console.log("SUPER ERROR",t),localStorage.getItem("token")&&401==t.status&&localStorage.removeItem("token")},t.prototype.jwt=function(){if(this.token){var t=new o.d;return t.append("Content-Type","application/json"),t.append("Accept-Language","es"),t.append("Authorization","token "+this.token),new o.g({headers:t})}},t.ngInjectableDef=u.defineInjectable({factory:function(){return new t(u.inject(o.e))},token:t,providedIn:"root"}),t}()},uaGE:function(t,n,e){"use strict";e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u});var o=e("CcnG"),r=(e("3FdN"),e("jeoQ"),e("zKQG"),e("jJjB"),e("6bMv"),e("y+xJ"),e("fNGB"),e("4Jtj"),e("rX1C"),e("Izlp"),e("D2gF"),e("7W/L"),o["\u0275crt"]({encapsulation:0,styles:[".agm-map-container-inner[_ngcontent-%COMP%] {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content[_ngcontent-%COMP%] {\n      display:none;\n    }"],data:{}}));function u(t){return o["\u0275vid"](0,[(t()(),o["\u0275eld"](0,0,null,null,0,"div",[["class","agm-map-container-inner sebm-google-map-container-inner"]],null,null,null,null,null)),(t()(),o["\u0275eld"](1,0,null,null,1,"div",[["class","agm-map-content"]],null,null,null,null,null)),o["\u0275ncd"](null,0)],null,null)}},vfAp:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var o=e("sE5F"),r=(e("BuZO"),e("h4Xa")),u=e("CcnG"),i=function(){function t(t){this.http=t,this.token=localStorage.getItem("token")}return t.prototype.register=function(t){return this.http.post(""+r.a.API_INCIDENCES,t,this.jwt()).map(function(t){return t.json()})},t.prototype.list=function(){return this.http.get(r.a.API_INCIDENCES+"list",this.jwt()).map(function(t){return t.json()})},t.prototype.listBydate=function(t){return this.http.get(""+r.a.API_INCIDENCES_BYDATE+t,this.jwt()).map(function(t){return t.json()})},t.prototype.listBybyrisk=function(t){return this.http.get(""+r.a.API_INCIDENCES_BYRISK+t,this.jwt()).map(function(t){return t.json()})},t.prototype.listIncidenceSearch=function(t){return this.http.get(""+r.a.API_INCIDENCES_SEARCH+t,this.jwt()).map(function(t){return t.json()})},t.prototype.getIncidenceId=function(t){return this.http.get(""+r.a.API_INCIDENCES+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.delete=function(t){return this.http.delete(""+r.a.API_INCIDENCES+t+"/",this.jwt()).map(function(t){return t.json()})},t.prototype.edit=function(t,n){return this.http.patch(""+r.a.API_INCIDENCES+n.user.username+"/",t,this.jwt()).map(function(t){return t.json()})},t.prototype.errorHandler=function(t){console.log("SUPER ERROR",t),localStorage.getItem("token")&&401==t.status&&localStorage.removeItem("token")},t.prototype.jwt=function(){if(this.token){var t=new o.d;return t.append("Content-Type","application/json"),t.append("Accept-Language","es"),t.append("Authorization","token "+this.token),new o.g({headers:t})}},t.ngInjectableDef=u.defineInjectable({factory:function(){return new t(u.inject(o.e))},token:t,providedIn:"root"}),t}()}}]);