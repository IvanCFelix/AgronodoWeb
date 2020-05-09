import { Uris } from './../../Services/Uris';
import { ActivatedRoute } from '@angular/router';
import { LotsAgricolaService } from './../../Services/lots-agricola.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-reportsolo',
  templateUrl: './reportsolo.component.html',
  styleUrls: ['./reportsolo.component.scss']
})
export class ReportsoloComponent implements OnInit {
  data: any = {}
  public myInterval: number = 5000;
  url = Uris.API_ENDPOINT
  video: any = []
  lote;
  sub;
  rut;
  agriculturalIncidence: any = {}
  img;
  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute,
    public router:Location
  ) { }

  ngOnInit() {
    const lot = this.route.snapshot.paramMap.get("lot");
    const sub = this.route.snapshot.paramMap.get("sub");
    const rut = this.route.snapshot.paramMap.get("rut");
    const rep = this.route.snapshot.paramMap.get("repso");
    this.lote = lot;
    this.sub = sub;
    this.rut = rut;
    console.log(sub);
    console.log(rut);
    console.log(rep);

    this.LotsService.GetReportSolo(sub, rut, rep).subscribe((resp: any) => {
      console.log(resp);
      const img = resp.images
      this.data = resp      
      if(resp.images.length == 0){
        
      }else{
        this.img = img[0].image
        console.log(this.img);
        
      }
      this.agriculturalIncidence = resp.incidence.agriculturalIncidence
      this.video = resp.videos
      console.log();


    })
  }
  imagen(value) {
    this.img = value.image
  }
  goback() {
  this.router.back();
  }

}
