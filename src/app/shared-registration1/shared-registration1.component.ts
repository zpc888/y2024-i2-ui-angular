import {Component, input} from '@angular/core';
import {UserAccount, UserProfileMode} from "../user-account";

@Component({
  selector: 'app-shared-registration1',
  standalone: true,
  imports: [],
  templateUrl: './shared-registration1.component.html',
  styleUrl: './shared-registration1.component.css'
})
export class SharedRegistration1Component implements OnInit {
  @input() initMode: UserProfileMode = 'New';
  currentMode: UserProfileMode = 'New';
  @input() userAccount: UserAccount | null = null;

  ngOnInit() {
    this.currentMode = this.initMode;
  }

}
