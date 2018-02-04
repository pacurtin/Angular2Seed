import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  // Custom colors set in styles.scss
  animate = 'flyRight';
  showCloseButton = true;
  positionClass = 'toast-top-right';
  toastLife = 1500;
}
