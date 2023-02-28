import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import { environment } from '../../environments/environment';

export interface IUser {
    email: string;
    password: string;
    showPassword: boolean;
    code: string;
    name: string;
    gender: string;
    country: string;
    coverpicture: string;
    picture: string;
}

export interface IUserContentCreator {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  website: string;
  phoneNo: string;
  addressLine1: string;
  country: string;
  picture: string;
  coverpicture: string;
}
@Injectable({
    providedIn: 'root',
})
export class CognitoService {
    private authenticationSubject: BehaviorSubject<any>;
    constructor() {
        Amplify.configure({
            Auth: environment.cognito,
        });
        this.authenticationSubject = new BehaviorSubject<boolean>(false);
    }

    /**
     * Function to signup new user
     * @param user
     * @returns
     */
    public signUp(user: IUser): Promise<any> {
        return Auth.signUp({
            "username": user.email,
            "password": user.password,
            attributes: {
                "name": user.name,
                "gender": user.gender,
                "picture": user.picture,
                "custom:country": user.country,
                "custom:groupname": "vuugle_customer"
                // "custom:cover-picture": this.coverpicture,
            }
        });
    }

      /**
     * Function to signup new user
     * @param user
     * @returns
     */
       public signUpContentCreator(user: IUserContentCreator): Promise<any> {
        return Auth.signUp({
          "username": user.email,
          "password": user.password,
          attributes: {
              "name": user.name,
              "website": user.website,
              "phone_number": user.phoneNo,
              "address": user.addressLine1,
              "custom:country": user.country,
              "picture": user.picture,
              "custom:cover-picture": user.coverpicture,
              "custom:groupname": "vuugle_content_creator"
          }
      });
    }

    /**
     * Function to check signup confirmation
     * @param user
     * @returns
     */
    public confirmSignUp(user: IUser): Promise<any> {
        return Auth.confirmSignUp(user.email, user.code);
    }

      /**
     * Function to check signup confirmation
     * @param user
     * @returns
     */
    public confirmSignUpContentCreator(user: IUserContentCreator): Promise<any> {
        return Auth.confirmSignUp(user.email, user.code);
    }

    /**
     * Function to sigin with email & password
     * @param user
     * @returns
     */
    public signIn(user: IUser): Promise<any> {
        return Auth.signIn(user.email, user.password)
            .then(() => {
                this.authenticationSubject.next(true);
            });
    }

    /**
     * Function to sigin with email & password
     * @param user
     * @returns
     */
     public signInContentCreator(user: IUserContentCreator): Promise<any> {
        return Auth.signIn(user.email, user.password)
        .then(() => {
            this.authenticationSubject.next(true);
        });
      }

    /**
     * Function to signout
     * @returns
     */
    public async signOut(): Promise<any> {
        try {
            return await Auth.signOut({global: true})
                    .then(() => {
                        this.authenticationSubject.next(false);
                    }).catch((error) => {
                        console.log('API error signing out: ', error);
                    });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    /**
     * Function to check user is login or not
     * @returns
     */
    public isAuthenticated(): Promise<boolean> {
        if (this.authenticationSubject.value) {
            return Promise.resolve(true);
        } else {
            return this.getUser()
                .then((user: any) => {
                    if (user) {
                        return true;
                    } else {
                        return false;
                    }
                }).catch(() => {
                    return false;
                });
        }
    }

    /**
     * Function to get login user profile data
     * @returns object
     */
    public getUser(): Promise<any> {
        return Auth.currentUserInfo();
    }

    /**
     * Function to update user profile
     * @param profile object
     * @returns
     */
    async updateUserProfile(profile) {
        const user = await Auth.currentAuthenticatedUser();
        return Auth.updateUserAttributes(user, {
            "name": profile.name,
            "gender": profile.gender,
            "email": profile.email,
            "custom:country": profile.country,
            "picture": profile.picture
        });
    }

    /**
     * Function to change password
     * @param oldPassword
     * @param newPassword
     */
    async changePassword(oldPassword, newPassword) {
        const user = await Auth.currentAuthenticatedUser();
        return Auth.changePassword(user, oldPassword, newPassword)
    }

    /**
     * Function to send reset password code
     * @param username
     * @returns
     */
    async forgotPassword(username) {
        try {
            return Auth.forgotPassword(username);
        } catch (err) {
            return false;
        }
    }

    /**
     * Function to reset password
     * @param username
     * @param code
     * @param new_password
     * @returns
     */
    async forgotPasswordSubmit(username, code, new_password) {
        try {
            return Auth.forgotPasswordSubmit(username, code, new_password)
        } catch (err) {
            return false;
        }
    }

    /**
     * Function to resend signup code
     * @param user object
     */
    async resendConfirmationCode(user: IUser) {
        return await Auth.resendSignUp(user.email);
    }


    async federatedGoogleSignIn() {
        await Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google
        }).then(cred => {
            console.log("++++=====", cred);
        }).catch(e => {
            console.log("++++", e);
        });
    }

    async federatedFacebookSignIn() {
        const user = await Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Facebook,
        }).then(cred => {
            // If success, you will get the AWS credentials
            console.log("=======================", cred);
            return Auth.currentAuthenticatedUser();
        });
        //return user;
    }

    async getLoginUserUuid(){
        const userInfo = await Auth.currentAuthenticatedUser();
        return userInfo.username;
    }

}
