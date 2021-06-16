import { Kategori } from './../../../models/Kategori';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Kategori;
  islem:string;
  frm:FormGroup
  constructor(
    public dialogRef:MatDialogRef<KategoriDialogComponent>,
    public formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem=data.islem
    this.dialogBaslik= "Kategori "+this.islem
    if (this.islem=="Ekle") {
      this.yeniKayit = new Kategori();
    }
    if (this.islem=="Düzenle") {
      this.yeniKayit=data.kategori
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit(): void {
  }
  FormOlustur(){
    return this.formBuilder.group({
      KategoriAdi:[this.yeniKayit.KategoriAdi]
    })
  }
}
