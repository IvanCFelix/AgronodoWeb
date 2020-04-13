import { ActivatedRoute } from '@angular/router';
import { LotsAgricolaService } from './../../Services/lots-agricola.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportsolo',
  templateUrl: './reportsolo.component.html',
  styleUrls: ['./reportsolo.component.scss']
})
export class ReportsoloComponent implements OnInit {

  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const sub = this.route.snapshot.paramMap.get("sub");
    const rut = this.route.snapshot.paramMap.get("rut");
    const rep = this.route.snapshot.paramMap.get("repso");
    console.log(sub);
    console.log(rut);
    console.log(rep);
    
    this.LotsService.GetReportSolo(sub,rut,rep).subscribe((resp:any) => {
      console.log(resp);
      
    })
    


    
  }

}
