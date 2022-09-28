import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  posts: any;id:any;
  private url="https://shinod.in/wp-json/wp/v2/pages?slug=";
  per_page = 6;
  constructor(private postService:PostService,private router:Router,private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id=this.router.url.split('/',2)[1];
      this.postService.getPageById(this.url,this.id).subscribe((post:any) => {
      this.posts=JSON.parse(JSON.stringify(post));
      console.log(this.posts);
  });
  }
}