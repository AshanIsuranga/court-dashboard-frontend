// view-centers.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreService } from './../../../services/core-service/core.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'


@Component({
  selector: 'app-court-officers',
  standalone: true,
imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule],
  templateUrl: './court-officers.component.html',
  styleUrl: './court-officers.component.css'
})
export class CourtOfficersComponent implements OnInit {
  itemsArr!: CenterData[];
  searchText: string = '';
  selectProvince: string = '';
  selectDistrict: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isLoading: boolean = true;
  hasData: boolean = false;

  // Define all Sri Lanka provinces
  isProvinceDropdownOpen = false;
  isDistrictDropdownOpen = false;

  courtId!: number;

  provinces: string[] = [
      'Western',
      'Central',
      'Southern',
      'Northern',
      'Eastern',
      'North Western',
      'North Central',
      'Uva',
      'Sabaragamuwa'
  ];

  // Define all districts with their provinces
  allDistricts = [
      { name: 'Ampara', province: 'Eastern' },
      { name: 'Anuradhapura', province: 'North Central' },
      { name: 'Badulla', province: 'Uva' },
      { name: 'Batticaloa', province: 'Eastern' },
      { name: 'Colombo', province: 'Western' },
      { name: 'Galle', province: 'Southern' },
      { name: 'Gampaha', province: 'Western' },
      { name: 'Hambantota', province: 'Southern' },
      { name: 'Jaffna', province: 'Northern' },
      { name: 'Kalutara', province: 'Western' },
      { name: 'Kandy', province: 'Central' },
      { name: 'Kegalle', province: 'Sabaragamuwa' },
      { name: 'Kilinochchi', province: 'Northern' },
      { name: 'Kurunegala', province: 'North Western' },
      { name: 'Mannar', province: 'Northern' },
      { name: 'Matale', province: 'Central' },
      { name: 'Matara', province: 'Southern' },
      { name: 'Monaragala', province: 'Uva' },
      { name: 'Mullaitivu', province: 'Northern' },
      { name: 'Nuwara Eliya', province: 'Central' },
      { name: 'Polonnaruwa', province: 'North Central' },
      { name: 'Puttalam', province: 'North Western' },
      { name: 'Rathnapura', province: 'Sabaragamuwa' },
      { name: 'Trincomalee', province: 'Eastern' },
      { name: 'Vavuniya', province: 'Northern' },
  ];

  // Districts filtered by selected province
  filteredDistricts: { name: string, province: string }[] = [];

  constructor(
      private router: Router,
      private coreSrv: CoreService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.courtId = this.route.snapshot.params['id'];    
      this.fetchCourtOfficerDetails();
  }

  // Convert arrays to dropdown items format
get provinceItems() {
  return this.provinces.map(province => ({
      value: province,
      label: province
  }));
}

get districtItems() {
  const districts = this.selectProvince 
      ? this.allDistricts.filter(d => d.province === this.selectProvince)
      : this.allDistricts;
  
  return districts.map(district => ({
      value: district.name,
      label: district.name
  }));
}

// Handle province selection change
onProvinceChange(selectedProvince: string | null): void {
  this.selectProvince = selectedProvince || '';
  
  // Clear district selection when province changes
  if (!selectedProvince) {
      this.selectDistrict = '';
  } else {
      // Check if current district is still valid for the selected province
      const isDistrictValid = this.allDistricts.some(d => 
          d.name === this.selectDistrict && d.province === selectedProvince
      );
      if (!isDistrictValid) {
          this.selectDistrict = '';
      }
  }
  
  this.fetchCourtOfficerDetails();
}

// Handle district selection change
onDistrictChange(selectedDistrict: string | null): void {
  this.selectDistrict = selectedDistrict || '';
  
  // When district is selected, automatically set the province
  if (selectedDistrict) {
      const district = this.allDistricts.find(d => d.name === selectedDistrict);
      if (district && district.province !== this.selectProvince) {
          this.selectProvince = district.province;
      }
  }
  
  this.fetchCourtOfficerDetails();
}


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
      const provinceDropdownElement = document.querySelector('.custom-province-dropdown-container');
      const proinceDropdownClickedInside = provinceDropdownElement?.contains(event.target as Node);

      if (!proinceDropdownClickedInside && this.isProvinceDropdownOpen) {
          this.isProvinceDropdownOpen = false;
      }

      const districtDropdownElement = document.querySelector('.custom-district-dropdown-container');
      const districtDropdownClickedInside = districtDropdownElement?.contains(event.target as Node);

      if (!districtDropdownClickedInside && this.isDistrictDropdownOpen) {
          this.isDistrictDropdownOpen = false;
      }

  }

  fetchCourtOfficerDetails(courtId: number = this.courtId, province: string = this.selectProvince, district: string = this.selectDistrict, search: string = this.searchText) {
      this.isLoading = true;
      console.log('isLoading', this.isLoading)
      this.coreSrv.getCourtOfficerDetails(courtId, this.currentPage, this.itemsPerPage, province, district, search).subscribe(
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
      this.fetchCourtOfficerDetails();
  }

  onSearch() {
      this.searchText = this.searchText?.trim() || '';
      this.currentPage = 1; 
      this.fetchCourtOfficerDetails();
  }

  offSearch() {
      this.searchText='';
      this.fetchCourtOfficerDetails();
  }

  toggleProvinceDropdown() {
      this.isProvinceDropdownOpen = !this.isProvinceDropdownOpen;
      // Close district dropdown when opening province dropdown
      if (this.isProvinceDropdownOpen) {
          this.isDistrictDropdownOpen = false;
      }
  }

  selectProvinceOption(province: string) {
      this.selectProvince = province;
      this.isProvinceDropdownOpen = false;
      this.filterProvince();
  }

  clearProvinceFilter(event?: MouseEvent) {
      if (event) {
          event.stopPropagation(); // Prevent triggering the dropdown toggle
      }
      this.selectProvince = '';
      this.selectDistrict = ''; // Also clear district when province is cleared
      this.updateFilteredDistricts(); // Update district list
      this.fetchCourtOfficerDetails();
  }

  // District dropdown methods
  toggleDistrictDropdown() {
      this.isDistrictDropdownOpen = !this.isDistrictDropdownOpen;
      // Close province dropdown when opening district dropdown
      if (this.isDistrictDropdownOpen) {
          this.isProvinceDropdownOpen = false;
      }
  }

  selectDistrictOption(districtName: string) {
      this.selectDistrict = districtName;
      this.isDistrictDropdownOpen = false;
      this.filterDistrict();
  }

  clearDistrictFilter(event?: MouseEvent) {
      if (event) {
          event.stopPropagation(); // Prevent triggering the dropdown toggle
      }
      this.selectDistrict = '';
      this.fetchCourtOfficerDetails();
  }

  // Updated existing methods
  filterProvince() {
      this.selectDistrict = ''; // Clear district selection when province changes
      this.updateFilteredDistricts(); // Update district list based on selected province
      this.fetchCourtOfficerDetails();
  }

  filterDistrict() {
      // When district is selected, automatically set the province
      if (this.selectDistrict) {
          const district = this.allDistricts.find(d => d.name === this.selectDistrict);
          if (district) {
              this.selectProvince = district.province;
              // Update filtered districts based on the selected province
              this.updateFilteredDistricts();
          }
      }
      this.fetchCourtOfficerDetails();
  }

  // Update the filtered districts based on selected province
  updateFilteredDistricts() {
      if (this.selectProvince) {
          this.filteredDistricts = this.allDistricts.filter(d => d.province === this.selectProvince);
      } else {
          this.filteredDistricts = this.allDistricts;
      }
  }

  // Legacy methods (kept for compatibility, but now called by new methods)
  cancelProvince() {
      this.clearProvinceFilter();
  }

  cancelDistrict() {
      this.clearDistrictFilter();
  }

  getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  navigateToDashboard(id: number) {
    console.log('clicke')
      this.router.navigate([`/courts/court-dashboard/${id}`]);
  }


addRegistrar() {
      const id = this.courtId
      this.router.navigate([`/courts/create-registrar/${id}`]);
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
