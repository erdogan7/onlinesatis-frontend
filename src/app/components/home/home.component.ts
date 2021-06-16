import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { Sepet } from './../../models/Sepet';
import { ApiService } from './../../services/api.service';
import { Urun } from 'src/app/models/Urun';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urunler:Urun[];
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.UrunleriGetir();
  }
  UrunleriGetir(){
    this.apiServis.UrunListe().subscribe((d:Urun[])=>{
      this.urunler=d;
    })
  }
  SepeteEkle(urun:Urun){
    var uid=localStorage.getItem("uid")
    var sepet:Sepet=new Sepet()
    sepet.UrunId=urun.UrunId;
    sepet.UyeId=uid;
    this.apiServis.SepeteEkle(sepet).subscribe((d:Sonuc)=>{
      this.alert.AlertUygula(d);
    })
  }
}
