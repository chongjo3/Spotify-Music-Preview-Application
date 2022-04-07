import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  private parmSub: any;
  private albumSub: any;

  constructor(private route: ActivatedRoute, private _musicDataService: MusicDataService, private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {

    this.parmSub = this.route.params.subscribe((params) => {
      var albumId = params['id'];

      this.albumSub = this._musicDataService.getAlbumById(albumId).subscribe(data => this.album = data);

  });
  }

  transformDate(date: string){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(date, 'M/d/YY')

    return formattedDate;
  }
  
  ngOnDestroy(): void {
    this.albumSub.unsubscribe();
    this.parmSub.unsubscribe();
  }

  addToFavourites(trackID: string){

    this._musicDataService.addToFavourites(trackID).subscribe(
      (data) => {
        console.log(data);
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    },
    (error)=>{
      this.snackBar.open("Unable to add song to Favourites", "Done", { duration: 1500 });
    } )
  }

}
