import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public existGithubUser = false;
  public currentUser;
  public id: string;
  public routeParam$: Subscription;

  displayedColumns = ['language', 'default_branch', 'clone_url', 'name', 'description'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.routeParam$ = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(this.cookieService.get(this.id));
    this.populateTable();
  }

  populateTable() {
    this.userService.get(this.currentUser.githubUser).subscribe((repos) => {
      this.existGithubUser = (repos.length > 0);
      this.dataSource = new MatTableDataSource<any>(repos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  goToDashboard(){
    this.router.navigate(['dashboard'])
  }

  ngOnDestroy() {
    this.routeParam$.unsubscribe();
  }
}
