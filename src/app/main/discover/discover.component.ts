import { Component, OnInit } from '@angular/core';
import { APIService } from '../../API.service';
import { IUser, CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  contentCreatorsList: any = [];
  contentCreatorFav  : any = [];
  contentCreatorUserID : any;
  constructor(
    private api: APIService,
    private cognitoService: CognitoService
  ) {
    this.getContentCreatorsList();
  }

  ngOnInit(): void {
  }
  /**
   * Function to get content creators list..
   */
  async getContentCreatorsList(){
      let filter = {
        content_creator_is_deleted: {eq: false},
        content_creator_status: {eq: "ACTIVE"}
      };
      let userId = this.cognitoService.getLoginUserUuid(); //Login user uuid
      this.api
          .ListVuugleContentCreators(await userId,filter,10)
          .then((result) => {
              this.contentCreatorsList = result.items;
          })
          .catch((e) => {
              console.log('error fetch content creator...', e);
          });
   }
  /**
   * Function to submit user Fav list
   */
   async submitUserFavList(contentCreatorUserID) {
      let data: any = {
        user_id: await this.cognitoService.getLoginUserUuid(),
        content_creator_user_id: contentCreatorUserID,
        user_fav_list_created_date: '2023-02-07T12:13:12.400Z',
        user_fav_list_status: 'ACTIVE',
      };
      this.api
          .CreateUserfavlist(data)
          .then((result) => {
            console.log('success content creator added to fav list...');
          })
          .catch((e) => {
              console.log('error content creator added to fav list...', e);
          });
   }
  /**
   * Function to submit user Fav list
   */
   submitDeleteUserFavList(contentCreatorUserID) {
    let data = {
      id: contentCreatorUserID
    };
    this.api
        .DeleteUserfavlist(data)
        .then((result) => {
          console.log('success content creator deleted from fav list...');
        })
        .catch((e) => {
            console.log('error content creator deleted from fav list...', e);
        });
    }
}


function user_id(user_id: any, arg1: string, filter: { content_creator_is_deleted: { eq: boolean; }; content_creator_status: { eq: string; }; }) {
  throw new Error('Function not implemented.');
}

