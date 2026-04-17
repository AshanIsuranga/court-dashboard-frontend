// view-centers.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SchedleService } from './../../../services/schedule-service/schedle.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'
import { CustomDatepickerComponent } from '../../../components/custom-datepicker/custom-datepicker.component';

 
export interface HearingForm {
  hearingType: string;
  hearingStatus: string;
  hearingDate: Date | string;
  presidingJudge: string;
  descEn: string;
  descSi: string;
  descTa: string;
}

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule, CustomDatepickerComponent],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent implements OnInit {
 
  submitted = false;
  activeLang = 'en';
  partyMode: 'all' | 'custom' = 'all';
  selectedPartyIds: Set<number> = new Set();

  isLoading: boolean = true;
  caseId!: number;

  caseDetail: CaseData = new CaseData();
  parties: Party[] = [];

  selectedDate: string | Date | null = null;

  // 5. Add selection change handler
  onHearingTypeChange(selectedValue: string) {
    this.form.hearingType = selectedValue || '';
    console.log('selected:', selectedValue);
  }

  onHearingStatusChange(selectedValue: string) {
    this.form.hearingStatus = selectedValue || '';
    console.log('selected:', selectedValue);
  }

  constructor(
    private router: Router,
    private scheduleSrv: SchedleService,
    private route: ActivatedRoute
) { }

 
  form: HearingForm = {
    hearingType: '',
    hearingStatus: '',
    hearingDate: '',
    presidingJudge: '',
    descEn: '',
    descSi: '',
    descTa: '',
  };
 
  hearingTypes = [
    { value: 'FIRST_CALLING', label: 'First Calling' },
    { value: 'MENTION',       label: 'Mention' },
    { value: 'TRIAL',         label: 'Trial' },
    { value: 'ARGUMENT',      label: 'Argument' },
    { value: 'JUDGMENT',      label: 'Judgment' },
    { value: 'OTHER',         label: 'Other' },
  ];
 
  hearingStatuses = [
    { value: 'SCHEDULED',   label: 'Scheduled' },
    { value: 'COMPLETED',   label: 'Completed' },
    { value: 'ADJOURNED',   label: 'Adjourned' },
    { value: 'RESCHEDULED', label: 'Rescheduled' },
    { value: 'CANCELLED',   label: 'Cancelled' },
  ];
 
  languages = [
    { code: 'en', label: 'English' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' },
  ];

 
  ngOnInit(): void {
    this.form.hearingDate = new Date().toISOString().split('T')[0];
    this.caseId = this.route.snapshot.params['id'];
    this.fetchDataForCreateHearing(this.caseId);
  }

  fetchDataForCreateHearing(caseId: number) {
    this.isLoading = true;
    this.scheduleSrv.getDataForCreateHearing(this.caseId).subscribe(
        (res) => {
            this.caseDetail = res.data;
            this.parties = res.partyData;
            console.log('caseObj', this.caseDetail)
            this.isLoading = false;
        }
    );
  }

  onDateChange(newDate: string | Date | null) {
    let date: Date | string;
  
    if (!newDate) {
      
      date = new Date();
    } 
    else {
      
      date = newDate;
    }
  
    this.form.hearingDate = date;

  }
 
  setMode(mode: 'all' | 'custom'): void {
    this.partyMode = mode;
    if (mode === 'all') this.selectAllParties();
  }
 
  selectAllParties(): void {
    this.selectedPartyIds = new Set(this.parties.map(p => p.partyid));
  }
 
  toggleParty(id: number): void {
    if (this.partyMode !== 'custom') return;
    if (this.selectedPartyIds.has(id)) {
      this.selectedPartyIds.delete(id);
    } else {
      this.selectedPartyIds.add(id);
    }
    // Trigger change detection for the Set
    this.selectedPartyIds = new Set(this.selectedPartyIds);
  }
 
  onSubmit(): void {
    this.submitted = true;
    
    console.log('selectedPartyIds', this.selectedPartyIds)

    this.isLoading = true;
    this.scheduleSrv.createHearingnew().subscribe(
        (res) => {
            this.caseDetail = res.data;
            this.parties = res.partyData;
            console.log('caseObj', this.caseDetail)
            this.isLoading = false;
        }
    );
 
    if (!this.form.hearingType || !this.form.hearingStatus || !this.form.hearingDate) return;
    if (this.selectedPartyIds.size === 0) return;

    console.log('selectedPartyIds', this.selectedPartyIds)
 
    // const payload = {
    //   caseId: this.caseDetail.id,
    //   caseNumber:     this.caseDetail.casenumber,
    //   hearingType:    this.form.hearingType,
    //   hearingStatus:  this.form.hearingStatus,
    //   date:           this.form.hearingDate,
    //   presidingJudge: this.form.presidingJudge,
    //   descriptions: {
    //     en: this.form.descEn,
    //     si: this.form.descSi,
    //     ta: this.form.descTa,
    //   },
    //   parties: Array.from(this.selectedPartyIds),
    // };
 
    // console.log('Hearing payload:', payload);
    // this.isLoading = true;
    // this.scheduleSrv.createHearing().subscribe(
    //     (res) => {
    //         this.caseDetail = res.data;
    //         this.parties = res.partyData;
    //         console.log('caseObj', this.caseDetail)
    //         this.isLoading = false;
    //     }
    // );
    
    // TODO: call your service here, e.g. this.hearingService.create(payload).subscribe(...)
  }
 
  onCancel(): void {
    // TODO: navigate back, e.g. this.router.navigate(['/cases', this.caseId])
    console.log('Cancelled');
  }
}


class CaseData {
  id!: number;
  casenumber!: string;
  casetype!: string;
  casestatus!: string;

  descriptionEnglish!: string;
  closereason!: string | null;
  closuredate!: Date | null;
  closeNoteEnglish!: string | null;

  createdat!: Date;
  updatedat!: Date;

  firstname!: string;
  lastname!: string;

  type!: string;
  city!: string;
  courtnameenglish!: string;
  courttype!: string;
  district!: string;
  province!: string;
}

class Party {
  partyid!: number;
  partyrole!: string;
  partystatus!: string;
  partynic!: string;
  partyname!: string;
  ispolicestation!: number;
  lawyerstatus!: number;
  lawyerid!: number;
  partyaddress!: string;
  partyphone!: string;
  partydistrict!: string;
  partyprovince!: string;
  partycity!: string;
  linkeduserid!: number;
  partytype!: string;
  connectionstatus!: string;

  oranizationid!: number;
  oranizationname!: string;
  registration_number!: string;
  oranizationemail!: string;
  oranizationphone!: string;
  oranizationaddress!: string;
  oranizationcity!: string;
  oranizationdistrict!: string;
  oranizationprovince!: string;


  lawyerfirstname!: string;
  lawyerlastname!: string;
  lawyerbarcode!: string;
  lawyerphoneno!: string;
  lawyerphonecode!: string;
  lawyerhouseno!: string;
  lawyerstreetname!: string;
  lawyercity!: string;
  lawyerdistrict!: string;
  lawyerprovince!: string;
  specialities!: string;
}

