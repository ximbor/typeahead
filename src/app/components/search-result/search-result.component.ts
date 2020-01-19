import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/models/PostComment';

@Component({
  selector: 'ta-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input()
  comments: PostComment[];
  constructor() { }

  ngOnInit() {
  }

}
