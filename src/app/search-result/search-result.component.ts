import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any = [];
  searchQuery: String = "";

  private parmSub: any;
  private artistSub: any;

  constructor(private route: ActivatedRoute, private _musicDataService: MusicDataService) { 
    
  }

  ngOnInit(): void {
    this.parmSub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];

      this.artistSub = this._musicDataService.searchArtists(this.searchQuery).subscribe((data) => {
        this.results = data.artists.items.filter(data => data.images.length > 0);

      });

  });

    
  }

  ngOnDestroy(): void {
    this.parmSub.unsubscribe();
    this.artistSub.unsubscribe();
  }
}
