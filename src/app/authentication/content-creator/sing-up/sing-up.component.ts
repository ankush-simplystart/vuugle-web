import { Component,ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepperIntl, MatStepper } from '@angular/material/stepper';
import { FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { GenericValidatorComponent } from '../../../shared/generic-validator/generic-validator.component';
import { IUserContentCreator, CognitoService } from '../../../services/cognito.service';
import { UtilityService } from '../../../services/utility.service';
import { environment } from 'src/environments/environment';
import { LyDialog, LyDialogRef, LY_DIALOG_DATA } from '@alyle/ui/dialog';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { CropperDialog } from 'src/app/shared/cropper/cropper-dialog';
import { APIService, Country, VuugleUsers } from 'src/app/API.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class ContentCreatorSingUpComponent {
  croppedProfileImage?: string;
  croppedCoverImage?: string;
  @ViewChild('stepper') stepper: MatStepper;
  user: IUserContentCreator;
  errorMessage: any = ""
  isConfirm: boolean = false;
  maskEmail: any = "";
  userEmail: any = "";
  showProgressBar: boolean = false;
  cognitoUserId: String = "";
  isUniqueVuugleId: Boolean = false;
  countyList: any = [];
  stateList: any = [];
  cityList: any = []

  basicDetailForm = this._formBuilder.group({
    name: ['', Validators.required],
    vuugleID: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8), Validators.pattern("^[a-zA-Z0-9]+$")]],
    email: ['', [Validators.required, Validators.email]],
    taxID: ['', Validators.required],
    password: ['', [Validators.required, this.genericValidator.passwordValidator,Validators.minLength(8),Validators.maxLength(32)]],
    confirm_password: ['', Validators.required],
    company: [''],
    website: [''],
    profileImage: [''],
    coverImage: [''],
    contentCreatorType: this._formBuilder.array([])
  }, {
    validator: this.genericValidator.confirmPasswordValidator('password', 'confirm_password')
  });
  socialHandleForm = this._formBuilder.group({
    facebookID: ['', Validators.required],
    instagramID: ['', Validators.required],
    tiktokID: ['', Validators.required],
    twitterID: ['', Validators.required],
  });
  contactDetailForm = this._formBuilder.group({
    phoneNo: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    pinCode: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _matStepperIntl: MatStepperIntl,
    private genericValidator: GenericValidatorComponent,
    private cognitoService: CognitoService,
    private api: APIService,
    private _dialog: LyDialog,
    private _cd: ChangeDetectorRef,
    private utilityService: UtilityService
  ) {
    this.user = {} as IUserContentCreator;
    this.cognitoUserId = "";
    this.getCountryList();
  }


  /**
   * Function to move prev or next step
   * @param index
   */
  move(index: number): void{
    this.stepper.selectedIndex = index;
  }

  /**
   * Function to open popup crop image popup
   * @param event
   */
    openCropperDialog(event: Event,type) {
      let windowWidth = 280;
      if(type == 'cover') {
        windowWidth = 800;
        event['configWidth']      = 800;
        event['configHeight']     = 260;
        event['outputWidth']      = 800;
        event['outputHeight']     = 260;
        event['cropperWindowMaxWidth']    = "820px";
        event['cropperWindowHeight']      = "320px";
        event['cropperWindowSliderWidth'] = "80%";
      } else {
        event['configWidth']      = 150;
        event['configHeight']     = 150;
        event['outputWidth']      = 100;
        event['outputHeight']     = 100;
        event['round']            = true;
        event['cropperWindowMaxWidth']    = "320px";
        event['cropperWindowHeight']      = "320px";
        event['cropperWindowSliderWidth'] = "80%";
      }
      this._dialog.open<CropperDialog, Event>(CropperDialog, {
          data: event,
          width: windowWidth,
          disableClose: true
      }).afterClosed.subscribe((result?: ImgCropperEvent) => {
          if (result) {
            if(type == 'cover') {
              this.croppedCoverImage    = "";
              this.croppedCoverImage    = result.dataURL;
            } else {
              this.croppedProfileImage  = ""
              this.croppedProfileImage  = result.dataURL;
            }
            this.basicDetailForm.patchValue({
              profileImage: this.croppedProfileImage,
              coverImage: this.croppedCoverImage
            })
            this._cd.markForCheck();
          }
      });
    }

    /**
     * Function to push content creator type in array
     * @param type
     * @param event
     */
    onContentCreatorTypeChange(type: string, event): void {
      let isChecked = event.checked
      const basicDetailFormArray = <FormArray>this.basicDetailForm.controls['contentCreatorType'];
      if (isChecked) {
        basicDetailFormArray.push(new FormControl(type));
      } else {
        let index = basicDetailFormArray.controls.findIndex(x => x.value == type)
        basicDetailFormArray.removeAt(index);
      }
    }
    /**
     * Function to create user login account in AWS cognito and call qraphql API to save extra info in database
     */
    async submitRegistrationForm(){
      if (this.basicDetailForm.valid) {
        this.showProgressBar = true;
        this.user = {
            "email": this.basicDetailForm.get('email')?.value ?? '',
            "name": this.basicDetailForm.get('name')?.value ?? '',
            "password": this.basicDetailForm.get('password')?.value ?? '',
            "website": this.basicDetailForm.get('website')?.value ?? '',
            "phoneNo": this.contactDetailForm.get('phoneNo')?.value ?? '',
            "addressLine1": this.contactDetailForm.get('addressLine1')?.value ?? '',
            "country": '', //this.contactDetailForm.get('country')?.value ?? '',
            "showPassword": false,
            "code": "",
            "picture": "",
            "coverpicture": "",
        }
        this.errorMessage       = "";
        this.userEmail          = this.user.email;
        // this.cognitoUserId      = "e97a0387-014b-4524-9686-3a350a528b0b";
        // this.saveContentCreatorInfoInGraphQl();

        let response1: Boolean = false;
        let response2: Boolean = false;
        if(this.croppedProfileImage != "") {
          response1= await this.saveImages(this.croppedProfileImage, "profile");
        } else {
          response1 = true;
        }
        if(this.croppedCoverImage != "") {
          response2 = await this.saveImages(this.croppedCoverImage, "cover");
        } else {
          response2 = true;
        }
        if(response1 && response2) {
          this.cognitoService.signUpContentCreator(this.user)
              .then((res) => {
                  if (this.user.email) {
                      let splitEmail = this.user.email.split('@');
                      var last2char = splitEmail[0].slice(-2);
                      this.maskEmail = "*****" + last2char + "@" + splitEmail[1];
                  }
                  this.cognitoUserId = res.userSub;
                  this.showProgressBar = false;
                  this.isConfirm = true;
              }).catch((error) => {
                  this.showProgressBar = false;
                  this.move(0);
                  this.errorMessage = error.message;
              });
          }
        }
    }
    /**
     * Function to capture otp
     * @param evt
     */
    onOtpChange(evt){
        this.user.code = evt;
    }

    /**
     * Function to verify customer signup request after OTP verification
     * @param evt
     */
    public confirmSignUpContentCreator(evt): void {
      if(evt) {
          this.user.code      = evt;
          this.errorMessage   = "";
          this.cognitoService.confirmSignUpContentCreator(this.user)
          .then(() => {
                this.showProgressBar = false;
                this._cd.markForCheck();
                this.saveContentCreatorInfoInGraphQl();
          }).catch((error) => {
              this.showProgressBar = false;
              this.errorMessage = error.message;
          });
      }
    }

    /**
     * Function to add content creator data in graphql
    */
    public saveContentCreatorInfoInGraphQl(): void {
      if(this.cognitoUserId) {
            const now = new Date();
            let vuugleUser:any;
            vuugleUser = {
                user_id: this.cognitoUserId,
                user_name: this.basicDetailForm.get('name')?.value ?? '',
                user_profile_image: '',
                user_status: "ACTIVE",
                user_created_date: now,
                user_type: "CONTENT_CREATOR",
                user_is_deleted: false
                }
            this.api
            .CreateVuugleUsers(vuugleUser)
            .then(async(res) => {
                this.saveLocation();
            })
            .catch((e) => {
                console.log('error creating Country...', e);
            });
        }
    }

    /**
     * Function to save content creator address
     */
    public saveLocation(){
      const now = new Date();
      let location: any;
          location = {
            location_name: "Other",
            location_state: this.contactDetailForm.get('state')?.value ?? '',
            location_city: this.contactDetailForm.get('city')?.value ?? '',
            location_street_address: this.contactDetailForm.get('addressLine1')?.value ?? '',
            location_locality: this.contactDetailForm.get('addressLine2')?.value ?? '',
            location_postal_code: this.contactDetailForm.get('pinCode')?.value ?? '',
            location_created_date: now,
            location_status: "ACTIVE",
            location_is_deleted: false
          }
      this.api
            .CreateLocation(location)
            .then((response) => {
              let locationUuid = "";
              locationUuid = response.id;
              this.saveContentCreatorProfileInGraphQl(locationUuid);
            })
            .catch((e) => {
                console.log('error create location...', e);
            });
    }

    /**
     * Function to add content creator data in graphql
    */
    async saveContentCreatorProfileInGraphQl(location_id){
      if(this.cognitoUserId) {
          let contentCreatorKeyContact = "";
          if(this.basicDetailForm.get('contentCreatorType').value) {
            let data = [];
                  data = this.basicDetailForm.get('contentCreatorType').value;
                  contentCreatorKeyContact = data.toString();
          }
            const now = new Date();
            let vuugleContentCreator:any;
            vuugleContentCreator = {
                  id: uuidv4(),
                  content_creator_user_id: this.cognitoUserId,
                  content_creator_location_uuid: location_id,
                  content_creator_cover_image: '',
                  content_creator_key_contact: contentCreatorKeyContact,
                  content_creator_vuugle_id: this.basicDetailForm.get('vuugleID')?.value ?? '',
                  content_creator_tax_id: this.basicDetailForm.get('taxID')?.value ?? '',
                  content_creator_phone: this.contactDetailForm.get('phoneNo')?.value ?? '',
                  content_creator_facebook_id: this.socialHandleForm.get('facebookID')?.value ?? '',
                  content_creator_instagram_id: this.socialHandleForm.get('instagramID')?.value ?? '',
                  content_creator_tiktok_id: this.socialHandleForm.get('tiktokID')?.value ?? '',
                  content_creator_twitter_id: this.socialHandleForm.get('twitterID')?.value ?? '',
                  content_creator_status: "ACTIVE",
                  content_creator_created_date: now,
                  content_creator_is_deleted: false
                }
            this.api
            .CreateVuugleContentCreators(vuugleContentCreator)
            .then((result) => {
                console.log('------>',result);
                this.router.navigate(['/authentication']);
            })
            .catch((e) => {
                console.log('error creating Country...', e);
            });
        }
    }


  /**
   * Function to check vuugle ID is available
   * @param evt
   */
  isVuugleIdUnique(evt){
    this.api.GetContentCreatorByVuugleId(evt.target.value)
          .then((result) => {
              if(result.items.length > 0) {
                  this.basicDetailForm.controls['vuugleID'].setErrors({alreadyExist:true})
                  this.isUniqueVuugleId = true;
                  this._cd.markForCheck();
              }
          })
          .catch((e) => {
              console.log('error ...', e);
          });
  }

  /**
   * Function to submit customer registration form
   */
    saveImages(base64Image, type): Promise<boolean>{
      return new Promise((resolve) => {
        if(base64Image ) {
            let params = {
                "file_content": base64Image,
                "user_access_key": "",//"AKIA5B37RHAV4ZGUIGFO",
                "user_access_secret_key": "",//"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",
                "aws_region": "us-east-1",
                "s3_bucket": "vuugleuser"
              };
            let API_END_POINT =  environment.s3_public_url;
            this.utilityService.apiReq('post', API_END_POINT, params).subscribe(response => {
                if(response.status){
                  if(type == 'profile') {
                    this.user.picture = response.image_path;
                  }
                  if(type == 'cover') {
                    this.user.coverpicture = response.image_path;
                  }
                }
                resolve(true);
            }, err => {
                resolve(true);
            });
        } else {
          resolve(true);
        }
      })
  }

  /**
   * Function to get country list
   */
  getCountryList(): void{
    let filter = {
                  country_is_deleted: {eq: false},
                  country_status: {eq: "ACTIVE"}
                };
    this.api
            .ListCountries(filter)
            .then((result) => {
                this.countyList = result.items;
            })
            .catch((e) => {
                console.log('error creating Country...', e);
            });
  }

  /**
   * Function to get state list by country id
   * @param evt
   */
  getStateList(evt): void{
    let countryId = evt.value;
    this.api
    .QueryStatesByCountryIdStateIdIndex(countryId)
    .then((result) => {
        this.stateList = result.items;
      })
      .catch((e) => {
          console.log('error creating Country...', e);
      });
  }

  /**
   * Function to get city list by state id
   * @param evt
   */
    getCityList(evt): void{
      let stateId = evt.value;
      this.api
      .QueryCitiesByStateIdIndex(stateId)
      .then((result) => {
          this.cityList = result.items;
        })
        .catch((e) => {
            console.log('error creating Country...', e);
        });
    }

}
