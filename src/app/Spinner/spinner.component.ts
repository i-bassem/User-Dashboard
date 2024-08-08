import { Component } from '@angular/core';
import { LoaderService } from '../_services/Loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
 
 constructor(public loader:LoaderService){}

}
