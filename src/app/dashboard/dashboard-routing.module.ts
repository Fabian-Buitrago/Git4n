import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from '../user/components/user-form/user-form.component';
import { UserListComponent } from '../user/components/user-list/user-list.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', component: UserFormComponent },
            { path: 'UserList/:id', component: UserListComponent  }
        ]
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class DashboardRoutingModule { }