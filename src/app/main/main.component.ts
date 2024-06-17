import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IUsersApi } from "../type/apiusers.interface";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { AdduserComponent } from "../adduser/adduser.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  public users: IUsersApi[] = []
  public dtTrigger: Subject<any> = new Subject<any>()


  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {
    this.fetchUsers()
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteUser(user: IUsersApi) {
    if (confirm('Are your sure you want to delete user?')) {
      this.users = this.users.filter(u => u !== user)
    }
  }

  fetchUsers() {
    this.http.get<{ results: IUsersApi[] }>('https://randomuser.me/api/?results=5')
      .subscribe(response => {
        console.log('Response:', response)
        this.users = response.results
        this.userService.setUsers(this.users)
        this.dtTrigger.next(null)
      });
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      data: {
        user: {
          registered: {
            date: new Date().toISOString().slice(0, 10)
          },
          name: {
            first: '',
            last: ''
          },
          email: ''
        }
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.push(result)
      }
    })
  }
}
