import { Component, OnInit } from '@angular/core';
import { PostComment } from 'src/app/models/PostComment';

@Component({
  selector: 'ta-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  selectedComments: PostComment[];

  constructor() { }

  ngOnInit() {
  }

  setComments(comments: PostComment[]) {
    this.selectedComments = comments;
  }

}
