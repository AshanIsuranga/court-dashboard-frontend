import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainDashboardComponent } from './application/main-dashboard/main-dashboard.component';
import { LoginComponentComponent } from './application/login-component/login-component.component';
import { AllCasesComponent } from './application/cases/all-cases/all-cases.component';
import { ViewSelectedCaseComponent } from './application/cases/view-selected-case/view-selected-case.component';
import { ViewClientCaseConnectionsComponent } from './application/client-connections/view-client-case-connections/view-client-case-connections.component';
import { CreateScheduleComponent } from './application/scheduling/create-schedule/create-schedule.component';
import { ManageCourtsComponent } from './application/courts/manage-courts/manage-courts.component';
import { CreateACourtComponent } from './application/courts/create-a-court/create-a-court.component';
import { CourtDashboardComponent } from './application/courts/court-dashboard/court-dashboard.component';
import { CourtOfficersComponent } from './application/courts/court-officers/court-officers.component';
import { CreateRegistarComponent } from './application/courts/create-registar/create-registar.component';

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
                      data: { roles: ['Registrar', 'Clerk'] },
                      component: ViewClientCaseConnectionsComponent
                },
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


            {
                path: 'hearing',
                children: [

                  {
                        path: 'create-schedule-for-case/:id',
                        component: CreateScheduleComponent
                  },
                ]
            },

            {
                path: 'courts',
                children: [

                  {
                        path: '',
                        component: ManageCourtsComponent
                  },
                  {
                    path: 'add-a-court',
                    component: CreateACourtComponent
                  },

                  {
                    path: 'court-dashboard/:id',
                    component: CourtDashboardComponent
                  },

                  {
                    path: 'court-officers/:id',
                    component: CourtOfficersComponent
                  },

                  {
                    path: 'create-registrar/:id',
                    component: CreateRegistarComponent
                  }
                  
                ]
            },
            
            

        ]
    },
];
