import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

import { FormsModule } from '@angular/forms';
import { RouterModule, CanActivate } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatCheckboxModule,MatDialogModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCartComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forRoot([
      { path :'' , component : ProductsComponent} ,
      { path : "products" , component :ProductsComponent} ,
      { path : "shopping-cart", component: ShoppingCartComponent} ,
      { path : 'login', component: LoginComponent } ,

      { path : 'check-out', component : CheckOutComponent,canActivate:[AuthGuardService] },
      { path : 'order-success', component : OrderSuccessComponent ,canActivate:[AuthGuardService] } ,
      { path : 'my/orders', component: MyOrdersComponent ,canActivate:[AuthGuardService] } ,

      { 
        path : 'admin/products/new',
        component: ProductFormComponent ,
        canActivate:[AuthGuardService , AdminAuthGuardService] 
      }  ,
      { 
        path : 'admin/product/:id',
        component: ProductFormComponent ,
        canActivate:[AuthGuardService , AdminAuthGuardService] 
      }  ,
      
      { 
        path : 'admin/products',
        component: AdminProductsComponent ,
        canActivate:[AuthGuardService , AdminAuthGuardService] 
      }  ,
      {
         path : 'admin/orders', 
         component: AdminOrdersComponent ,
         canActivate:[AuthGuardService,AdminAuthGuardService] } ,
    ]),
    BrowserAnimationsModule,MatCheckboxModule,MatMenuModule,MatDialogModule,
  ],

  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
