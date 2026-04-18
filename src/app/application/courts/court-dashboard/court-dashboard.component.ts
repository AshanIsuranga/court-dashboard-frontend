
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreService } from './../../../services/core-service/core.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'


@Component({
  selector: 'app-court-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './court-dashboard.component.html',
  styleUrl: './court-dashboard.component.css'
})
export class CourtDashboardComponent implements OnInit {

  courtId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coreSrv: CoreService

  ) {
  }

  ngOnInit(): void {
    this.courtId = this.route.snapshot.params['id'];    
  }

    navigateToCourtOfficers() {
      const id = this.courtId
      this.router.navigate([`/courts/court-officers/${id}`]);
  }
}
