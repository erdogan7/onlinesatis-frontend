import { Sonuc } from './../../../models/Sonuc';
import { MyAlertService } from './../../../services/myAlert.service';
import { KategoriDialogComponent } from './../../dialogs/kategori-dialog/kategori-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Kategori } from './../../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.css']
})
export class AdminKategoriComponent implements OnInit {
  kategoriler:Kategori[];
  dataSource:any;
  displayedColumns=['KategoriAdi','Islemler'];
  @ViewChild(MatSort)sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<KategoriDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit(): void {
    this.KategoriListe();
  }
  KategoriListe(){
    this.apiService.KategoriListele().subscribe((d:Kategori[])=>{
      this.kategoriler= d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator
    })
  }
  Ekle(){
    var yeni:Kategori = new Kategori()
    this.dialogRef = this.matDialog.open(KategoriDialogComponent,{
      width:"400px",
      data:{
        kategori:yeni,
        islem:"Ekle"
      }
    })
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiService.KategoriEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          this.KategoriListe()
        })
      }
    })
  }
  Duzenle(kategori:Kategori){
    this.dialogRef = this.matDialog.open(KategoriDialogComponent,{
      width:"400px",
      data:{
        kategori:kategori,
        islem:"Düzenle"
      }
    })
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        kategori.KategoriAdi=d.KategoriAdi;
        this.apiService.KategoriDuzenle(kategori).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          this.KategoriListe();
        })
      }
    })
  }
  Sil(kategori:Kategori){
    this.confirmDialogRef= this.matDialog.open(ConfirmDialogComponent,{
      width:"250px"
    })
    this.confirmDialogRef.componentInstance.dialogMesaj=kategori.KategoriAdi+" adlı kategori silinecek onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d==true) {
        this.apiService.KategoriSil(kategori.KategoriId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          this.KategoriListe();
        })
      }
    })
  }
}
