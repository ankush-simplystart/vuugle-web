import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { LyDialog } from '@alyle/ui/dialog';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { IUser, CognitoService } from '../../../services/cognito.service';
import { GenericValidatorComponent } from '../../../shared/generic-validator/generic-validator.component';
import { UtilityService } from '../../../services/utility.service';
import { CropperDialog } from 'src/app/shared/cropper/cropper-dialog';
import { environment } from 'src/environments/environment';
import { APIService, Country, VuugleUsers } from 'src/app/API.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class CustomerSignupComponent implements OnInit {
    cropped?: string = "";
    profileImagePath?: string = "../../assets/image/svg/avtaricon.svg";
    isAuthenticated: boolean;
    errorMessage: string;
    maskEmail:string;
    isConfirm: boolean;
    user: IUser;
    public showProgressBar: boolean = false;
    registerForm: any;
    public flag= false;
    cognitoUserId: string = "";

    constructor(
        private utilityService: UtilityService,
        private router: Router,
        private fb: FormBuilder,
        private cognitoService: CognitoService,
        private genericValidator: GenericValidatorComponent,
        private _dialog: LyDialog,
        private _cd: ChangeDetectorRef,
        private api: APIService
    ) {
        console.log(this.cognitoService.getLoginUserUuid())
        this.cognitoUserId = "";
        this.isAuthenticated = false;
        this.showProgressBar = false;
        this.isConfirm = false;
        this.user = {} as IUser;
    }

    ngOnInit(){
        this.formInitilize();
        this.cognitoService.isAuthenticated()
            .then((success: boolean) => {
                this.isAuthenticated = success;
                this.getCustomerProfile();
                this.formInitilize();
            });
    }
    /**
     * Function to initilize form fields
     */
    formInitilize(): void {
        if (this.isAuthenticated) {
            this.registerForm = this.fb.group({
                name: ['', Validators.compose([Validators.required, this.genericValidator.nameValidator,Validators.minLength(2),Validators.maxLength(50)])],
                email: ['', [Validators.required,Validators.email]],
                password: [''],
                confirm_password: [''],
                country: ['', Validators.required],
                gender: ['', Validators.required],
                acknowlegment: ['']
            });
        } else {
            this.registerForm = this.fb.group({
                name: ['', Validators.compose([Validators.required, this.genericValidator.nameValidator,Validators.minLength(2),Validators.maxLength(50)])],
                email: ['', [Validators.required,Validators.email]],
                password: ['', [Validators.required, this.genericValidator.passwordValidator,Validators.minLength(8),Validators.maxLength(32)]],
                confirm_password: ['', Validators.required],
                gender: ['', Validators.required],
                country: ['', Validators.required],
                acknowlegment: ['', Validators.required],
            }, {
                validator: this.genericValidator.confirmPasswordValidator('password', 'confirm_password')
              });
        }
    }
    /**
     * Function to call customer profile function as per user authontication
     */
    submitRegistrationForm(): void {
        if (this.registerForm.valid) {
            this.user = {
                "email": this.registerForm.get('email')?.value ?? '',
                "name": this.registerForm.get('name')?.value ?? '',
                "gender": this.registerForm.get('gender')?.value ?? '',
                "country": this.registerForm.get('country')?.value ?? '',
                "password": this.registerForm.get('password')?.value ?? '',
                "picture": this.profileImagePath,
                "showPassword": false,
                "code": "",
                "coverpicture": ""
            }
            if (!this.isAuthenticated) {
                this.signUpCustomer();
            } else {
                this.updateCustomerProfile();
            }
        }
    }
    /**
     * Function to submit customer registration form
     */
    signUpCustomer(){
        if(this.cropped && this.cropped != undefined) {
            let params = {
                "file_content": this.cropped,
                "user_access_key": "",//"AKIA5B37RHAV4ZGUIGFO",
                "user_access_secret_key": "",//"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",
                "aws_region": "us-east-1",
                "s3_bucket": "vuugleuser"
              };
            let API_END_POINT =  environment.s3_public_url;
            this.utilityService.apiReq('post', API_END_POINT, params).subscribe(response => {
                if(response.status){
                    this.user.picture = response.image_path;
                    this.signUpCustomerInCognito();
                }
            }, err => {
                this.showProgressBar = false;
                console.log('SAVE ERROR', err);
            });
        } else {
            this.user.picture = this.cropped;
            this.signUpCustomerInCognito();
        }
    }
    /**
     * Function to add customer in Cognito
     */
    signUpCustomerInCognito(){
        this.showProgressBar = true;
        this.errorMessage = "";
        this.cognitoService.signUp(this.user)
            .then((res) => {
                this.cognitoUserId = res.userSub;
                // console.log(res,"+++++++++++++",res.userConfirmed,"======",res.userSub)
                if(res && res.CodeDeliveryDetails && res.CodeDeliveryDetails.Destination) {
                    this.maskEmail = res.CodeDeliveryDetails.Destination;
                } else {
                    if (this.user.email) {
                        let splitEmail = this.user.email.split('@');
                        var last2char = splitEmail[0].slice(-2);
                        this.maskEmail = "*****" + last2char + "@" + splitEmail[1];
                    }
                }
                this.isConfirm = true;
                this.showProgressBar = false;
                this._cd.markForCheck();
            }).catch((error) => {
                this.errorMessage = error.message;
                this.showProgressBar = false;
                this._cd.markForCheck();
            });
    }

    /**
     * Function to verify customer signup request after OTP verification
     * @param evt
     */
    public confirmSignUp(evt): void {
        this.showProgressBar = true;
        if(evt) {
            this.user.code      = evt;
            this.errorMessage   = "";
            this.cognitoService.confirmSignUp(this.user)
            .then(() => {
                this.saveCustomerInfoInGraphQl();
            }).catch((error) => {
                this.showProgressBar = false;
                this.errorMessage = error.message;
                this._cd.markForCheck();
            });
        }
    }

    /**
     * Function to add user profile data in graphql
    */
    public saveCustomerInfoInGraphQl(): void {
        if(this.cognitoUserId) {
            const now = new Date();
            let vuugleUser:any;
            vuugleUser = {
                user_id: this.cognitoUserId,
                user_name: this.user?.name ?? '',
                user_profile_image: this.user?.picture ?? '',
                user_status: "ACTIVE",
                user_created_date: now,
                user_type: "CUSTOMER",
                user_is_deleted: false
                }
            this.api
            .CreateVuugleUsers(vuugleUser)
            .then(() => {
                console.log('User registered successfully.');
                this.router.navigate(['/authentication/sign-in']);
            })
            .catch((e) => {
                console.log('error creating Country...', e);
            });
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
     * Function to get customer profile
     */
    public getCustomerProfile(): void {
        this.cognitoService.getUser()
            .then((user: any) => {
                if(user) {
                    this.user = user.attributes;
                    this.registerForm.patchValue({
                        name: this.user.name,
                        email: this.user.email,
                        gender: this.user.gender,
                        country: this.user["custom:country"]
                    })
                    if(this.user.picture && this.user.picture != "") {
                        this.profileImagePath = this.user.picture;
                    }
                    this._cd.markForCheck();
                }
        });
    }

    /**
     * Function to update customer profile
     */
    async updateCustomerProfile(){
        this.showProgressBar = true;
        let userId = await this.cognitoService.getLoginUserUuid();
        let profile = {
            name: this.registerForm.get('name')?.value ?? '',
            email: this.registerForm.get('email')?.value ?? '',
            gender: this.registerForm.get('gender')?.value ?? '',
            country: this.registerForm.get('country')?.value ?? '',
            picture: this.registerForm.get('picture')?.value ?? '',
        }
        if(this.cropped && this.cropped != undefined) {
            let params = {
                "file_content": this.cropped,
                "user_access_key": "",//"AKIA5B37RHAV4ZGUIGFO",
                "user_access_secret_key": "",//"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",
                "aws_region": "us-east-1",
                "s3_bucket": "vuugleuser"
              };
            let API_END_POINT =  environment.s3_public_url;
            this.utilityService.apiReq('post', API_END_POINT, params).subscribe(async (response) => {
                if(response.status){
                    profile.picture = response.image_path;
                    await this.updateCognitoCustomerProfile(profile);
                    await this.updateCustomerInfoInGraphQl(userId,profile);
                }
            }, err => {
                this.showProgressBar = false;
                this._cd.markForCheck();
            });
        } else {
            profile.picture = this.profileImagePath;
            await this.updateCognitoCustomerProfile(profile);
            await this.updateCustomerInfoInGraphQl(userId,profile);
        }
    }

    /**
     * Update customer profile data in AWS Cognito
     * @param profile
     */
    updateCognitoCustomerProfile(profile){
        this.cognitoService.updateUserProfile(profile)
            .then((user: any) => {
                this.showProgressBar = false;
                this._cd.markForCheck();
            }).catch((error) => {
                console.log(error.message)
                this.showProgressBar = false;
                this._cd.markForCheck();
            });
    }

    /**
     * Function to update user profile data in graphql
    */
    public updateCustomerInfoInGraphQl(userId,profile): void {
        if(userId) {
            if(profile.picture && profile.picture == "../../assets/image/svg/avtaricon.sv") {
                profile.picture = "";
            }
            const now = new Date();
            let vuugleUser:any;
            vuugleUser = {
                    user_id: userId,
                    user_name: profile?.name ?? '',
                    user_profile_image: profile?.picture ?? '',
                    user_updated_date: now,
                    user_status: "ACTIVE",
                    user_is_deleted: false
                };
            this.api
            .UpdateVuugleUsers(vuugleUser)
            .then(() => {
                console.log('User updated successfully.');
            })
            .catch((e) => {
                console.log('error creating Country...', e);
            });
        }
    }

    public changePassword() {
        this.showProgressBar = true;
        this.cognitoService.changePassword("!Password4321", "!Password43210")
        .then((user: any) => {
            console.log(user)
            this.showProgressBar = false;
        }).catch((error) => {
            console.log(error.message)
            this.showProgressBar = false;
        });
    }

    /**
     * Function to open popup crop image popup
     * @param event
     */
    openCropperDialog(event: Event) {
        this.cropped = null!;
        let windowWidth           = 320;
        event['configWidth']      = 150;
        event['configHeight']     = 150;
        event['outputWidth']      = 100;
        event['outputHeight']     = 100;
        event['round']            = true;
        event['cropperWindowMaxWidth']    = "320px";
        event['cropperWindowHeight']      = "320px";
        event['cropperWindowSliderWidth'] = "80%";

        this._dialog.open<CropperDialog, Event>(CropperDialog, {
            data: event,
            width: windowWidth,
            disableClose: true
        }).afterClosed.subscribe((result?: ImgCropperEvent) => {
            if (result) {
                this.cropped = result.dataURL;
                this._cd.markForCheck();
            }
        });
    }
}
