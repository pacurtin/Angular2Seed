import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToggleSideNavService} from '../../services/side-nav/toggle-side-nav.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactUsModalComponent} from '../contact-us-modal/contact-us-modal.component';
import {AuthService} from '../../services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {IApplicationState} from '../../store/application-state';
import {Store} from '@ngrx/store';
import {logoSelector} from './logoSelector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ToolbarComponent implements OnInit {

  contactUsModalConfig: MatDialogConfig = new MatDialogConfig;
  showMenuButton = false;
  logo$: Store<string>;

  constructor(
    private toggleSideNavService: ToggleSideNavService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private storeService: StoreService,
    private store: Store<IApplicationState>
  ) {
    this.logo$ = store.select(logoSelector);
    this.contactUsModalConfig.width = '400px';
    if (authService.isLoggedIn()) {
      storeService.loadMeData();
    }
  }

  toggleSideNav(): void {
    this.toggleSideNavService.toggleSideNav();
  }

  openContactUsModal(): void {
    this.dialog.open(ContactUsModalComponent, this.contactUsModalConfig);
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setShowHideMenuButton();
        }
      });
  }

  setShowHideMenuButton() {
    setTimeout(() => this.showMenuButton = this.authService.isLoggedIn(), 0);
  }

}
