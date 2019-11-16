import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {FormControl} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icims-app';
  private apiUrl = 'https://testapi.io/api/crimsonsunset/code-challenge-jobs';
  jobs: any = [];
  filteredJobs: any = [];
  jobTitles: any = [];
  filter: String = '';
  expanded: boolean = false;
  myControl = new FormControl();

  onSelect(evt: any){
    this.filter = evt.source.value;
  }

  onEnter(evt: any){
    if(this.filter==''){
      this.filteredJobs = this.jobs;
      this.expanded=false;
    }else{
      let filter = this.filter;
      let newFiltered = [];
      this.jobs.map(function(data){
        if(data.data['title']===filter){
          newFiltered.push(data);
        }
      })
      this.filteredJobs = newFiltered;
      this.expanded = true;
    }
  }

  constructor(private api: ApiService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'account_circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/account_circle.svg'));
  }

  ngOnInit() {
    try{
    this.getJobs();
    }catch{
      
    }
  }

  private getJobs(): void {
    this.api.getJobs().subscribe(data => {
      this.jobs = data.jobs;
      this.filteredJobs = data.jobs;
      this.jobs.map(data =>
          this.jobTitles.push(data.data['title'])
        ) 
        
    });
  }
}
