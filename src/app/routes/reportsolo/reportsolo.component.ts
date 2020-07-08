import { Uris } from './../../Services/Uris';
import { ActivatedRoute } from '@angular/router';
import { LotsAgricolaService } from './../../Services/lots-agricola.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-reportsolo",
  templateUrl: "./reportsolo.component.html",
  styleUrls: ["./reportsolo.component.scss"],
})
export class ReportsoloComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ["atras", "siguiente"],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  data: any = {};
  public myInterval: number = 5000;
  public slides: Array<any> = [];
  public noWrapSlides: boolean = false;
  url = Uris.API_ENDPOINT;
  video: any = [];
  sub;
  rut;
  agriculturalIncidence: any = [];
  TecnicaIncidence: any = [];

  img;

  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute,
    public router: Location
  ) {}

  ngOnInit() {
    const sub = this.route.snapshot.paramMap.get("sub");
    const rut = this.route.snapshot.paramMap.get("rut");
    const rep = this.route.snapshot.paramMap.get("repso");

    this.LotsService.GetReportSolo(sub, rut, rep).subscribe((resp: any) => {
      console.log(resp);
      const img = resp.images;
      this.slides = resp.images;
      this.data = resp;
      if (resp.images.length == 0) {
      } else {
        this.img = img[0].image;
      }
      this.agriculturalIncidence = resp.incidence.agriculturalIncidence;
      this.TecnicaIncidence = resp.incidence.technicalIncidence;
      console.log(this.TecnicaIncidence);
      
      this.video = resp.videos;
      console.log(resp.videos);
    });
  }
  imagen(value) {
    this.img = value;
  }
  goback() {
    return this.router.back();
  }
}
