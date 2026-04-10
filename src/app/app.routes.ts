import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainDashboardComponent } from './application/main-dashboard/main-dashboard.component';
import { LoginComponentComponent } from './application/login-component/login-component.component';
import { AllCasesComponent } from './application/cases/all-cases/all-cases.component';
import { ViewSelectedCaseComponent } from './application/cases/view-selected-case/view-selected-case.component';
import { ViewClientCaseConnectionsComponent } from './application/client-connections/view-client-case-connections/view-client-case-connections.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },

    { path: 'login', component: LoginComponentComponent },

    {
        path: '',
        component: MainLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'profile',
                // canActivate:[RoleGuardService],
                // data: { roles: ['Collection Centre Manager', 'Collection Centre Head', 'Distribution Centre Manager', 'Distribution Centre Head'] },
                children: [
                    // {
                    //     path: '',
                    //     component: ProfileComponent
                    // },

                ]
            },

            
            {
                path: 'dashbord',
                component: MainDashboardComponent
            },

            {
                path: 'cases',
                children: [

                  {
                        path: '',
                        component: AllCasesComponent
                  },
                  {
                    path: 'view-selected-case/:id',
                    component: ViewSelectedCaseComponent
                  }
                ]
            },

            {
                path: 'connections',
                children: [

                  {
                        path: '',
                        component: ViewClientCaseConnectionsComponent
                  },
                //   {
                //     path: 'view-selected-case/:id',
                //     component: ViewSelectedCaseComponent
                //   }
                ]
            }
            
            

        ]
    },
];
