// view-centers.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaseService } from './../../../services/case.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'


@Component({
  selector: 'app-view-selected-case',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule],
  templateUrl: './view-selected-case.component.html',
  styleUrl: './view-selected-case.component.css'
})
export class ViewSelectedCaseComponent {

  caseDetail: CaseData = new CaseData();
  parties: Party[] = [];
  selectedParty: Party = new Party();

  isLoading: boolean = true;

  caseId!: number;

  activeIndex: number | null = null;

  openIndexes = new Set<number>();
  isViewPartyPopUpOpen: boolean = false;
  isViewLawyerPopUpOpen: boolean = false;

toggleParty(i: number) {
  if (this.openIndexes.has(i)) {
    this.openIndexes.delete(i); // close if already open
  } else {
    this.openIndexes.add(i); // open without affecting others
  }
}

isOpen(i: number): boolean {
  return this.openIndexes.has(i);
}

  // caseDetail = {
  //   caseNumber: 'CR-2024-00892',
  //   courtName: 'Colombo High Court',
  //   courtType: 'High Court',
  //   province: 'Western Province',
  //   district: 'Colombo',
  //   city: 'Colombo 12',
  //   caseType: 'Criminal',
  //   caseStatus: 'Ongoing',  // 'Ongoing' | 'Created' | 'Closed' | 'Pending'
  //   caseDescription: 'The accused was found in possession...',
  //   createdDate: new Date('2024-01-14'),
  //   createdByOfficer: 'OFC. Ruwan Perera',
  //   parties: [
  //     {
  //       partyName: 'Amal Kumara',
  //       partyRole: 'Accused',       // 'Accused' | 'Complainant' | 'Witness'
  //       partyStatus: 'Remanded',    // 'Remanded' | 'Pending' | 'Discharged' | 'Acquitted'
  //       nic: '199025600234V',
  //       lawyerAvailable: true,
  //       lawyerName: 'Nishantha de Silva, Attorney-at-Law'
  //     }
  //   ]
  // };

  constructor(
    private router: Router,
    private casesSrv: CaseService,
    private route: ActivatedRoute
) { }

ngOnInit(): void {
  console.log('opened')
  this.caseId = this.route.snapshot.params['id'];
  this.fetchAllCaseDetails(this.caseId);
}

fetchAllCaseDetails(caseId: number) {
  this.isLoading = true;
  this.casesSrv.getCaseDetails(this.caseId).subscribe(
      (res) => {
          this.caseDetail = res.data;
          this.parties = res.partyData;
          console.log('caseObj', this.caseDetail)
          this.isLoading = false;
      }
  );
}
  
  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }

  openViewPartyPopUp(seletedParty: Party) {
    this.selectedParty = seletedParty
    this.isViewPartyPopUpOpen = true;
  }

  closePartyPopup() {
    this.isViewPartyPopUpOpen = false;
  }

  openViewLawyerPopUp(seletedParty: Party) {
    this.selectedParty = seletedParty
    this.isViewLawyerPopUpOpen = true;
  }


  closeLawyerPopup() {
    this.isViewLawyerPopUpOpen = false;
  }

  navigateToScheduleHearing() {
    this.router.navigate([`/hearing/create-schedule-for-case/${this.caseId}`]);
  }

}

export class CaseData {
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
