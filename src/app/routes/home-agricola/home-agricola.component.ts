import { Component, OnInit, ViewChild } from "@angular/core";
import { ColorsService } from "../../shared/colors/colors.service";
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
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("barCanavas") barCanvas;

  lineChart: any;
  barChart: any;
  public chart: any = null;
  private intervalUpdate: any = null;
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

  constructor(
    public colors: ColorsService,
    public http: HttpClient,
    public lotService: LotsAgricolaService,
    public AgricolaService: AdminAgricola
  ) {}
  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }
  ngOnInit() {
    this.intervalUpdate = setInterval(function () {}.bind(this), 700);
    this.getLot();
    this.allData();
  }
  rFactor() {
    return Math.round(Math.random() * 100);
  }
  allData() {
    this.AgricolaService.DashboardHome().subscribe((resp) => {
      console.log(resp);
      this.DataAgricola = {
        reports_count: resp.reports_count,
        pathings_count: resp.pathings_count,
        incidences_count: resp.incidences_count,
        resolved_incidences_count: resp.resolved_incidences_count,
        unresolved_incidences_count: resp.unresolved_incidences_count,
      };
      this.lineChartData(
        resp.incidences_per_name.barChartLabels,
        resp.incidences_per_name.barChartData
      );
        this.BarChartData(
          resp.incidences_per_time.barChartLabels,
          resp.incidences_per_time.barChartData
        );
    });
  }
  labels(value: string[]) {
    return value;
  }
  selectLot(value) {
    if (value === "all") {
      this.allData();
    } else {
      this.itemsSublotes = [];
      for (let item of this.sublote) {
        if (value == item.father_field) {
          console.log(item);
          this.itemsSublotes.push(item);
        }
      }
    }
  }
  selectSublot(id) {
    if (id === "all") {
      this.allData();
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
        this.lineChartData(
          resp.incidences_per_name.barChartLabels,
          resp.incidences_per_name.barChartData
        );
          this.BarChartData(
            resp.incidences_per_time.barChartLabels,
            resp.incidences_per_time.barChartData
          );
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

  lineChartData(labels, datasets) {
    let obj: any = {
      label: datasets[0].label,
      fill: true,
      lineTension: 0.1,
      backgroundColor: this.colores(0.2),
      borderColor: this.colores(0.8),
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: this.colores(0.8),
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: this.colores(0.8),
      pointHoverBorderColor: this.colores(0.8),
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: datasets[0].data,
      spanGaps: false,
    };

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: labels,
        datasets: [obj],
      },
    });
  }
  BarChartData(labels, datasets) {
    let obj: any = {
      label: datasets[0].label,
      fill: true,
      lineTension: 0.1,
      backgroundColor: this.colores(0.5),
      borderColor: this.colores(0.4),
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: this.colores(0.8),
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: this.colores(0.8),
      pointHoverBorderColor: this.colores(0.8),
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: datasets[0].data,
      spanGaps: false,
    };

       this.barChart = new Chart(this.barCanvas.nativeElement, {
         type: "bar",
         data: {
           labels: labels,
           datasets: [obj],
         },
       });
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  colores(opacity) {
    return `rgba(${[
      this.getRandom(0, 255),
      this.getRandom(0, 255),
      this.getRandom(0, 255),
      opacity,
    ].join(",")})`;
  }
}
