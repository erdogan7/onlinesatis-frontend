import { Kategori } from './../../../models/Kategori';
import { SatisCinsi } from './../../../models/SatisCinsi';
import { ApiService } from './../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Urun } from 'src/app/models/Urun';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  yeniKayit:Urun;
  islem:string;
  frm:FormGroup;
  satisCinsleri:SatisCinsi[];
  kategoriler:Kategori[];
  constructor(
    public dialogRef:MatDialogRef<UrunDialogComponent>,
    public formBuilder:FormBuilder,
    public apiService:ApiService,
    @Inject(MAT_DIALOG_DATA)public data:any
  ) { 
    this.islem=data.islem;
    if (this.islem=="Ekle") {
      this.yeniKayit= new Urun();
    }
    if (this.islem=="Duzenle") {
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur()
  }

  ngOnInit(): void {
    console.log(this.yeniKayit)
    this.SatisCinsiListe();
    this.KategoriListe();
  }
  FormOlustur(){
    return this.formBuilder.group({
      KategoriId:[this.yeniKayit.KategoriId],
      SatisCinsiId:[this.yeniKayit.UrunSatisCinsiId],
      UrunAdi:[this.yeniKayit.UrunAdi],
      UrunFiyati:[this.yeniKayit.UrunFiyati],
      UrunAciklama:[this.yeniKayit.UrunAciklama],
      UrunStok:[this.yeniKayit.UrunStok]
    })
  }
  SatisCinsiListe(){
    this.apiService.SatisCinsiListe().subscribe((s:SatisCinsi[])=>{
      this.satisCinsleri=s;
    })
  }
  KategoriListe(){
    this.apiService.KategoriListele().subscribe((s:Kategori[])=>{
      this.kategoriler=s;
    })
  }
}
