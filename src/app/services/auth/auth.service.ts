import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationSubject: BehaviorSubject<any>;
  private activeUser: any;
  constructor() { 
    Amplify.configure({
        Auth: environment.cognito,
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

 isLoggedIn(): Promise<boolean>{
     let isAuth = false;
    let poolData = {
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve) => {
      if (cognitoUser != null) {
        cognitoUser.getSession(async(err: any, session: any) => {
          if (err) {
            console.log(err.message || JSON.stringify(err));
          }
          isAuth = session.isValid();
          if(isAuth == false){
            Auth.signOut({global: true});
            resolve(false);
          } else {
            isAuth = await this.getJwtToken();
            resolve(isAuth);
          }
        })
      } else { 
        resolve(isAuth);
      }
    })
  }

 async getJwtToken(): Promise<boolean>{
  try {
    this.activeUser = await Auth.currentAuthenticatedUser();
    if (!this.activeUser) {
      return false;
    }

    const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        return new Promise((resolve) => {
          cognitoUser.refreshSession(currentSession['refreshToken'], (err, session) => {
              if (err) {
                this.logout();
                resolve(false);
              }
             // alert(currentSession.getIdToken())
              this.activeUser.setSignInUserSession(session);
              session.getIdToken().getJwtToken();
              resolve(true);
          })
        })
    } catch(error){
      return false;
    }
    // const signInUserSession = this.activeUser.getSignInUserSession();
    // const idToken = signInUserSession ? signInUserSession.getIdToken() : null;
    // console.log(idToken,"======>>>>>>",signInUserSession)
    // if (!idToken || idToken.getExpiration() * 1000 <= Date.now()) {
    //   alert("hhhh")
    //   if (!signInUserSession.isValid()) {
    //     const refreshToken = signInUserSession.getRefreshToken();
    //     return new Promise((resolve) => {
    //       alert("gggg")
    //       this.activeUser.refreshSession(refreshToken, (err, session) => {
    //         if (err) {
    //           resolve(this.logout());
    //         }
    //         this.activeUser.setSignInUserSession(session);
    //         resolve(session.getIdToken().getJwtToken());
    //       })
    //     });
    //   }
    //   return Promise.resolve(idToken.getJwtToken());
    // }

    // return Promise.resolve(idToken.getJwtToken());
  }

  async logout(){
    Auth.signOut({global: true});
    localStorage.clear();
    return false;
  }

  async currentAuthenticatedUser(): Promise<boolean>{
    let sessionExpired: boolean = true;
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(currentSession['refreshToken'], (err, session) => {
          console.log('session', err, session);
          //const { idToken, refreshToken, accessToken } = session;
          console.log("******",err);
          console.log("******",session['idToken'])
          if(session['idToken'] == null) {
            sessionExpired = false;
          }
          return sessionExpired;
          // do whatever you want to do now :)
        }).catch((error) => {
            Auth.signOut({global: true});
            localStorage.clear();
            sessionExpired = false;
            return sessionExpired;
        });
      } catch (e) {
        // await Auth.signOut({global: true});
        // localStorage.clear();
        // sessionExpired = false;
        //console.log('Unable to refresh Token', e);
        return sessionExpired;
      }

    // await Auth.currentUserInfo().then(async (user: any) => {
    //               if(user.username) {
    //                 let currentSession = await Auth.currentSession();
    //                 if(!currentSession['accessToken']) {
    //                   await Auth.signOut({global: true});
    //                   localStorage.clear();
    //                   sessionExpired = false;
    //                 }
    //               } else {
    //                 sessionExpired = false;
    //               }
    //           }).catch((error) => {
    //             alert(error.message)
    //             sessionExpired = true;
    //           });
    
    
  }

  async getCurrentUser(): Promise<any> {
    return await Auth.currentUserInfo();
}
}