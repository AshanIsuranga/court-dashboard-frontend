import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { SerchableDropdownComponent } from '../../../components/serchable-dropdown/serchable-dropdown.component'
import { CoreService } from '../../../services/core-service/core.service';
import Swal from 'sweetalert2';
import { CustomDatepickerComponent } from '../../../components/custom-datepicker/custom-datepicker.component';


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
  selector: 'app-create-a-case',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SerchableDropdownComponent, CustomDatepickerComponent],
  templateUrl: './create-a-case.component.html',
  styleUrl: './create-a-case.component.css'
})
export class CreateACaseComponent {

}
