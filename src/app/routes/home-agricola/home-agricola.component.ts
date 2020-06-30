import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ColorsService } from "../../shared/colors/colors.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
import { AdminAgricola } from "../../Services/admin-agricola.service";
import { Chart } from "chart.js";
@Component({
  selector: "app-home-agricola",
  templateUrl: "./home-agricola.component.html",
  styleUrls: ["./home-agricola.component.scss"],
})
export class HomeAgricolaComponent implements OnInit {
  aljson = {};
  DataAgricola = {
    reports_count: 0,
    pathings_count: 0,
    incidences_count: 0,
    resolved_incidences_count: 0,
    unresolved_incidences_count: 0,
  };
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };


  barChartData: any[] = [{ data: [], label: "" }];
  barChartLabels: string[] = [];

  barChartData2: any[] = [
    { data: [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], label: "" },
  ];
  barChartLabels2: string[] = [];
  barChartOptions2: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  lots = [];
  sublote = [];
  itemsSublotes = [];
  lineData = {
    datasets: [{ data: [], label: "" }],
    labels: [""],
  };
  // events
  chartClicked(e: any): void {
    console.log(this.lineData);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  constructor(
    public colors: ColorsService,
    public http: HttpClient,
    public lotService: LotsAgricolaService,
    public AgricolaService: AdminAgricola
  ) {}

  ngOnInit() {
    this.getLot();
  }
  rFactor() {
    return Math.round(Math.random() * 100);
  }
  getChartData(url): Observable<any> {
    return this.http.get(url);
  }
  selectLot(value) {
    this.itemsSublotes = [];
    for (let item of this.sublote) {
      if (value == item.father_field) {
        console.log(item);
        this.itemsSublotes.push(item);
      }
    }
  }
  selectSublot(id) {
    console.log(id);

    if (id === "all") {
    } else {
      this.AgricolaService.Dashboard(id).subscribe((resp) => {
        this.aljson = resp;
        console.log(resp);
        this.DataAgricola = {
          reports_count: resp.reports_count,
          pathings_count: resp.pathings_count,
          incidences_count: resp.incidences_count,
          resolved_incidences_count: resp.resolved_incidences_count,
          unresolved_incidences_count: resp.unresolved_incidences_count,
        };
        this.lineData = resp.incidences_per_name;

        let labels: string[] = [];
        let num = resp.incidences_per_name.barChartLabels.length;
        for (let i = 0; i < num; i++) {
          labels.push(resp.incidences_per_name.barChartLabels[i]);
        }
        let barData = [];
        for (let item of resp.incidences_per_name.barChartData) {
          barData.push(item);
          for ( let item2 of item){
            console.log(item2);
            
          }
        }
        this.lineData = {
          datasets: barData,
          labels: labels,
        };
        console.log(this.lineData);
      });
    }
  }

  getLot() {
    this.lotService.listLots().subscribe((resp) => {
      this.lots = resp;
      let arr = [];
      for (let data of resp) {
        for (let item of data.subfield) {
          arr.push(item);
        }
      }
      this.sublote = arr;
      console.log(resp);
    });
  }
}
