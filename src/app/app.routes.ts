import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainDashboardComponent } from './application/main-dashboard/main-dashboard.component';
import { LoginComponentComponent } from './application/login-component/login-component.component';
import { AllCasesComponent } from './application/cases/all-cases/all-cases.component';
import { ViewSelectedCaseComponent } from './application/cases/view-selected-case/view-selected-case.component';
import { ViewClientCaseConnectionsComponent } from './application/client-connections/view-client-case-connections/view-client-case-connections.component';
import { CreateScheduleComponent } from './application/scheduling/create-schedule/create-schedule.component';

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
              path: 'connections',
              children: [

                {
                      path: '',
                      component: ViewClientCaseConnectionsComponent
                },
                // {
                //   path: 'view-selected-case/:id',
                //   component: 
                // }
              ]
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

            // {
            //     path: 'schedule',
            //     children: [

            //       {
            //             path: '',
            //             component: AllCasesComponent
            //       },
            //       {
            //         path: 'create-schedule-for-case/:id',
            //         component: CreateScheduleComponent
            //       }
            //     ]
            // },

            {
                path: 'hearing',
                children: [

                  {
                        path: 'create-schedule-for-case/:id',
                        component: CreateScheduleComponent
                  },
                ]
            }
            
            

        ]
    },
];
