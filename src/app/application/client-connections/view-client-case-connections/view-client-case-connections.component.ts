// view-centers.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaseService } from './../../../services/case.service'
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-client-case-connections',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, NgxPaginationModule],
  templateUrl: './view-client-case-connections.component.html',
  styleUrl: './view-client-case-connections.component.css'
})
export class ViewClientCaseConnectionsComponent implements OnInit {
  connectionsArr!: Connection[];
  selectedConnection: Connection = new Connection();
  searchText: string = '';
  page: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isLoading: boolean = true;
  hasData: boolean = false;

  partyId!: number;
  userId!: number;
  caseId!: number;

  orgId!: number;
  orgUserId!: number;

  isCreateConnectionPopUpOpen: boolean = false;


  constructor(
      private router: Router,
      private casesSrv: CaseService,
  ) { }

  ngOnInit(): void {
      this.fetchPendingConnectionDetails();
  }


  fetchPendingConnectionDetails(page: number = this.page, limit: number = this.itemsPerPage, searchText: string = this.searchText) {
      this.isLoading = true;
      this.casesSrv.getPendingConnectionDetails(page, limit, searchText).subscribe(
          (res) => {
              this.connectionsArr = res.items;
              console.log('connectionsArr', this.connectionsArr)
              this.totalItems = res.total;
              this.hasData = res.items.length > 0 ? true : false;
              this.isLoading = false;
          }
      );
  }

  onPageChange(page: number) {
      this.currentPage = page;
      this.fetchPendingConnectionDetails();
  }

  onSearch() {
      this.searchText = this.searchText?.trim() || '';
      this.currentPage = 1; // Reset to first page on new search
      this.fetchPendingConnectionDetails();
  }

  offSearch() {
      this.searchText='';
      this.fetchPendingConnectionDetails();
  }

  getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
  }


  opencreateConnectionPopUp(selectedConnection: Connection) {
    this.selectedConnection = selectedConnection;
    this.isCreateConnectionPopUpOpen = true;
  }

  closecreateConnectionPopup() {
    this.isCreateConnectionPopUpOpen = false;
  }

  createConnection() {
    this.isLoading = true;

    if (this.selectedConnection.partytype === 'Individual') {
      this.partyId = this.selectedConnection.partyid
      this.userId = this.selectedConnection.userid
      this.caseId = this.selectedConnection.caseid
      this.casesSrv.cerateConnection(this.partyId, this.userId).subscribe(
        (res) => {
    
          this.isLoading = false;
    
          if (res?.status) {
    
            this.connectionsArr = res.data;
            this.totalItems = res.totalItems;
            this.hasData = res.data?.length > 0;
    
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Connection created successfully",
              customClass: {
                popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white',
                title: 'dark:text-white',
              }
            })
            .then(() => {
              this.isCreateConnectionPopUpOpen = false;
              const id = this.caseId
              this.router.navigate([`/cases/view-selected-case/${id}`]);
            });
  
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
    } else if (this.selectedConnection.partytype === 'Organization') {
      this.partyId = this.selectedConnection.partyid
      this.userId = this.selectedConnection.userid
      this.orgId = this.selectedConnection.organizationid
      this.orgUserId = this.selectedConnection.organizationuserid
      this.caseId = this.selectedConnection.caseid
      this.casesSrv.cerateConnectionForOrg(this.partyId, this.userId, this.orgId, this.orgUserId).subscribe(
        (res) => {
    
          this.isLoading = false;
    
          if (res?.status) {
    
            this.connectionsArr = res.data;
            this.totalItems = res.totalItems;
            this.hasData = res.data?.length > 0;
    
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Connection created successfully",
              customClass: {
                popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white',
                title: 'dark:text-white',
              }
            })
            .then(() => {
              this.isCreateConnectionPopUpOpen = false;
              const id = this.caseId
              this.router.navigate([`/cases/view-selected-case/${id}`]);
            });
  
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

}

class Connection {
  partyid!: number
  userid!: number
  caseid!: number
  casenumber!: string
  casetype!: string
  casestatus!: string
  createdat!: Date
  partyrole!: string;
  partystatus!: string;
  partynic!: string;
  partyname!: string;
  organizationuserid!: number;
  organizationid!: number;
  partytype!: string;
  organizationname!: string;
  organizationusernic!: string;
  organizationusername!: string;

}