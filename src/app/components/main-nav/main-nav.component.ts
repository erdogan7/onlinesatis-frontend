import { Sepet } from './../../models/Sepet';
import { UyeDialogComponent } from './../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  kadi:string;
  yetki:string;
  uye:Uye=new Uye();
  seppettekiler:Sepet[];
  sepetSayisi:number;
  dialogRef:MatDialogRef<UyeDialogComponent>
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiService:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog) {}
  ngOnInit(): void {
    if (this.apiService.OturumKontrol()) {
      this.kadi= localStorage.getItem("kullaniciAdi");
    }
    this.YetkiKontrol();
    this.UyeGetir();
    this.Sepettekiler();
    this.sepetSayisi= this.seppettekiler?.length
  }
  OturumKapat(){
    localStorage.clear();
    window.location.reload();
  }
  YetkiKontrol(){
    this.yetki= this.apiService.YetkiKontrol()  
  }
  UyeBilgileriGuncelle(){
    this.dialogRef = this.matDialog.open(UyeDialogComponent,{
      width:"500px",
      data:this.uye
    })
    this.dialogRef.afterClosed().subscribe((d:Uye)=>{
      if (d) {
        d.UyeId=this.uye.UyeId;
      d.UyeYetkiId=this.uye.UyeYetkiId;
      this.apiService.UyeDuzenle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        window.location.reload()
      })
      }
    })
  }
  UyeGetir(){
    this.apiService.UyeById(localStorage.getItem("uid")).subscribe((u:Uye)=>{
      this.uye=u;
    })
  }
  SatisaBasla(){
    this.apiService.UyeYetkiDegistir(this.uye).subscribe((d:Sonuc)=>{
      this.alert.AlertUygula(d);
    })
    
  }
  Sepettekiler(){
    this.apiService.SepetByUye(localStorage.getItem("uid")).subscribe((d:Sepet[])=>{
      this.seppettekiler=d;
    })
  }
}
