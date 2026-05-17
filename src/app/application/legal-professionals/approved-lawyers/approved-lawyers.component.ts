import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import Swal from 'sweetalert2';
import { CaseService } from '../../../services/case.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component';


@Component({
  selector: 'app-approved-lawyers',
  standalone: true,
    imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule],
  templateUrl: './approved-lawyers.component.html',
  styleUrl: './approved-lawyers.component.css'
})
export class ApprovedLawyersComponent implements OnInit {

  professionals: LegalProfessional[] = [];
  allProfessionals: LegalProfessional[] = [];
  selectedProfessional: LegalProfessional = new LegalProfessional();

  selectProvince: string = '';
  selectDistrict: string = '';

  page: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  hasData: boolean = false;

  searchText: string = '';
  isLoading: boolean = true;

  isApproveModalOpen: boolean = false;
  isRejectModalOpen: boolean = false;

  isProvinceDropdownOpen = false;
  isDistrictDropdownOpen = false;

  tab: string | null = '';

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

  ngOnInit(): void {
    this.tab = this.route.snapshot.queryParamMap.get('tab');
    console.log('tab param:', this.tab);
    this.fetchApprovedProfessionals();
  }

  constructor(
        private router: Router,
        private casesSrv: CaseService,
        private route: ActivatedRoute
    ) { }

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
  
  this.fetchApprovedProfessionals();
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
  
  this.fetchApprovedProfessionals();
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

fetchApprovedProfessionals(
  tab: string | null = this.tab,
  page: number = this.page,
  limit: number = this.itemsPerPage,
  searchText: string = this.searchText,
  district: string = this.selectDistrict,
  province: string = this.selectProvince
) {
  this.isLoading = true;

  this.casesSrv.getApprovedLawyers(tab, page, limit, searchText, district, province).subscribe(
    (res) => {
      // this.connectionsArr = res.items;
      this.professionals = res.items;
      console.log('professionals', this.professionals)
      this.totalItems = res.totalItems;
      this.hasData = res.items.length > 0;
      this.isLoading = false;
    }
  );
}

onPageChange(page: number) {
      this.currentPage = page;
      this.fetchApprovedProfessionals();
  }

  onSearch() {
      this.searchText = this.searchText?.trim() || '';
      this.currentPage = 1; // Reset to first page on new search
      this.fetchApprovedProfessionals();
  }

  offSearch() {
      this.searchText='';
      this.fetchApprovedProfessionals();
  }

  getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  openApproveModal(professional: LegalProfessional): void {
    this.selectedProfessional = professional;
    this.isApproveModalOpen = true;
  }

  openRejectModal(professional: LegalProfessional): void {
    this.selectedProfessional = professional;
    this.isRejectModalOpen = true;
  }

  closeModals(): void {
    this.isApproveModalOpen = false;
    this.isRejectModalOpen = false;
  }

  approveProfessional(status: string): void {

    this.isLoading = true;
    this.closeModals();
    this.casesSrv.approveLawyer(this.selectedProfessional.id, status).subscribe(
          (res) => {
            this.isLoading = false;
            if (res?.status) {
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Legal Professional Approved successfully",
                customClass: {
                  popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white',
                  title: 'dark:text-white',
                }
              })
              this.fetchApprovedProfessionals();
    
            } else {
      
              Swal.fire({
                icon: "error",
                title: "Failed!",
                text: res?.message || "Failed to create connection",
                customClass: {
                  popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white',
                  title: 'dark:text-white',
                }
              });
      
            }
          },
          (error) => {
      
            this.isLoading = false;
      
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error occurred while creating connection',
              confirmButtonText: 'OK',
              customClass: {
                popup: 'bg-white dark:bg-[#363636] text-[#534E4E] dark:text-textDark',
                title: 'font-semibold text-lg',
                htmlContainer: 'text-left',
              },
            });
      
          }
        );
  }


}

class LegalProfessional {
  id!: number;
  username!: string;
  nic!: string;
  email!: string;
  barcode!: string;
  phonenumber01	!: string;
  phonecode01	!: string;
  district!: string;
  province!: string;
  city!: string;
  courtnameenglish!: string;
  specialities!: string;
  casetypes!: string;
  description!: string;
  lawyerfirstnameenglish!: string;
  servicefee!: string
  approvestatus!: string
}