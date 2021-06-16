import { Router } from '@angular/router';
import { MyAlertService } from './../../../services/myAlert.service';
import { Sonuc } from './../../../models/Sonuc';
import { UyeDialogComponent } from './../../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Uye } from './../../../models/Uye';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  dataSource:any;
  uyeler:Uye[]
  yetki:string;
  displayedColumns=['UyeAdSoyad','UyeKullaniciAdi','UyeMail','UyeAdres','Islemler']
  @ViewChild(MatSort)sort:MatSort;
  @ViewChild(MatPaginator)paginator:MatPaginator;
  dialogRef:MatDialogRef<UyeDialogComponent>;

  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.UyeListele();
    this.YetkiKontrol()
    if (this.yetki!="Admin") {
      this.router.navigate(["/"]);
    }
  }
  YetkiKontrol(){
    this.yetki=this.apiService.YetkiKontrol();
  }
  UyeListele(){
    this.apiService.UyeListe().subscribe((d:Uye[])=>{
      this.uyeler=d;
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  Duzenle(uye:Uye){
    this.dialogRef = this.matDialog.open(UyeDialogComponent,{
      width:"500px",
      data:uye
    })
    this.dialogRef.afterClosed().subscribe((d:Uye)=>{
      d.UyeId=uye.UyeId
      d.UyeYetkiId=uye.UyeYetkiId
      this.apiService.UyeDuzenle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        this.UyeListele();
      })
    })
  }
}
