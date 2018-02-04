import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'ng2-toastr';
import {FileUploadModule} from 'ng2-file-upload';
import {AuthService} from '../../services/auth/auth.service';
import {INITIAL_APPLICATION_STATE} from '../../store/application-state';
import {reducers} from '../../app.module';
import {StoreModule} from '@ngrx/store';
import {StoreService} from '../../services/store/store.service';
import {MockRestHttpService} from '../../services/restHttp/mock-rest-http.service';
import {RestHttpService} from '../../services/restHttp/rest-http.service';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ToastModule.forRoot(),
        FileUploadModule,
        StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE})
      ],
      providers: [
        AuthService,
        StoreService,
        {provide: RestHttpService, useClass: MockRestHttpService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
