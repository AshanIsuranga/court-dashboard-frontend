import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'
import { CoreService } from '../../../services/core-service/core.service';
import Swal from 'sweetalert2';

interface DropdownItem {
  value: any;
  label: string;
}

interface ClerkForm {
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
  country: string;
}

@Component({
  selector: 'app-edit-clerk',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent],
  templateUrl: './edit-clerk.component.html',
  styleUrl: './edit-clerk.component.css'
})
export class EditClerkComponent implements OnInit {
  isLoading = false;
  isSaving = false;
  submitted = false;
  userId!: number;
  officerCode = '';

  readonly nicPattern = '^([0-9]{9}[vVxX]|[0-9]{12})$';
  readonly phonePattern = '^[0-9]{9}$';

  private readonly provinceDistrictMap: { [key: string]: string[] } = {
    'Western':       ['Colombo', 'Gampaha', 'Kalutara'],
    'Central':       ['Kandy', 'Matale', 'Nuwara Eliya'],
    'Southern':      ['Galle', 'Matara', 'Hambantota'],
    'Northern':      ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    'Eastern':       ['Trincomalee', 'Batticaloa', 'Ampara'],
    'North Western': ['Kurunegala', 'Puttalam'],
    'North Central': ['Anuradhapura', 'Polonnaruwa'],
    'Uva':           ['Badulla', 'Monaragala'],
    'Sabaragamuwa':  ['Ratnapura', 'Kegalle'],
  };

  private readonly districtProvinceMap: { [key: string]: string } = {
    'Colombo': 'Western', 'Gampaha': 'Western', 'Kalutara': 'Western',
    'Kandy': 'Central', 'Matale': 'Central', 'Nuwara Eliya': 'Central',
    'Galle': 'Southern', 'Matara': 'Southern', 'Hambantota': 'Southern',
    'Jaffna': 'Northern', 'Kilinochchi': 'Northern', 'Mannar': 'Northern',
    'Mullaitivu': 'Northern', 'Vavuniya': 'Northern',
    'Trincomalee': 'Eastern', 'Batticaloa': 'Eastern', 'Ampara': 'Eastern',
    'Kurunegala': 'North Western', 'Puttalam': 'North Western',
    'Anuradhapura': 'North Central', 'Polonnaruwa': 'North Central',
    'Badulla': 'Uva', 'Monaragala': 'Uva',
    'Ratnapura': 'Sabaragamuwa', 'Kegalle': 'Sabaragamuwa',
  };

  formData: ClerkForm = {
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

  private originalFormData!: ClerkForm;

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

  private readonly allDistrictItems: DropdownItem[] = [
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

  districtItems: DropdownItem[] = [...this.allDistrictItems];

  constructor(
    private coreSrv: CoreService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchClerkDetails();
  }

  fetchClerkDetails(): void {
    this.isLoading = true;
    this.coreSrv.getClerkDetailsById(this.userId).subscribe({
      next: (res) => {
        const data = res?.data ?? res;
        this.officerCode = data.officercode || '';
        this.populateForm(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load',
          text: err?.error?.error || 'Could not fetch clerk details.',
        });
      }
    });
  }

  private populateForm(data: any): void {
    // Strip leading 0 from stored phone numbers (e.g. 0712345678 → 712345678)
    const stripLeadingZero = (num: string | null) =>
      num ? (num.startsWith('0') ? num.slice(1) : num) : '';

    this.formData = {
      firstname:    data.firstname    || '',
      lastname:     data.lastname     || '',
      officerrole:  data.officerrole  || null,
      phonecode01:  data.phonecode01  || '+94',
      phonenumber01: stripLeadingZero(data.phonenumber01),
      phonecode02:  data.phonecode02  || '+94',
      phonenumber02: stripLeadingZero(data.phonenumber02),
      nic:          data.nic          || '',
      email:        data.email        || '',
      housenumber:  data.housenumber  || '',
      streetname:   data.streetname   || '',
      city:         data.city         || '',
      district:     data.district     || null,
      province:     data.province     || null,
      country:      data.country      || 'Sri Lanka',
    };

    // Pre-filter district list to match the loaded province
    if (data.province && this.provinceDistrictMap[data.province]) {
      const names = this.provinceDistrictMap[data.province];
      this.districtItems = this.allDistrictItems.filter(d => names.includes(d.value));
    }

    this.originalFormData = { ...this.formData };
  }

  onProvinceChange(province: string | null): void {
    this.formData.district = null;
    if (province && this.provinceDistrictMap[province]) {
      const names = this.provinceDistrictMap[province];
      this.districtItems = this.allDistrictItems.filter(d => names.includes(d.value));
    } else {
      this.districtItems = [...this.allDistrictItems];
    }
  }

  onDistrictChange(district: string | null): void {
    if (district && this.districtProvinceMap[district]) {
      this.formData.province = this.districtProvinceMap[district];
      const names = this.provinceDistrictMap[this.formData.province];
      this.districtItems = this.allDistrictItems.filter(d => names.includes(d.value));
    }
  }

  isFormValid(): boolean {
    const nicOk = new RegExp(this.nicPattern).test(this.formData.nic);
    const phone01Ok = new RegExp(this.phonePattern).test(this.formData.phonenumber01);
    const phone02Ok = !this.formData.phonenumber02 || new RegExp(this.phonePattern).test(this.formData.phonenumber02);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);

    return !!(
      this.formData.officerrole &&
      this.formData.firstname?.trim() &&
      this.formData.lastname?.trim() &&
      nicOk && emailOk && phone01Ok && phone02Ok &&
      this.formData.housenumber?.trim() &&
      this.formData.streetname?.trim() &&
      this.formData.city?.trim() &&
      this.formData.district &&
      this.formData.province &&
      this.formData.country?.trim()
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.isFormValid()) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this.updateClerk(this.formData);
  }

  updateClerk(formData: ClerkForm): void {
  this.isLoading = true;
  this.isSaving = true;

  this.coreSrv.updateClerk(this.userId, formData).subscribe({
    next: (res: any) => {
      this.stopLoading();

      if (res?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Officer Updated',
          text: 'Clerk details have been saved successfully.',
          confirmButtonText: 'OK',
        }).then(() => {
          this.location.back();
        });

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Update Failed',
          text: res?.message || 'Something went wrong.',
        });
      }
    },

    error: (err: any) => {
      this.stopLoading();

      // 🔥 DUPLICATE HANDLING (409)
      if (err?.status === 409) {
        const duplicates: string[] = err?.error?.duplicates || [];

        const formatted = duplicates.length
          ? duplicates.map(f => `• ${this.prettyFieldName(f)}`).join('<br>')
          : 'Duplicate entry detected';

        Swal.fire({
          icon: 'warning',
          title: 'Duplicate Entry',
          html: `
            <div style="text-align:left">
              These fields already exist:<br><br>
              ${formatted}
            </div>
          `
        });

        return;
      }

      // ❌ GENERAL ERROR
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err?.error?.error || 'Server error occurred.',
      });
    }
  });
}

private stopLoading() {
  this.isLoading = false;
  this.isSaving = false;
}

private prettyFieldName(field: string): string {
  const map: any = {
    nic: 'NIC',
    email: 'Email',
    phoneNumber01: 'Phone Number 1',
    phoneNumber02: 'Phone Number 2'
  };

  return map[field] || field;
}

  onReset(): void {
    this.submitted = false;
    if (this.originalFormData) {
      this.formData = { ...this.originalFormData };
      if (this.formData.province && this.provinceDistrictMap[this.formData.province]) {
        const names = this.provinceDistrictMap[this.formData.province];
        this.districtItems = this.allDistrictItems.filter(d => names.includes(d.value));
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
