import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnDestroy {

  albums: any;
  artist: any;

  private artistSub: any;
  private albumSub: any;
  private parmSub: any;

  constructor(private route: ActivatedRoute, private _musicDataService: MusicDataService) {}


  ngOnInit(): void {

    this.parmSub = this.route.params.subscribe((params) => {
      var artistId = params['id'];

      this.artistSub = this._musicDataService.getArtistById(artistId).subscribe(data => this.artist = data);
      
      this.albumSub = this._musicDataService.getAlbumsByArtistId(artistId).subscribe(data => this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === 
    curValue.name.toUpperCase()) === index));

    });
  }

  transformDate(date: string){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(date, 'M/d/YY')

    return formattedDate;
  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe();
    this.albumSub.unsubscribe();
    this.parmSub.unsubscribe();
  }

}
