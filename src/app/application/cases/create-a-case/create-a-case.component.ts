import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component';
import { CaseService } from '../../../services/case.service';
import Swal from 'sweetalert2';

interface DropdownItem {
  value: any;
  label: string;
}

interface OrganizationUserDetails {
  name: string;
  nic: string;
  phone: string;
  email: string;
}

interface OrganizationDetails {
  organizationname: string;
  regno: string;
  organizationemail: string;
  organizationphone: string;
  organizationaddress: string;
  organizationcity: string;
  organizationdistrict: string;
  organizationprovince: string;
  organizationusers: OrganizationUserDetails[];
}

interface PartyFormModel {
  partyrole: string;
  partystatus: string;
  partytype: 'Individual' | 'Organization' | '';
  // Individual fields
  nic: string;
  name: string;
  phone: string;
  district: string;
  province: string;
  // Organization fields
  organization: OrganizationDetails;
}

interface ValidationErrors {
  [key: string]: string;
}

@Component({
  selector: 'app-create-a-case',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent],
  templateUrl: './create-a-case.component.html',
  styleUrl: './create-a-case.component.css'
})
export class CreateACaseComponent {

  isLoading = false;
  submitted = false;

  // ── Case fields ───────────────────────────────────────────────────
  casenumber = '';
  casetype = '';
  descriptionEnglish = '';
  descriptionSinhala = '';
  descriptionTamil = '';
  casestatus = '';

  // ── Parties ───────────────────────────────────────────────────────
  parties: PartyFormModel[] = [];

  // ── Validation ────────────────────────────────────────────────────
  caseErrors: ValidationErrors = {};
  partyErrors: ValidationErrors[] = [];

  // ── Dropdown options ──────────────────────────────────────────────
  caseTypeItems: DropdownItem[] = [
    { value: 'Civil', label: 'Civil' },
    { value: 'Criminal', label: 'Criminal' },
    { value: 'Family', label: 'Family' },
    { value: 'Labour', label: 'Labour' }
  ];

  caseStatusItems: DropdownItem[] = [
    { value: 'CREATED', label: 'Created' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'HEARIN_SCHEDULED', label: 'Hearing Scheduled' },
    { value: 'STAYED', label: 'Stayed' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  partyTypeItems: DropdownItem[] = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Organization', label: 'Organization' },
  ];

  partyRoleItems: DropdownItem[] = [
    { value: 'PLAINTIFF', label: 'Plaintiff' },
    { value: 'DEFENDENT', label: 'Defendant' },
    { value: 'COMPLAINANT', label: 'Complainant' },
    { value: 'PETITIONER', label: 'Petitioner' },
    { value: 'RESPONDENT', label: 'Respondent' },
    { value: 'WITNESS', label: 'Witness' },
    { value: 'ACCUSED', label: 'Accused' },
    { value: 'STATE', label: 'State' },
    { value: 'GUARDIAN', label: 'Guardian' },
    { value: 'OTHER', label: 'Other' },
  ];

  partyStatusItems: DropdownItem[] = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'NOT_APPEARED', label: 'Not Appeared' },
    { value: 'DEFAULTED', label: 'Dfeauled' },
    { value: 'ACCUSED', label: 'Accused' },
    { value: 'WITHDRAWN', label: 'Withdrawn' },
    { value: 'DISCHARGED', label: 'Discharged' },
    { value: 'CONCLUDED', label: 'Concluded' },
  ];

  provinceItems: DropdownItem[] = [
    { value: 'WESTERN', label: 'Western' },
    { value: 'CENTRAL', label: 'Central' },
    { value: 'SOUTHERN', label: 'Southern' },
    { value: 'NORTHERN', label: 'Northern' },
    { value: 'EASTERN', label: 'Eastern' },
    { value: 'NORTH_WESTERN', label: 'North Western' },
    { value: 'NORTH_CENTRAL', label: 'North Central' },
    { value: 'UVA', label: 'Uva' },
    { value: 'SABARAGAMUWA', label: 'Sabaragamuwa' },
  ];

  districtItems: DropdownItem[] = [
    { value: 'COLOMBO', label: 'Colombo' },
    { value: 'GAMPAHA', label: 'Gampaha' },
    { value: 'KALUTARA', label: 'Kalutara' },
    { value: 'KANDY', label: 'Kandy' },
    { value: 'MATALE', label: 'Matale' },
    { value: 'NUWARA_ELIYA', label: 'Nuwara Eliya' },
    { value: 'GALLE', label: 'Galle' },
    { value: 'MATARA', label: 'Matara' },
    { value: 'HAMBANTOTA', label: 'Hambantota' },
    { value: 'JAFFNA', label: 'Jaffna' },
    { value: 'KILINOCHCHI', label: 'Kilinochchi' },
    { value: 'MANNAR', label: 'Mannar' },
    { value: 'VAVUNIYA', label: 'Vavuniya' },
    { value: 'MULLAITIVU', label: 'Mullaitivu' },
    { value: 'BATTICALOA', label: 'Batticaloa' },
    { value: 'AMPARA', label: 'Ampara' },
    { value: 'TRINCOMALEE', label: 'Trincomalee' },
    { value: 'KURUNEGALA', label: 'Kurunegala' },
    { value: 'PUTTALAM', label: 'Puttalam' },
    { value: 'ANURADHAPURA', label: 'Anuradhapura' },
    { value: 'POLONNARUWA', label: 'Polonnaruwa' },
    { value: 'BADULLA', label: 'Badulla' },
    { value: 'MONARAGALA', label: 'Monaragala' },
    { value: 'RATNAPURA', label: 'Ratnapura' },
    { value: 'KEGALLE', label: 'Kegalle' },
  ];

  constructor(
    private location: Location,
    private caseService: CaseService
  ) {}

  private emptyOrgUser(): OrganizationUserDetails {
    return { name: '', nic: '', phone: '', email: '' };
  }

  private emptyParty(): PartyFormModel {
    return {
      partyrole: '',
      partystatus: '',
      partytype: '',
      nic: '',
      name: '',
      phone: '',
      district: '',
      province: '',
      organization: {
        organizationname: '',
        regno: '',
        organizationemail: '',
        organizationphone: '',
        organizationaddress: '',
        organizationcity: '',
        organizationdistrict: '',
        organizationprovince: '',
        organizationusers: [this.emptyOrgUser()],
      },
    };
  }

  addParty(): void {
    this.parties.push(this.emptyParty());
    this.partyErrors.push({});
  }

  removeParty(index: number): void {
    this.parties.splice(index, 1);
    this.partyErrors.splice(index, 1);
  }

  addOrgUser(partyIndex: number): void {
    this.parties[partyIndex].organization.organizationusers.push(this.emptyOrgUser());
  }

  removeOrgUser(partyIndex: number, userIndex: number): void {
    this.parties[partyIndex].organization.organizationusers.splice(userIndex, 1);
  }

  onPartyTypeChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].partytype = value as 'Individual' | 'Organization';
    this.partyErrors[partyIndex] = {};
  }

  onPartyRoleChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].partyrole = value;
  }

  onPartyStatusChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].partystatus = value;
  }

  onPartyProvinceChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].province = value;
  }

  onPartyDistrictChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].district = value;
  }

  onOrgProvinceChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].organization.organizationprovince = value;
  }

  onOrgDistrictChange(partyIndex: number, value: string): void {
    this.parties[partyIndex].organization.organizationdistrict = value;
  }

  onCaseTypeChange(value: string): void {
    this.casetype = value;
  }

  onCaseStatusChange(value: string): void {
    this.casestatus = value;
  }

  // ── Validation ────────────────────────────────────────────────────

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private validatePhone(phone: string): boolean {
    return /^[0-9+\-\s]{7,15}$/.test(phone);
  }

  private validateNic(nic: string): boolean {
    return /^([0-9]{9}[vVxX]|[0-9]{12})$/.test(nic);
  }

  private validateCase(): boolean {
    const e: ValidationErrors = {};
    if (!this.casenumber.trim()) e['casenumber'] = 'Case number is required.';
    if (!this.casetype) e['casetype'] = 'Case type is required.';
    if (!this.casestatus) e['casestatus'] = 'Case status is required.';
    if (!this.descriptionEnglish.trim()) e['descriptionEnglish'] = 'English description is required.';
    this.caseErrors = e;
    return Object.keys(e).length === 0;
  }

  private validateParties(): boolean {
    if (this.parties.length === 0) {
      Swal.fire('Validation', 'Please add at least one party.', 'warning');
      return false;
    }

    let valid = true;
    this.partyErrors = this.parties.map((p) => {
      const e: ValidationErrors = {};
      if (!p.partyrole) e['partyrole'] = 'Party role is required.';
      if (!p.partystatus) e['partystatus'] = 'Party status is required.';
      if (!p.partytype) e['partytype'] = 'Party type is required.';

      if (p.partytype === 'Individual') {
        if (!p.nic.trim()) {
          e['nic'] = 'NIC is required.';
        } else if (!this.validateNic(p.nic.trim())) {
          e['nic'] = 'Enter a valid NIC (e.g. 123456789V or 200012345678).';
        }
        if (!p.name.trim()) e['name'] = 'Name is required.';
        if (!p.phone.trim()) {
          e['phone'] = 'Phone is required.';
        } else if (!this.validatePhone(p.phone)) {
          e['phone'] = 'Enter a valid phone number.';
        }
        if (!p.district) e['district'] = 'District is required.';
        if (!p.province) e['province'] = 'Province is required.';
      }

      if (p.partytype === 'Organization') {
        const org = p.organization;
        if (!org.organizationname.trim()) e['orgname'] = 'Organization name is required.';
        if (!org.regno.trim()) e['regno'] = 'Registration number is required.';
        if (!org.organizationemail.trim()) {
          e['orgemail'] = 'Organization email is required.';
        } else if (!this.validateEmail(org.organizationemail)) {
          e['orgemail'] = 'Enter a valid email.';
        }
        if (!org.organizationphone.trim()) {
          e['orgphone'] = 'Organization phone is required.';
        } else if (!this.validatePhone(org.organizationphone)) {
          e['orgphone'] = 'Enter a valid phone number.';
        }
        if (!org.organizationaddress.trim()) e['orgaddress'] = 'Address is required.';
        if (!org.organizationcity.trim()) e['orgcity'] = 'City is required.';
        if (!org.organizationdistrict) e['orgdistrict'] = 'District is required.';
        if (!org.organizationprovince) e['orgprovince'] = 'Province is required.';

        org.organizationusers.forEach((u, ui) => {
          if (!u.name.trim()) e[`uname_${ui}`] = 'User name is required.';
          if (!u.nic.trim()) {
            e[`unic_${ui}`] = 'NIC is required.';
          } else if (!this.validateNic(u.nic.trim())) {
            e[`unic_${ui}`] = 'Enter a valid NIC.';
          }
          if (!u.phone.trim()) {
            e[`uphone_${ui}`] = 'Phone is required.';
          } else if (!this.validatePhone(u.phone)) {
            e[`uphone_${ui}`] = 'Enter a valid phone.';
          }
          if (!u.email.trim()) {
            e[`uemail_${ui}`] = 'Email is required.';
          } else if (!this.validateEmail(u.email)) {
            e[`uemail_${ui}`] = 'Enter a valid email.';
          }
        });
      }

      if (Object.keys(e).length > 0) valid = false;
      return e;
    });

    return valid;
  }

  // ── Submit ────────────────────────────────────────────────────────

  onSubmit(): void {

    this.submitted = true;
    const caseValid = this.validateCase();
    const partiesValid = this.validateParties();
    if (!caseValid || !partiesValid) return;

    const payload = {
      casenumber: this.casenumber,
      casetype: this.casetype,
      descriptionEnglish: this.descriptionEnglish,
      descriptionSinhala: this.descriptionSinhala,
      descriptionTamil: this.descriptionTamil,
      casestatus: this.casestatus,
      parties: this.parties.map(p => {
        if (p.partytype === 'Individual') {
          return {
            partyrole: p.partyrole,
            partystatus: p.partystatus,
            partytype: p.partytype,
            nic: p.nic,
            name: p.name,
            phone: p.phone,
            district: p.district,
            province: p.province,
          };
        } else {
          return {
            partyrole: p.partyrole,
            partystatus: p.partystatus,
            partytype: p.partytype,
            organization: p.organization,
          };
        }
      }),
    };

    console.log('payload', payload)

    this.isLoading = true;
    this.caseService.createCase(payload).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire('Success', 'Case created successfully.', 'success').then(() => {
          this.location.back();
        });
      },
      error: (err: any) => {
        this.isLoading = false;
        Swal.fire('Error', err?.error?.message || 'Failed to create case.', 'error');
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
