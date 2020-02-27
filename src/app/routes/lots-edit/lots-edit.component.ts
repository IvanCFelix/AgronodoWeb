import { BsModalService } from "ngx-bootstrap/modal";
import { UsernameValidator } from "./../../validators/UsernameValidator ";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import Swal from "sweetalert2";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
declare const google: any;

@Component({
  selector: "app-lots-edit",
  templateUrl: "./lots-edit.component.html",
  styleUrls: ["./lots-edit.component.scss"]
})
export class LotsEditComponent implements OnInit {
  lotesForms: FormGroup;
  sublotesforms: FormGroup;
  example: any = [];
  mostrar: boolean = true;
  id;
  sublotearray = [];

  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  polygon: any;
  scrollwheel = false;
  newpaths = [];
  pathsSubLotes = [];
  paths = [];
  nestedPaths = [
    //   [
    //   { lat: 25.80317630952905, lng: -108.98491032228453 },
    //   { lat: 25.801746752090914, lng: -108.98598320589049 },
    //   { lat: 25.79966034001631, lng: -108.98233540163024 },
    //   { lat: 25.801012648326893, lng: -108.9811766873358 }
    //   ],[
    //   { lat: 25.81224822827475, lng: -108.98349946020446 },
    //   { lat: 25.81417988733787, lng: -108.98959343908629 },
    //   { lat: 25.811398288307792, lng: -108.99216835974059 },
    //   { lat: 25.808500719863055, lng: -108.98663228033385 }
    // ]
  ];

  selectedMarker;
  constructor(
    private modalService: BsModalService,
    public router: Router,
    private route: ActivatedRoute,
    public lotService: LotsAgricolaService
  ) {
    this.lotesForms = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
    this.sublotesforms = new FormGroup({
      nickname: new FormControl("", Validators.required),
      agriculture_type: new FormControl("", Validators.required),
      start_date: new FormControl(Date, Validators.required),
      finish_date: new FormControl(Date, Validators.required),
      TypeL: new FormControl("", Validators.required)
    });
  }

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"]
    },
    polygonOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: "polygon"
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.lotService.getLot(id).subscribe((resp: any) => {
        this.sublotearray = resp.subfield;
        this.newpaths = resp.coordinates;
        console.log(resp);
        let obj = [
          { lat: 25.80317630952905, lng: -108.98491032228453 },
          { lat: 25.801746752090914, lng: -108.98598320589049 },
          { lat: 25.79966034001631, lng: -108.98233540163024 },
          { lat: 25.801012648326893, lng: -108.9811766873358 }
        ];

        // this.example = resp.coordinates
        // let newArray = this.newpaths.map( item => {})

        // this.newpaths = newArray
        // console.log(newArray)

        //  for (let i = 0; i < this.example.length; i++) {
        //     this.newpaths.push({i})

        // }
        // for(let item of resp.coordinates){

        // }
        //si jala
        // this.example.map( item => {
        // })
        // console.log(this.example);

        // this.newpaths = resp.coordinates

        // const uwu =  Object.values(resp.coordinates)
        // console.log(uwu)
        // this.newpaths =resp.coordinates

        //   this.photo = resp.photo;
        //   this.mostrar = false;

        this.lotesForms.setValue({
          name: resp.name
        });
      });
    }
  }
  clear() {
    this.newpaths = [];
  }
  savepath() {
    if (this.mostrar == true) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
  }
  pol() {
    console.log(this.newpaths);
    this.pathsSubLotes = [];
    let obj = [
      [
        { lat: 25.80317630952905, lng: -108.98491032228453 },
        { lat: 25.801746752090914, lng: -108.98598320589049 },
        { lat: 25.79966034001631, lng: -108.98233540163024 },
        { lat: 25.801012648326893, lng: -108.9811766873358 }
      ],
      [
        { lat: 25.81224822827475, lng: -108.98349946020446 },
        { lat: 25.81417988733787, lng: -108.98959343908629 },
        { lat: 25.811398288307792, lng: -108.99216835974059 },
        { lat: 25.808500719863055, lng: -108.98663228033385 }
      ]
    ];
    this.nestedPaths.push(obj);

    console.log(this.nestedPaths);
  }

  register(value: any) {
    Swal.fire({
      text: "Guardar información",
      allowOutsideClick: false,
      width: "270px"
    });
    Swal.showLoading();
    if (this.id == null) {
      this.create(value);
    } else {
      // this.update(value);
    }
  }

  create(value: any) {
    let obj = {
      name: "",
      coordinates: this.newpaths,
      subfield: this.sublotearray
    };
    console.log(obj);
    // this.lotService.register(obj).subscribe(
    //   resp => {
    //     Swal.fire({
    //       text: "Se creó correctamente " + value.name,
    //       icon: "success",
    //       showConfirmButton: false,
    //       timer: 1500,
    //       width: '250px'
    //     });
    //     this.router.navigateByUrl("/Lotes");
    //   },
    //   (err: any) => {
    //     Swal.fire({
    //       text: "Error en el sevidor",
    //       showConfirmButton: false,
    //       timer: 1500,
    //       icon:'error',
    //       width: '250px'
    //     });
    //   }
    // );
  }
  datasublote(value) {
    console.log(value);
    this.sublotesforms.setValue({
      nickname: value.nickname,
      agriculture_type: value.agriculture_type,
      start_date: value.start_date,
      finish_date: value.finish_date,
      TypeL: "Protegida"
    });
    this.paths = value.subfieldCoordinates;
  }

  sublote(value) {
    let obj = {
      agriculture_type: value.agriculture_type,
      start_date: value.start_date,
      finish_date: value.finish_date,
      nickname: value.nickname,
      TypeL: value.TypeL,
      subfieldCoordinates: this.pathsSubLotes
    };
    console.log(obj);
    this.sublotearray.push(obj);
    this.sublotesforms.setValue({
      agriculture_type: "",
      start_date: "",
      finish_date: "",
      nickname: "",
      TypeL: ""
    });
    this.pathsSubLotes = [];
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        strokeColor: "green",
        strokeOpacity: 2,
        fillOpacity: 0.2
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
  }

  options: any = {
    lat: 33.5362475,
    lng: -111.9267386,
    zoom: 10,
    fillColor: "#DC143C",
    draggable: true,
    editable: true,
    visible: true
  };

  polygonCreated($event) {
    if (this.polygon) {
      this.polygon.setMap(null);
    }
    this.polygon = $event;
    this.addPolygonChangeEvent(this.polygon);
    google.maps.event.addListener(this.polygon, "coordinates_changed", function(
      index,
      obj
    ) {
      // Polygon object: yourPolygon
      console.log("coordinates_changed");
    });
  }

  getPaths() {
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];

      vertices.getArray().forEach(function(xy, i) {
        // console.log(xy);
        let latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        paths.push(JSON.stringify(latLng));
      });
      return paths;
    }
    return [];
  }

  addPolygonChangeEvent(polygon) {
    var me = polygon,
      isBeingDragged = false,
      triggerCoordinatesChanged = function() {
        // Broadcast normalized event
        google.maps.event.trigger(me, "coordinates_changed");
      };

    // If  the overlay is being dragged, set_at gets called repeatedly,
    // so either we can debounce that or igore while dragging,
    // ignoring is more efficient
    google.maps.event.addListener(me, "dragstart", function() {
      isBeingDragged = true;
    });

    // If the overlay is dragged
    google.maps.event.addListener(me, "dragend", function() {
      triggerCoordinatesChanged();
      isBeingDragged = false;
    });

    // Or vertices are added to any of the possible paths, or deleted
    var paths = me.getPaths();
    paths.forEach(function(path, i) {
      google.maps.event.addListener(path, "insert_at", function() {
        triggerCoordinatesChanged();
      });
      google.maps.event.addListener(path, "set_at", function() {
        if (!isBeingDragged) {
          triggerCoordinatesChanged();
        }
      });
      google.maps.event.addListener(path, "remove_at", function() {
        triggerCoordinatesChanged();
      });
    });
  }
  men() {
    console.log("entro");
  }

  addMarker(lat: number, lng: number) {
    console.log(lat);
    console.log(lng);

    let obj = {
      lat: lat,
      lng: lng
    };

    this.newpaths.push(obj);
  }
  addMakerSubLote(lat: number, lng: number) {
    console.log(lat);
    console.log(lng);

    let obj = {
      lat: lat,
      lng: lng
    };
    this.pathsSubLotes.push(obj);
  }
  campos() {}

  max(coordType: "lat" | "lng"): number {
    return Math.max(...this.newpaths.map(marker => marker[coordType]));
  }

  min(coordType: "lat" | "lng"): number {
    return Math.min(...this.newpaths.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  markerDragEnd(coords, event) {
    console.log(coords);
    console.log(event);
  }
}
