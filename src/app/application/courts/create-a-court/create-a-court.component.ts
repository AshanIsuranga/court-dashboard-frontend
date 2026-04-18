// view-centers.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreService } from './../../../services/core-service/core.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'

@Component({
  selector: 'app-create-a-court',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule],
  templateUrl: './create-a-court.component.html',
  styleUrl: './create-a-court.component.css'
})
export class CreateACourtComponent {

  isLoading: boolean = false;

  constructor(
      private router: Router,
      private coreSrv: CoreService
  ) { }
}
