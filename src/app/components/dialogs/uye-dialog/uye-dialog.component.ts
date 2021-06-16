import { ApiService } from './../../../services/api.service';
import { Uye } from './../../../models/Uye';
import { KategoriDialogComponent } from './../kategori-dialog/kategori-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  frm:FormGroup
  uye:Uye;
  constructor(
    public dialogRef:MatDialogRef<KategoriDialogComponent>,
    public formBuilder:FormBuilder,
    public apiService:ApiService,
    @Inject(MAT_DIALOG_DATA)public data:Uye
  ) { 
    this.uye = data;
    this.frm = this.FormOlustur();
  }

  ngOnInit(): void {
  }
  FormOlustur(){
    return this.formBuilder.group({
      UyeAdSoyad:[this.uye.UyeAdSoyad],
      UyeKullaniciAdi:[this.uye.UyeKullaniciAdi],
      UyeMail:[this.uye.UyeMail],
      UyeParola:[this.uye.UyeParola],
      UyeAdres:[this.uye.UyeAdres]
    })
  }

}
