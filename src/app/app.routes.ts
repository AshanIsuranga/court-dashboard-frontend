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
import { ViewOfficersComponent } from './application/manage-officers/view-officers/view-officers.component';
import { CreataClerkComponent } from './application/manage-officers/creata-clerk/creata-clerk.component';
import { CreateACaseComponent } from './application/cases/create-a-case/create-a-case.component';
import { ApprovedConnectionsComponent } from './application/client-connections/approved-connections/approved-connections.component';
import { RejecteConnectionsComponent } from './application/client-connections/rejecte-connections/rejecte-connections.component';
import { PendingLegalProfessionalsComponent } from './application/legal-professionals/pending-legal-professionals/pending-legal-professionals.component';
import { ApprovedLawyersComponent } from './application/legal-professionals/approved-lawyers/approved-lawyers.component';

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
                      path: 'approved-connections',
                      data: { roles: ['Registrar', 'Clerk'] },
                      component: ApprovedConnectionsComponent
                },

                {
                      path: 'rejected-connections',
                      data: { roles: ['Registrar', 'Clerk'] },
                      component: RejecteConnectionsComponent
                },

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
                  },
                  {
                        path: 'add-a-case',
                        component: CreateACaseComponent
                  },
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
                path: 'lawyers',
                children: [

                  {
                        path: '',
                        component: PendingLegalProfessionalsComponent
                  },

                  {
                        path: 'approved-lawyer',
                        component: ApprovedLawyersComponent
                  },

                  {
                        path: 'rejected-lawyer',
                        component: ApprovedLawyersComponent
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

             {
                path: 'manage-officers',
                children: [

                  {
                        path: '',
                        component: ViewOfficersComponent
                  },

                  {
                        path: 'create-clerk',
                        component: CreataClerkComponent
                  },
                ]
            },
            
            

        ]
    },
];
