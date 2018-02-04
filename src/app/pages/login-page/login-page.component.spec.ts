import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastModule} from 'ng2-toastr';
import {AuthService} from '../../services/auth/auth.service';
import {StoreService} from '../../services/store/store.service';
import {INITIAL_APPLICATION_STATE} from '../../store/application-state';
import {reducers} from '../../app.module';
import {StoreModule} from '@ngrx/store';
import {MatDialogModule} from '@angular/material';
import {MockRestHttpService} from '../../services/restHttp/mock-rest-http.service';
import {RestHttpService} from '../../services/restHttp/rest-http.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
        RouterTestingModule,
        ToastModule.forRoot(),
        // fixes Error: StaticInjectorError[Store]: StaticInjectorError[Store]: NullInjectorError: No provider for Store!
        StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE})
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers:    [
        {provide: RestHttpService, useClass: MockRestHttpService },
        AuthService,
        StoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
