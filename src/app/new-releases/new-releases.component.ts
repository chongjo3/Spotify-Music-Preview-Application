import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy{

  releases: any[] | undefined;

  private releasesSub: any;

  constructor(private _musicDataService: MusicDataService) { 
  }

  ngOnInit(): void {
    
    this.releasesSub = this._musicDataService.getNewReleases().subscribe(data => this.releases = data.albums.items);
  }

  transformDate(date: string){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(date, 'M/d/YY')

    return formattedDate;
  }

  ngOnDestroy(){
    this.releasesSub.unsubscribe();
  }

}
