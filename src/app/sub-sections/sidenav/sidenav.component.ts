import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ToggleSideNavService} from '../../services/side-nav/toggle-side-nav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sideNav: MatSidenav; // Finds the first MatSidenav in view

  // sideNav should initially be open unless on small screen device.
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 600px)`);

  // toggleSideNavService allows the toggle command be given from other components
  constructor(
    private router: Router,
    private toggleSideNavService: ToggleSideNavService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // This is actively watching for screen size change via router
    this.router.events.subscribe(
      () => {
      if (!this.shouldSideNavBeOpen()) {
        this.sideNav.close();
      }
    });

    // subscribed to an observable called sideNavToggle$
    this.toggleSideNavService.sideNavToggle$.subscribe(
      () => {
      this.sideNav.toggle();
    });

    this.toggleSideNavService.sideNavOpen$.subscribe(
      () => {
        this.sideNav.open();
      });

    this.toggleSideNavService.sideNavClose$.subscribe(
      () => {
        this.sideNav.close();
      });
  }

  shouldSideNavBeOpen(): boolean {
    // Should be closed by default if on small screen or not logged in
    return this.isScreenBig() && this.authService.isLoggedIn();
  }

  isScreenBig(): boolean {
    return !this.mediaMatcher.matches;
  }

}
