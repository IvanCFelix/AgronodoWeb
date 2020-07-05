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

  lineChart: any = {};
  barChart: any = {};
  aljson = {};
  DataAgricola = {
    reports_count: 0,
    pathings_count: 0,
    incidences_count: 0,
    resolved_incidences_count: 0,
    unresolved_incidences_count: 0,
  };
  lots = [];
  sublote = [];
  idsublote;
  itemsSublotes = [];

  constructor(
    public colors: ColorsService,
    public http: HttpClient,
    public lotService: LotsAgricolaService,
    public AgricolaService: AdminAgricola
  ) {}
  ngAfterContentInit(): void {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
    });
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: [],
        datasets: [],
      },
    });
  }
  ngOnInit() {
    this.getLot();
    this.allData();
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
        resp.incidences_per_time.barChartLabels,
        resp.incidences_per_time.barChartData
      );
      this.BarChartData(
        resp.incidences_per_name.barChartLabels,
        resp.incidences_per_name.barChartData
      );
    });
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
    this.idsublote = id;
    if (id === "all") {
      this.allData();
    } else {
      this.AgricolaService.Dashboard(id).subscribe((resp) => {
        this.aljson = resp;
        this.DataAgricola = {
          reports_count: resp.reports_count,
          pathings_count: resp.pathings_count,
          incidences_count: resp.incidences_count,
          resolved_incidences_count: resp.resolved_incidences_count,
          unresolved_incidences_count: resp.unresolved_incidences_count,
        };

        this.lineChartData(
          resp.incidences_per_time.barChartLabels,
          resp.incidences_per_time.barChartData
        );
        this.BarChartData(
          resp.incidences_per_name.barChartLabels,
          resp.incidences_per_name.barChartData
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
    });
  }

  lineChartData(labels, datasets) {
    let activos: any = {
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
    let inactivos: any = {
      label: datasets[1].label,
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
      data: datasets[1].data,
      spanGaps: false,
    };
    this.SetDataChart(labels, activos, inactivos, "line");
  }
  SetDataChart(labels, activos, inactivos, type) {
    switch (type) {
      case "line":
        this.lineChart.data.labels = [];
        this.lineChart.data.datasets = [];
        this.lineChart.data.datasets = [];
        this.lineChart.data.labels = labels;
        this.lineChart.data.datasets.push(activos);
        this.lineChart.data.datasets.push(inactivos);
        this.lineChart.update();
        break;
      case "bar":
        this.barChart.data.labels = [];
        this.barChart.data.datasets = [];
        this.barChart.data.datasets = [];
        this.barChart.data.labels = labels;
        this.barChart.data.datasets.push(activos);
        this.barChart.data.datasets.push(inactivos);
        this.barChart.update();
        break;
      default:
        break;
    }
  }
  BarChartData(labels, datasets) {
    let activos: any = {
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
      spanGaps: true,
    };
    let inactivos: any = {
      label: datasets[1].label,
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
      data: datasets[1].data,
      spanGaps: false,
    };
    this.SetDataChart(labels, activos, inactivos, "bar");
    console.log(this.barChart);
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
  selectTime(value) {
    if (this.idsublote) {
      this.AgricolaService.DashboardHomeDATE(this.idsublote, value).subscribe(
        (resp) => {
          this.aljson = resp;
          this.DataAgricola = {
            reports_count: resp.reports_count,
            pathings_count: resp.pathings_count,
            incidences_count: resp.incidences_count,
            resolved_incidences_count: resp.resolved_incidences_count,
            unresolved_incidences_count: resp.unresolved_incidences_count,
          };
          if (resp.incidences_per_year) {
            this.lineChartData(
              resp.incidences_per_year.barChartLabels,
              resp.incidences_per_year.barChartData
            );
            this.BarChartData(
              resp.incidences_per_name.barChartLabels,
              resp.incidences_per_name.barChartData
            );
          }
          if (resp.incidences_per_time) {
            this.lineChartData(
              resp.incidences_per_time.barChartLabels,
              resp.incidences_per_time.barChartData
            );
            this.BarChartData(
              resp.incidences_per_name.barChartLabels,
              resp.incidences_per_name.barChartData
            );
          }
          if (resp.incidences_per_week) {
            this.lineChartData(
              resp.incidences_per_week.barChartLabels,
              resp.incidences_per_week.barChartData
            );
            this.BarChartData(
              resp.incidences_per_name.barChartLabels,
              resp.incidences_per_name.barChartData
            );
          }
        }
      );
    } else {
      if (value === "all") {
      } else {
        this.AgricolaService.DashboardHomeInitialDate(value).subscribe(
          (resp) => {
            this.aljson = resp;
            this.DataAgricola = {
              reports_count: resp.reports_count,
              pathings_count: resp.pathings_count,
              incidences_count: resp.incidences_count,
              resolved_incidences_count: resp.resolved_incidences_count,
              unresolved_incidences_count: resp.unresolved_incidences_count,
            };
            if (resp.incidences_per_year) {
              this.lineChartData(
                resp.incidences_per_year.barChartLabels,
                resp.incidences_per_year.barChartData
              );
              this.BarChartData(
                resp.incidences_per_name.barChartLabels,
                resp.incidences_per_name.barChartData
              );
            }
            if (resp.incidences_per_time) {
              this.lineChartData(
                resp.incidences_per_time.barChartLabels,
                resp.incidences_per_time.barChartData
              );
              this.BarChartData(
                resp.incidences_per_name.barChartLabels,
                resp.incidences_per_name.barChartData
              );
            }
            if (resp.incidences_per_week) {
              this.lineChartData(
                resp.incidences_per_week.barChartLabels,
                resp.incidences_per_week.barChartData
              );
              this.BarChartData(
                resp.incidences_per_name.barChartLabels,
                resp.incidences_per_name.barChartData
              );
            }
          }
        );
      }
    }
  }
}
