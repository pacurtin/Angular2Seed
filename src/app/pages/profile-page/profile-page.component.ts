import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileUploaderOptions} from 'ng2-file-upload';
import {AuthService} from '../../services/auth/auth.service';
import {IApplicationState} from '../../store/application-state';
import {Store} from '@ngrx/store';
import {logoSelector} from '../../sub-sections/toolbar/logoSelector';
import {StoreService} from '../../services/store/store.service';
import {IMe, RestHttpService} from '../../services/restHttp/rest-http.service';

// TODO create backend endpoint for this
const logoUploadURL = '/api/profiler';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;
  newProfile: IMe;
  profileModel: IMe = {
    logo: ''
  };

  logo$: Store<string>;

  public uploader: FileUploader;

  constructor(
    private restHttpService: RestHttpService,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    private storeService: StoreService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.createProfileForm();
    this.getProfileModel();
    this.logo$ = store.select(logoSelector);
  }

  ngOnInit() {
    /* I'm doing all the initialisation for the file uploader here. */
    this.uploader = new FileUploader({ url: logoUploadURL });
    this.uploader.onAfterAddingFile = () => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };

    // N.B. Finally a trick to create an empty Typescript Array object!
    const authHeader: Array<{
      name: string;
      value: string;
    }> = [];

    authHeader.push({name: 'Authorization' , value: 'Bearer ' + AuthService.getToken()});
    const uploadOptions = <FileUploaderOptions>{headers : authHeader};
    this.uploader.setOptions(uploadOptions);

    // On upload complete clear the queue and reload the logo into the flux store
    this.uploader.onCompleteItem = () => {
      this.toastr.success('Your logo picture has been updated.', 'Save successful');
      this.uploader.clearQueue();
      this.storeService.loadMeData();
    };
  }

  isUploadTableVisible() {
    // if the queue contains a file show the table.
    return this.uploader.queue.length !== 0;
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      userName :  ['', Validators.required ],
      name :      ['', Validators.required ],
      email :     ['', Validators.required ]
    });
  }

  /*
   *  Populates the form fields and a profile model with data from back end.
   *  The model can ONLY be altered via a call to the backend, Redux style.
   */
  getProfileModel() {
    this.restHttpService.getMe().$observable.subscribe(
      response => {
        // refresh form data
        this.profileForm.reset({
          userName:   response.userName,
          name:       response.name,
          email:      response.email
        });
        // refresh model
        this.profileModel = response;
      }, error => {
        console.log('getMe returned error.');
        console.log(error);
        this.toastr.error('Could not get user info.', 'Get user info failed');
      }
    );
  }

  onProfileSubmit() {
    this.newProfile = this.prepareNewProfile();
    this.restHttpService.saveMe(this.newProfile).$observable.subscribe(
      () => {
        this.toastr.success('Your details have been updated.', 'Save successful');
        this.getProfileModel();
      },
      error => {
        console.log('saveMe returned error.');
        console.log(error);
        this.toastr.error('Could not save details.', 'Save profile failed');
        this.getProfileModel();
      }
    );
  }

  profileRevert() {
    this.getProfileModel();
  }

  prepareNewProfile(): IMe {
    const formModel = this.profileForm.value;

    return {
      name: formModel.name,
      email: formModel.email
    };
  }

}
