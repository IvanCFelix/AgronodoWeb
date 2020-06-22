import { Component, OnInit } from "@angular/core";
import { ColorsService } from "../../shared/colors/colors.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
import { AdminAgricola } from "../../Services/admin-agricola.service";

@Component({
  selector: "app-home-agricola",
  templateUrl: "./home-agricola.component.html",
  styleUrls: ["./home-agricola.component.scss"],
})
export class HomeAgricolaComponent implements OnInit {
  DataAgricola = {
    reports_count: 0,
    pathings_count: 0,
    incidences_count: 0,
    resolved_incidences_count: 0,
    unresolved_incidences_count: 0
  };
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartType: string = "line";
  barChartLegend: boolean = true;

  barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
  ];
  barChartLabels: string[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
  ];

  barChartType2: string = "bar";
  barChartLegend2: boolean = true;

  barChartData2: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
  ];
  barChartOptions2: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartLabels2: string[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
  ];
  lots = [];
  sublote = [];
  itemsSublotes = [];
  // events
  chartClicked(e: any): void {
    console.log(e);
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
    
    if (id === 'all') {
      
    } else {
      this.AgricolaService.Dashboard(id).subscribe((resp) => {
        console.log(resp);
        this.DataAgricola = {
          reports_count: resp.reports_count,
          pathings_count: resp.pathings_count,
          incidences_count: resp.incidences_count,
          resolved_incidences_count: resp.resolved_incidences_count,
          unresolved_incidences_count: resp.unresolved_incidences_count,
        };
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
    });
  }
}
