import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> | undefined;
  private favouriteSub: any;

  constructor(private _musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.favouriteSub = this._musicDataService.getFavourites().subscribe(data => this.favourites = data.tracks);
  }

  removeFromFavourites(id: string){
    this.favouriteSub = this._musicDataService.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks);
  }

  ngOnDestroy(): void {
    this.favouriteSub.unsubscribe();
  }

}
