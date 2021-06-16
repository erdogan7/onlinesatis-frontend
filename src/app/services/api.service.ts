import { Sepet } from './../models/Sepet';
import { Kategori } from './../models/Kategori';
import { Uye } from './../models/Uye';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urun } from '../models/Urun';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44311/api/";

  constructor(
    public http: HttpClient
  ) { }

  YekiListe(){
    return this.http.get(this.apiUrl+"yetkiliste")
  }
  //#region Uyelik
  UyeOlustur(uye:Uye){
    return this.http.post(this.apiUrl+"uyeekle",uye)
  }
  UyeListe(){
    return this.http.get(this.apiUrl+"uyeliste")
  }
  UyeById(uyeId:string){
    return this.http.get(this.apiUrl+"uyebyid/"+uyeId)
  }
  UyeDuzenle(uye:Uye){
    return this.http.put(this.apiUrl+"uyeduzenle",uye)
  }
  UyeYetkiDegistir(uye:Uye){
    return this.http.put(this.apiUrl+"yetkidegistir",uye)
  }
  UyeSil(uyeId:string){
    return this.http.delete(this.apiUrl+"uyesil/"+uyeId)
  }

  TokenAl(kadi:string,parola:string){
    var data = "username="+kadi+"&password="+parola+"&grant_type=password";
    var reqHeader = new HttpHeaders({"Context-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"token",data,{headers:reqHeader});
  }
  OturumKontrol(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }
  YetkiKontrol():string{
    var yetki = localStorage.getItem("yetki");
    return yetki
  }
  //#endregion
  //#region Kategori
  KategoriListele(){
    return this.http.get(this.apiUrl+"kategoriliste")
  }
  KategoriById(kategoriId:string){
    return this.http.get(this.apiUrl+"kategoribyid/"+kategoriId)
  }
  KategoriEkle(kategori: Kategori){
    return this.http.post(this.apiUrl+"kategoriekle",kategori)
  }
  KategoriDuzenle(kategori:Kategori){
    return this.http.put(this.apiUrl+"kategoriduzenle",kategori)
  }
  KategoriSil(kategoriId:string){
    return this.http.delete(this.apiUrl+"kategorisil/"+kategoriId)
  }
  //#endregion
//#region  Satis Cinsi
  SatisCinsiListe(){
    return this.http.get(this.apiUrl+"satiscinsiliste")
  }
  SatisCinsiById(satisCinsiId:number){
    return this.http.get(this.apiUrl+"satiscinsibyid/"+satisCinsiId)
  }
//#endregion
//#region Urun
  UrunListe(){
    return this.http.get(this.apiUrl+"urunliste")
  }
  UrunByKategori(kategoriId:string){
    return this.http.get(this.apiUrl+"urunbykategori/"+kategoriId)
  }
  UrunByUye(uyeId:string){
    return this.http.get(this.apiUrl+"urunbyuye/"+uyeId)
  }
  UrunById(urunId:string){
    return this.http.get(this.apiUrl+"urunbyid/"+urunId)
  }
  UrunEkle(urun:Urun){
    return this.http.post(this.apiUrl+"urunekle",urun)
  }
  UrunDuzenle(urun:Urun){
    return this.http.put(this.apiUrl+"urunduzenle",urun)
  }
  UrunSil(urunId:string){
    return this.http.delete(this.apiUrl+"urunsil/"+urunId)
  }

//#endregion
//#region Sepet
  SepetListe(){
    return this.http.get(this.apiUrl+"sepetliste")
  }
  SepetByUye(uyeId:string){
    return this.http.get(this.apiUrl+"sepetbyuye/"+uyeId)
  }
  SepetById(sepetId:string){
    return this.http.get(this.apiUrl+"sepetbyid/"+sepetId)
  }
  SepeteEkle(sepet:Sepet){
    return this.http.post(this.apiUrl+"sepeteekle",sepet)
  }
//#endregion
}
