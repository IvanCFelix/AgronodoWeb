import { BsModalService } from 'ngx-bootstrap/modal';
import { UsernameValidator } from './../../validators/UsernameValidator ';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import Swal from "sweetalert2";
declare const google: any;


@Component({
  selector: 'app-lots-edit',
  templateUrl: './lots-edit.component.html',
  styleUrls: ['./lots-edit.component.scss']
})
export class LotsEditComponent implements OnInit {
  adminagronodo: FormGroup;
  sublotesforms: FormGroup;
  
  id;
  sublotearray = [];

  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  polygon: any;
  scrollwheel = false;
  newpaths = [];
  paths = [[
    { lat: 25.8132204, lng: -108.9858821 },
    { lat: 25.8145939, lng: -108.9721467 },
    { lat: 25.8134606, lng: -108.9730846 },
    { lat: 25.8125865, lng: -108.9770006 },
    { lat: 25.8125619, lng: -108.9767367 }
    ],
  [
    { lat: 25.8132304, lng: -108.9858821 },
    { lat: 25.8145639, lng: -108.9721467 },
    { lat: 25.8134506, lng: -108.9730846 },
    { lat: 25.8125465, lng: -108.9770006 },
    { lat: 25.8125219, lng: -108.9767367 }
  ]
  ]

  selectedMarker;
  constructor(private modalService: BsModalService, public router: Router, private route: ActivatedRoute) {

    this.adminagronodo = new FormGroup({
    
      username: new FormControl("", [
        Validators.required,
        UsernameValidator.cannotContainSpace
      ])
    });
    this.sublotesforms = new FormGroup({
    
      name: new FormControl("", Validators.required),
      TypeC: new FormControl("", [Validators.email, Validators.required]),
      TypeL: new FormControl("", Validators.required),
    });

  
   }

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: "polygon"
  };

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id)
  }

  register(value: any) {
    console.log(value)
    // Swal.fire({
    //   text: "Guardar información",
    //   allowOutsideClick: false,
    //   width: '270px'
    // });
    // Swal.showLoading();
    // if (this.id == null) {
    //   this.create(value);
    // } else {
    //   this.update(value);
    // }
  }

  sublote(value){
    console.log(value)
    let obj = {
      name:'hola',
      typeC:'uwu',
      typeL:'jeje'
    }
    this.sublotearray.push(obj)
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
        strokeColor:'green',
        strokeOpacity:2,
        fillOpacity:0.2
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
    fillColor: '#DC143C',
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
    google.maps.event.addListener(this.polygon, 'coordinates_changed', function (index, obj) {
      // Polygon object: yourPolygon
      console.log('coordinates_changed');
    });

  }

  getPaths() {
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];
     
      vertices.getArray().forEach(function (xy, i) {
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
      triggerCoordinatesChanged = function () {
        // Broadcast normalized event
        google.maps.event.trigger(me, 'coordinates_changed');
      };

    // If  the overlay is being dragged, set_at gets called repeatedly,
    // so either we can debounce that or igore while dragging,
    // ignoring is more efficient
    google.maps.event.addListener(me, 'dragstart', function () {
      isBeingDragged = true;
    });

    // If the overlay is dragged
    google.maps.event.addListener(me, 'dragend', function () {
      triggerCoordinatesChanged();
      isBeingDragged = false;
    });

    // Or vertices are added to any of the possible paths, or deleted
    var paths = me.getPaths();
    paths.forEach(function (path, i) {
      google.maps.event.addListener(path, "insert_at", function () {
        triggerCoordinatesChanged();
      });
      google.maps.event.addListener(path, "set_at", function () {
        if (!isBeingDragged) {
          triggerCoordinatesChanged();
        }
      });
      google.maps.event.addListener(path, "remove_at", function () {
        triggerCoordinatesChanged();
      });
    });
  };
men(){
  console.log("entro")
}


addMarker(lat: number, lng: number) {
  console.log(lat)
  console.log(lng)

  this.newpaths.push({ lat, lng, alpha: 0.4 });
}

max(coordType: 'lat' | 'lng'): number {
  return Math.max(...this.newpaths.map(marker => marker[coordType]));
}

min(coordType: 'lat' | 'lng'): number {
  return Math.min(...this.newpaths.map(marker => marker[coordType]));
}

selectMarker(event) {
  this.selectedMarker = {
    lat: event.latitude,
    lng: event.longitude
  };
}

markerDragEnd(coords, event){
  console.log(coords)
  console.log(event)
}



}
