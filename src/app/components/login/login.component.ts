import { Router } from '@angular/router';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiService:ApiService,
    public alert:MyAlertService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }
  OturumAc(kadi:string,parola:string){
    this.apiService.TokenAl(kadi,parola).subscribe((d:any)=>{
      localStorage.setItem("token",d.access_token)
      localStorage.setItem("uid",d.uyeId)
      localStorage.setItem("kullaniciAdi",d.uyeKadi)
      localStorage.setItem("yetki",d.uyeYetkileri)
      this.router.navigate(["/"]).then(d=>
        window.location.reload()
      )
    },err=>{
      var sonuc:Sonuc=new Sonuc();
      sonuc.Islem=false;
      sonuc.Mesaj="Kullanıcı Adı veya Şifre Yanlış"
      this.alert.AlertUygula(sonuc);
    })
  }
}
