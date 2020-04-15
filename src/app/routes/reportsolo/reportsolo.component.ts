import { Uris } from './../../Services/Uris';
import { ActivatedRoute } from '@angular/router';
import { LotsAgricolaService } from './../../Services/lots-agricola.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportsolo',
  templateUrl: './reportsolo.component.html',
  styleUrls: ['./reportsolo.component.scss']
})
export class ReportsoloComponent implements OnInit {
  data:any = {}
  url = Uris.API_ENDPOINT
  video:any = []
  lote;
  sub;
  rut;
  agriculturalIncidence:any = {}
  
  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute
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
    
    this.LotsService.GetReportSolo(sub,rut,rep).subscribe((resp:any) => {
      console.log(resp);
      this.data = resp
      this.agriculturalIncidence = resp.incidence.agriculturalIncidence
      this.video = resp.videos
      console.log();
     
    
  })
}
  
}
