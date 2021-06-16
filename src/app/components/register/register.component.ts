import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public apiService:ApiService,
    public alert:MyAlertService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }
  UyeOlustur(uye:Uye){
    console.log(uye)
    this.apiService.UyeOlustur(uye).subscribe((d:Sonuc)=>{
      console.log(d);
      this.alert.AlertUygula(d)
      this.router.navigate(['/login'])
    })
  }
}
