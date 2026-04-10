import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { StakeholderService } from '../../../../services/stakeholder/stakeholder.service';
// import { AdminRowComponent } from '../admin-row/admin-row.component';
// import { CollectionOfficerUsersRowComponent } from '../collection-officer-users-row/collection-officer-users-row.component';
// import { PlantcareUsersRowComponent } from '../plantcare-users-row/plantcare-users-row.component';
// import { SalesAgentsRowComponent } from '../sales-agents-row/sales-agents-row.component';
// import { DistributionOfficerUsersRowComponent } from '../distribution-officer-users-row/distribution-officer-users-row.component';
// import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
// import { jsPDF } from 'jspdf';
// import { DriverRowComponent } from '../driver-row/driver-row.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule,
    // HttpClientModule,
    // ProgressComponent,
    // OutOfDeliveryComponent,
    // OfficersComponent,
    // OfficerTargetComponent,
    // LoadingSpinnerComponent
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  activeTab: string = 'Progress';
  centerObj: CenterDetails = {
    centerId: null,
    centerName: '',
    centerRegCode: ''
  };
  cashPriceObj!: CashPrice;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // public tokenService: TokenService,
    // public permissionService: PermissionService,
    // private distributionHubService: DistributionHubService
  ) { }

  ngOnInit(): void {
    
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    // Update URL with tab query parameter without reloading
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tab },
      queryParamsHandling: 'merge'
    });
  }

  packingProgress() {
    const id = this.centerObj.centerId
    const name = this.centerObj.centerName
    const regCode = this.centerObj.centerRegCode
    this.router.navigate([`/distribution-hub/action/view-polygon-centers/order-packing-progress-dashboard/${id}`],
      {
        queryParams: { name, regCode }
      }
    );
  }

  officersTargets() {
    const id = this.centerObj.centerId
    const name = this.centerObj.centerName
    const regCode = this.centerObj.centerRegCode
    this.router.navigate([`/distribution-hub/action/view-polygon-centers/officer-and-target-dashboard/${id}`],
      {
        queryParams: { name, regCode }
      }
    );
  }

  driversVehicles() {
    const id = this.centerObj.centerId;
    this.router.navigate([`/distribution-hub/action/view-polygon-centers/view-distribution-drivers/${id}`]);
  }

  homeDeliveryOtherRecords() {

  }

  pickUpOrderRecords() {
    const id = this.centerObj.centerId
    const name = this.centerObj.centerName
    const regCode = this.centerObj.centerRegCode
    this.router.navigate([`/distribution-hub/action/view-polygon-centers/pikup-oder-records-main/${id}`],
      {
        queryParams: { name, regCode }
      }
    );
  }

  receivedCashToday() {
    const id = this.centerObj.centerId
    const name = this.centerObj.centerName
    const regCode = this.centerObj.centerRegCode
    this.router.navigate([`/distribution-hub/action/view-polygon-centers/received-cash-today/${id}`],
      {
        queryParams: { name, regCode }
      }
    );
  }

  homeDeliveryOrderRecords() {
    const id = this.centerObj.centerId
    const name = this.centerObj.centerName
    const regCode = this.centerObj.centerRegCode
    this.router.navigate([`/distribution-hub/action/view-polygon-centers/home-delivery-order-records`],
      {
        queryParams: { type: 'distribution', id, name, regCode }
      }
    );
  }

  back(): void {
    this.isLoading = true;
    this.router.navigate(['/distribution-hub/action/view-polygon-centers']).then(() => {
      this.isLoading = false;
    });
  }


}

interface CenterDetails {
  centerId: number | null;
  centerName: string;
  centerRegCode: string;
}

interface CashPrice{
  total_price:number;
  total_orders:number;
}
