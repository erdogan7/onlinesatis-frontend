import { SepetimComponent } from './components/sepetim/sepetim.component';
import { UrunComponent } from './components/urun/urun.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminDefaultComponent } from './components/admin/admin-default/admin-default.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"admin",
    component:AdminDefaultComponent
  },
  {
    path:"admin/kategori",
    component:AdminKategoriComponent
  },
  {
    path:"admin/uye",
    component:AdminUyeComponent
  },
  {
    path:"urunlerim",
    component:UrunComponent
  },
  {
    path:"sepetim",
    component:SepetimComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
