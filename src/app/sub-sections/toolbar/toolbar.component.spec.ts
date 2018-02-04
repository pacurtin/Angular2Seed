import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToggleSideNavService } from '../../services/side-nav/toggle-side-nav.service';
import { MatDialogModule } from '@angular/material';
import {AuthService} from '../../services/auth/auth.service';
import {StoreService} from '../../services/store/store.service';
import {INITIAL_APPLICATION_STATE} from '../../store/application-state';
import {reducers} from '../../app.module';
import {StoreModule} from '@ngrx/store';
import {MockRestHttpService} from '../../services/restHttp/mock-rest-http.service';
import {RestHttpService} from '../../services/restHttp/rest-http.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        // fixes Error: StaticInjectorError[Store]: StaticInjectorError[Store]: NullInjectorError: No provider for Store!
        StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE})
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        ToggleSideNavService,
        AuthService,
        StoreService,
        {provide: RestHttpService, useClass: MockRestHttpService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
