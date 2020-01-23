import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AppRoutingModule } from './app-routing.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { DecimalComaPipe } from './services/pipes/decimal-coma.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    EditProfileComponent,
    NotFoundComponent,
    ProductCardComponent,
    SnackBarComponent,
    DecimalComaPipe,
    CreateProductComponent,
    UpdateProductComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    TextMaskModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SnackBarComponent,
    ChangePasswordDialogComponent
  ],
})
export class AppModule { }
