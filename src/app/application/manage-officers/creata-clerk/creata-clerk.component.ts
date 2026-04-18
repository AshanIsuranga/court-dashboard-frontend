import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'
import { CoreService } from '../../../services/core-service/core.service';
import Swal from 'sweetalert2';

interface DropdownItem {
  value: any;
  label: string;
}

interface RegistrarForm {
  firstname: string;
  lastname: string;
  officerrole: string | null;
  phonecode01: string;
  phonenumber01: string;
  phonecode02: string;
  phonenumber02: string;
  nic: string;
  email: string;
  housenumber: string;
  streetname: string;
  city: string;
  district: string | null;
  province: string | null;
  country: string

}

@Component({
  selector: 'app-creata-clerk',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent],
  templateUrl: './creata-clerk.component.html',
  styleUrl: './creata-clerk.component.css'
})
export class CreataClerkComponent implements OnInit {
  isLoading = false;
  isSaving = false;
  submitted = false;
  courtId!: number;
  itemsArr!: Court[];

  formData: RegistrarForm = {
    firstname: '',
    lastname: '',
    officerrole: null,
    phonecode01: '+94',
    phonenumber01: '',
    phonecode02: '+94',
    phonenumber02: '',
    nic: '',
    email: '',
    housenumber: '',
    streetname: '',
    city: '',
    district: null,
    province: null,
    country: 'Sri Lanka',
  };


  roleItems: DropdownItem[] = [
    { value: 'Clerk', label: 'Clerk' },
  ];

  provinceItems: DropdownItem[] = [
    { value: 'Western', label: 'Western' },
    { value: 'Central', label: 'Central' },
    { value: 'Southern', label: 'Southern' },
    { value: 'Northern', label: 'Northern' },
    { value: 'Eastern', label: 'Eastern' },
    { value: 'North Western', label: 'North Western' },
    { value: 'North Central', label: 'North Central' },
    { value: 'Uva', label: 'Uva' },
    { value: 'Sabaragamuwa', label: 'Sabaragamuwa' },
  ];

  districtItems: DropdownItem[] = [
    { value: 'Colombo', label: 'Colombo' },
    { value: 'Gampaha', label: 'Gampaha' },
    { value: 'Kalutara', label: 'Kalutara' },
    { value: 'Kandy', label: 'Kandy' },
    { value: 'Matale', label: 'Matale' },
    { value: 'Nuwara Eliya', label: 'Nuwara Eliya' },
    { value: 'Galle', label: 'Galle' },
    { value: 'Matara', label: 'Matara' },
    { value: 'Hambantota', label: 'Hambantota' },
    { value: 'Jaffna', label: 'Jaffna' },
    { value: 'Kilinochchi', label: 'Kilinochchi' },
    { value: 'Mannar', label: 'Mannar' },
    { value: 'Mullaitivu', label: 'Mullaitivu' },
    { value: 'Vavuniya', label: 'Vavuniya' },
    { value: 'Trincomalee', label: 'Trincomalee' },
    { value: 'Batticaloa', label: 'Batticaloa' },
    { value: 'Ampara', label: 'Ampara' },
    { value: 'Kurunegala', label: 'Kurunegala' },
    { value: 'Puttalam', label: 'Puttalam' },
    { value: 'Anuradhapura', label: 'Anuradhapura' },
    { value: 'Polonnaruwa', label: 'Polonnaruwa' },
    { value: 'Badulla', label: 'Badulla' },
    { value: 'Monaragala', label: 'Monaragala' },
    { value: 'Ratnapura', label: 'Ratnapura' },
    { value: 'Kegalle', label: 'Kegalle' },
  ];

  constructor(
    private router: Router,
    private coreSrv: CoreService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {    
  }


  onSubmit(): void {
    this.submitted = true;
    console.log('formData', this.formData)
    if (this.isSaving) return;
    this.isSaving = true;
    // Backend integration goes here
    console.log('Form submitted:', this.formData);
    setTimeout(() => { this.isSaving = false; }, 1000);
    this.createRegistrar(this.formData);
  }

  createRegistrar(formData: RegistrarForm) {
  this.isLoading = true;

  this.coreSrv.createClerk(formData).subscribe({
    next: (res) => {
      this.isLoading = false;

      if (res?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Clerk Created Successfully',
          confirmButtonText: 'OK'
        });
        this.location.back();
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Clerk Creation Failed',
          text: res.message || 'Something went wrong'
        });
      }
    },

    error: (err) => {
      this.isLoading = false;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err?.error?.error || 'Server error occurred'
      });
    }
  });
}


  onReset(): void {
    this.submitted = false;
    this.formData = {
      firstname: '',
      lastname: '',
      officerrole: null,
      phonecode01: '+94',
      phonenumber01: '',
      phonecode02: '+94',
      phonenumber02: '',
      nic: '',
      email: '',
      housenumber: '',
      streetname: '',
      city: '',
      district: null,
      province: null,
      country: 'Sri Lanka',
    };
  }

  goBack(): void {
    this.location.back();
  }
}

class Court {

  courtid!: string;
  courtnameenglish!: string;

}
