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
    if (this.isSaving) return;

    const errors = this.getValidationErrors();
    if (errors.length > 0) {
      Swal.fire({
        title: 'Please fix the following issues',
        html: `
          <div style="text-align:left; margin-top:8px;">
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
              ${errors.map(e => `
                <li style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:rgba(15,37,71,0.05); border-left:3px solid #C9A84C; border-radius:6px; font-size:15px; color:#0F2547;">
                  <i class="fa-solid fa-circle-exclamation" style="color:#C9A84C; flex-shrink:0;"></i>
                  ${e}
                </li>`).join('')}
            </ul>
          </div>`,
        icon: undefined,
        confirmButtonText: 'Fix Issues',
        customClass: {
          popup: 'swal-court-popup',
          title: 'swal-court-title',
          confirmButton: 'swal-court-confirm',
        },
        didOpen: () => {
          const popup = Swal.getPopup()!;
          popup.style.borderTop = '4px solid #C9A84C';
          popup.style.borderRadius = '12px';
          const title = Swal.getTitle()!;
          title.style.color = '#0F2547';
          title.style.fontSize = '18px';
          const btn = Swal.getConfirmButton()!;
          btn.style.background = '#0F2547';
          btn.style.color = '#C9A84C';
          btn.style.border = '1.5px solid #C9A84C';
          btn.style.borderRadius = '8px';
          btn.style.padding = '10px 28px';
          btn.style.fontWeight = '600';
          btn.style.fontSize = '15px';
        }
      });
      return;
    }

    this.isSaving = true;
    this.createRegistrar(this.formData);
  }

  private getValidationErrors(): string[] {
    const errors: string[] = [];
    const f = this.formData;

    const nicOld = /^\d{9}[VvXx]$/;
    const nicNew = /^\d{12}$/;
    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const mobilePattern = /^[1-9]\d{8}$/;

    if (!f.officerrole)        errors.push('Officer Role is required');
    if (!f.firstname?.trim())  errors.push('First Name is required');
    if (!f.lastname?.trim())   errors.push('Last Name is required');

    if (!f.nic?.trim()) {
      errors.push('NIC is required');
    } else if (!nicOld.test(f.nic.trim()) && !nicNew.test(f.nic.trim())) {
      errors.push('NIC must be in old format (e.g. 123456789V) or new format (e.g. 200012345678)');
    }

    if (!f.email?.trim()) {
      errors.push('Email is required');
    } else if (!emailPattern.test(f.email.trim())) {
      errors.push('Email must be a valid address (e.g. officer@courts.gov.lk)');
    }

    if (!f.phonenumber01?.trim()) {
      errors.push('Primary Mobile number is required');
    } else if (!mobilePattern.test(f.phonenumber01.trim())) {
      errors.push('Primary Mobile must be 9 digits starting with a non-zero digit (e.g. 712345678)');
    }

    if (f.phonenumber02?.trim() && !mobilePattern.test(f.phonenumber02.trim())) {
      errors.push('Secondary Mobile must be 9 digits starting with a non-zero digit (e.g. 712345678)');
    }

    if (!f.housenumber?.trim()) errors.push('House / Building Number is required');
    if (!f.streetname?.trim())  errors.push('Street Name is required');
    if (!f.city?.trim())        errors.push('City is required');
    if (!f.district)            errors.push('District is required');
    if (!f.province)            errors.push('Province is required');
    if (!f.country?.trim())     errors.push('Country is required');

    return errors;
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
