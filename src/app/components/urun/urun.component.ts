import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { UrunDialogComponent } from './../dialogs/urun-dialog/urun-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Urun } from 'src/app/models/Urun';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.css']
})
export class UrunComponent implements OnInit {
  dataSource:any;
  urunler:Urun[];
  displayedColumns=['UrunAdi','UrunFiyati','UrunStok','Islemler']
  @ViewChild(MatSort)sort:MatSort;
  @ViewChild(MatPaginator)paginator:MatPaginator;
  dialogRef:MatDialogRef<UrunDialogComponent>;
  confirmDialog:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit(): void {
    this.UrunGetir();
  }
  UrunGetir(){
    this.apiService.UrunByUye(localStorage.getItem("uid")).subscribe((d:Urun[])=>{
      this.urunler=d;
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }
  Ekle(){
    var yeniUrun:Urun = new Urun();
    this.dialogRef = this.matDialog.open(UrunDialogComponent,{
      width:"700px",
      data:{
        islem:"Ekle",
        kayit:yeniUrun
      }
    })
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.UrunUyeId=localStorage.getItem("uid")
      this.apiService.UrunEkle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        this.UrunGetir();
      })
      }
    })
  }
  Duzenle(kayit:Urun){
    console.log(kayit)
    this.dialogRef = this.matDialog.open(UrunDialogComponent,{
      width:"700px",
      data:{
        islem:"Düzenle",
        kayit:kayit
      }
    })
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.UrunUyeId=localStorage.getItem("uid")
        d.UrunId=kayit.UrunId
      this.apiService.UrunDuzenle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        this.UrunGetir();
      })
      }
    })
  }
  Sil(urun:Urun){
    this.confirmDialog=this.matDialog.open(ConfirmDialogComponent,{
      width:"250px",
    })
    this.confirmDialog.componentInstance.dialogMesaj=urun.UrunAdi+" adlı ürün silinecek onaylıyor musunuz?";
    this.confirmDialog.afterClosed().subscribe(d=>{
      if (d==true) {
        this.apiService.UrunSil(urun.UrunId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          this.UrunGetir();
        })
      }
    })
  }
}
