import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/models/user.model';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public currentUser: User;
  public hasBaseDropZoneOver: boolean = false;
  constructor(private jwtAuth: AuthService) { }

  ngOnInit() {

    this.currentUser = this.jwtAuth.getCurrentUserData();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
