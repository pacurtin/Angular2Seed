import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { SidenavComponent } from './sub-sections/sidenav/sidenav.component';
import { ToolbarComponent } from './sub-sections/toolbar/toolbar.component';
import { storeData } from './store/uiStoreDataReducer';
import { ForgotPasswordModalComponent } from './sub-sections/forgot-password-modal/forgot-password-modal.component';
import { ContactUsModalComponent } from './sub-sections/contact-us-modal/contact-us-modal.component';
import {INITIAL_APPLICATION_STATE} from './store/application-state';
import {StoreModule} from '@ngrx/store';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {
  MatButtonModule,
  MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth/auth.service';
import {ToastModule, ToastOptions, ToastsManager} from 'ng2-toastr';
import {StoreService} from './services/store/store.service';
import {ToggleSideNavService} from './services/side-nav/toggle-side-nav.service';
import {AuthGuard} from './guards/auth-guard';
import {CsvService} from './services/csv/csv.service';
import {RestHttpService} from './services/restHttp/rest-http.service';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CustomOption} from './sub-sections/toastr-custom-options';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DateSelectorComponent} from './sub-sections/date-selector/date-selector.component';

// reducer functions for flux store
export const reducers = {
  storeData
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ChartPageComponent,
    TablePageComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ToolbarComponent,
    SidenavComponent,
    ContactUsModalComponent,
    ForgotPasswordModalComponent,
    DateSelectorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatSortModule,
    MatInputModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    NgxChartsModule,
    StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE}),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    ContactUsModalComponent,
    ForgotPasswordModalComponent
  ],
  providers: [
    ToggleSideNavService,
    {provide: ToastOptions, useClass: CustomOption},
    ToastsManager,
    AuthService,
    RestHttpService,
    AuthGuard,
    CsvService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
