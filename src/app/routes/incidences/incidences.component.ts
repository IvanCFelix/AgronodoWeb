import { Component, OnInit, ViewChild } from '@angular/core';
import { Incidences } from '../../Services/Incidences.service';
import { LotsAgricolaService } from '../../Services/lots-agricola.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: "app-incidences",
  templateUrl: "./incidences.component.html",
  styleUrls: ["./incidences.component.scss"],
})
export class IncidencesComponent implements OnInit {
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  Incidencesbydate = [];
  byrisk = [];
  Incidences = [];
  temp:any = [];
  order = "asc";
  orderincidence = "asc";
  typeIncidence = "";
  field;
  lots;
  status = true;
  Inputorderbyrisk = "desc";
  timeout: any;
  constructor(
    public IncidenceService: Incidences,
    public lotService: LotsAgricolaService
  ) {}
 
  ngOnInit() {
    this.orderIncidence(this.order);
    this.orderbyrisk(this.Inputorderbyrisk);
    this.listIncidences();
    this.listLots();
  }

  changeOrderIncidence(event) {
    this.orderIncidence(event);
  }
  orderIncidence(value) {
    this.Incidencesbydate = [];
    this.IncidenceService.listBydate(`?order=${value}`).subscribe((resp) => {
      let res = resp;
      for (let i = 0; i < 3; i++) {
        let item = res[i];
        this.Incidencesbydate.push(item);
      }
    });
  }
  changeOrderbyrisk(event) {
    this.orderbyrisk(event);
  }
  orderbyrisk(value) {
    this.byrisk = [];
    this.IncidenceService.listBybyrisk(`?order=${value}`).subscribe((resp) => {
      let res = resp;
      for (let i = 0; i < 3; i++) {
        let item = res[i];
        this.byrisk.push(item);
      }
    });
  }
  listIncidences() {
    this.IncidenceService.list().subscribe((resp) => {
      this.Incidences = resp;
           this.temp = resp;
    });
  }
  listLots() {
    this.lotService.listLots().subscribe((resp) => {
      this.lots = resp;
    });
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {}, 100);
  }
  SearchIncidence(type, field, status, orderincidence) {
    this.orderincidence = orderincidence;
    this.typeIncidence = type;
    this.field = field;
    this.status = status;
    console.log(field);

    this.IncidenceService.listIncidenceSearch(
      `?type=${this.typeIncidence}&field=${this.field}&isActive=${this.status}&order=${this.orderincidence}`
    ).subscribe((resp) => {
      this.Incidences = resp;
      console.log(resp);
    });
  }
}
