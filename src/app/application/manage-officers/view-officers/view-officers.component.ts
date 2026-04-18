import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreService } from './../../../services/core-service/core.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'

@Component({
  selector: 'app-view-officers',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule],
  templateUrl: './view-officers.component.html',
  styleUrl: './view-officers.component.css'
})
export class ViewOfficersComponent implements OnInit {
  itemsArr!: CenterData[];
  searchText: string = '';
  selectProvince: string = '';
  selectDistrict: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isLoading: boolean = true;
  hasData: boolean = false;

  constructor(
      private router: Router,
      private coreSrv: CoreService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void { 
      this.fetchRegistrarOfficers();
  }


  fetchRegistrarOfficers(search: string = this.searchText) {
      this.isLoading = true;
      this.coreSrv.getRegistrarOfficers(this.currentPage, this.itemsPerPage, search).subscribe(
          (res) => {
              this.itemsArr = res.items;
              this.totalItems = res.totalItems;
              this.hasData = res.items.length > 0 ? true : false;
              this.isLoading = false;
          }
      );
  }

  onPageChange(page: number) {
      this.currentPage = page;
      this.fetchRegistrarOfficers();
  }

  onSearch() {
      this.searchText = this.searchText?.trim() || '';
      this.currentPage = 1; 
      this.fetchRegistrarOfficers();
  }

  offSearch() {
      this.searchText='';
      this.fetchRegistrarOfficers();
  }

  getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  navigateToDashboard(id: number) {
    console.log('clicke')
      this.router.navigate([`/courts/court-dashboard/${id}`]);
  }


addClerk() {
      this.router.navigate([`/manage-officers/create-clerk`]);
  }

}

class CenterData {
  id!: number
  firstname!: string
  lastname!: string
  createdat!: Date
  officerrole!: string;
  officercode!: string;
  phonecode01!: string;
  phonenumber01!: string;
  district!: string;
  province!: string;
}
