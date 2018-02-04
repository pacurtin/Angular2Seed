import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToggleSideNavService {

  private sideNavToggleSource = new Subject<boolean>(); // observable source
  sideNavToggle$ = this.sideNavToggleSource.asObservable(); // observable stream
  private sideNavOpenSource = new Subject<boolean>();
  sideNavOpen$ = this.sideNavOpenSource.asObservable();
  private sideNavCloseSource = new Subject<boolean>();
  sideNavClose$ = this.sideNavCloseSource.asObservable();

  public toggleSideNav(): void {
    this.sideNavToggleSource.next(true); // Will simply spit out true whenever hamburger button is pushed
    window.dispatchEvent(new Event('resize'));  // This is to make reports resize
  }

  public openSideNav(): void {
    this.sideNavOpenSource.next(true); // Will simply spit out true whenever hamburger button is pushed
    window.dispatchEvent(new Event('resize'));  // This is to make reports resize
  }

  public closeSideNav(): void {
    this.sideNavCloseSource.next(true); // Will simply spit out true whenever hamburger button is pushed
    window.dispatchEvent(new Event('resize'));  // This is to make reports resize
  }
}
