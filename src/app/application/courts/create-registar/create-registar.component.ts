import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'
import { CoreService } from '../../../services/core-service/core.service';

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
  courtId!: number;
  itemsArr!: Court[];

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
                value: court.id
              }));
              this.isLoading = false;
          }
      );
  }


  onSubmit(): void {
    console.log('formData', this.formData)
    if (this.isSaving) return;
    this.isSaving = true;
    // Backend integration goes here
    console.log('Form submitted:', this.formData);
    setTimeout(() => { this.isSaving = false; }, 1000);
  }

  onReset(): void {
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

class Court {

  id!: string;
  courtnameenglish!: string;

}
