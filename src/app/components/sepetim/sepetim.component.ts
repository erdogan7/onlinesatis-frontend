import { Urun } from 'src/app/models/Urun';
import { Sepet } from './../../models/Sepet';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sepetim',
  templateUrl: './sepetim.component.html',
  styleUrls: ['./sepetim.component.css']
})
export class SepetimComponent implements OnInit {
  sepettekiler:Sepet[];
  urunler:Urun[];
  constructor(
    public apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.SepetimiGetir();
    
  }
  SepetimiGetir(){
    this.apiService.SepetByUye(localStorage.getItem("uid")).subscribe((d:Sepet[])=>{
      this.sepettekiler=d;
    })
    this.UrunleriGetir();
  }
  UrunleriGetir(){
    for (let index = 0; index < this.sepettekiler.length; index++) {
      const sepet = this.sepettekiler[index];
      this.apiService.UrunById(sepet.UrunId).subscribe((s:Urun)=>{
        this.urunler.push(s);
        console.log(this.urunler)
      })
      
    }
  }
}
