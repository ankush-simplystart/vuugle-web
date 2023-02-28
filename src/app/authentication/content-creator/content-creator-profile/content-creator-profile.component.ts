import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';

@Component({
  selector: 'app-content-creator-profile',
  templateUrl: './content-creator-profile.component.html',
  styleUrls: ['./content-creator-profile.component.css']
})
export class ContentCreatorProfileComponent implements OnInit {
  contentCreatorUserID : any;
  constructor(
    private api: APIService,
  ) {
    this.contentCreatorDetail(this.contentCreatorUserID);
  }

  ngOnInit(): void {
  }

  /**
   * Function to get content creators profile
   */
   contentCreatorDetail(contentCreatorUserID): void{
    this.api
        .GetVuugleContentCreators(contentCreatorUserID)
        .then((result) => {
          console.log('success content creator profile detail...');
        })
        .catch((e) => {
          console.log('error content creator profile detail...');
        });
   }

}
