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
  courtid: number | null;
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
  selector: 'app-create-registar',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent],
  templateUrl: './create-registar.component.html',
  styleUrl: './create-registar.component.css'
})
export class CreateRegistarComponent implements OnInit {
  isLoading = false;
  isSaving = false;
  submitted = false;
  courtId!: number;
  itemsArr!: Court[];

  readonly nicPattern = '^([0-9]{9}[vVxX]|[0-9]{12})$';
  readonly phonePattern = '^[0-9]{9}$';

  private readonly provinceDistrictMap: { [key: string]: string[] } = {
    'Western':      ['Colombo', 'Gampaha', 'Kalutara'],
    'Central':      ['Kandy', 'Matale', 'Nuwara Eliya'],
    'Southern':     ['Galle', 'Matara', 'Hambantota'],
    'Northern':     ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    'Eastern':      ['Trincomalee', 'Batticaloa', 'Ampara'],
    'North Western':['Kurunegala', 'Puttalam'],
    'North Central':['Anuradhapura', 'Polonnaruwa'],
    'Uva':          ['Badulla', 'Monaragala'],
    'Sabaragamuwa': ['Ratnapura', 'Kegalle'],
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

  formData: RegistrarForm = {
    courtid: null,
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

  courtItems: DropdownItem[] = [];

  roleItems: DropdownItem[] = [
    { value: 'Registrar', label: 'Registrar' },
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
    private router: Router,
    private coreSrv: CoreService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.courtId = this.route.snapshot.params['id'];
    if (this.courtId) {
      this.formData.courtid = this.courtId;
    }
    this.fetchAllCourts();
  }

  fetchAllCourts() {
    this.isLoading = true;
    this.coreSrv.getAllCourts().subscribe(
      (res) => {
        this.itemsArr = res.data;
        this.courtItems = this.itemsArr.map((court: Court) => ({
          label: court.courtnameenglish,
          value: court.courtid
        }));
        this.isLoading = false;
      }
    );
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
      this.formData.courtid &&
      this.formData.officerrole &&
      this.formData.firstname?.trim() &&
      this.formData.lastname?.trim() &&
      nicOk &&
      emailOk &&
      phone01Ok &&
      phone02Ok &&
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
    this.createRegistrar(this.formData);
  }

  createRegistrar(formData: RegistrarForm) {
  this.isLoading = true;

  this.coreSrv.createRegistrar(formData).subscribe({
    next: (res) => {
      this.isLoading = false;

      if (res?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Registrar Created',
          confirmButtonText: 'OK'
        });
        this.isSaving = false;
        this.location.back();

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Failed',
          text: res.message || 'Something went wrong'
        });
        this.isSaving = false;
      }
    },

    error: (err) => {
      this.isLoading = false;
      this.isSaving = false;

      // 🔥 HANDLE DUPLICATE CASE (409)
      if (err?.status === 409) {
        const duplicates = err?.error?.duplicates || [];

        const message =
          duplicates.length > 0
            ? `Duplicate fields found: ${duplicates.join(', ')}`
            : err?.error?.message || 'Duplicate entry detected';

        Swal.fire({
          icon: 'warning',
          title: 'Duplicate Entry',
          text: message
        });

        return;
      }

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
    this.districtItems = [...this.allDistrictItems];
    this.formData = {
      courtid: this.courtId || null,
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
    this.router.navigate([`/courts/court-officers/${this.courtId}`]);
  }

  navigateToCourts(): void {
    this.router.navigate(['/courts']);
  }
}

class Court {
  courtid!: string;
  courtnameenglish!: string;
}
