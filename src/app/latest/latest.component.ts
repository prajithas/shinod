import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {
  posts: any;categoryName:any;
  private url="https://shinod.in/wp-json/wp/v2/posts";
  per_page = 6;
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.url,this.per_page)
    .subscribe(response => {
      
      this.posts = JSON.parse(JSON.stringify(response));
      
      for(let i=0;i<this.posts.length;i++){
        this.postService.getCategoryNameById(this.posts[i].categories[0])
        .subscribe((category:any) => {
          this.categoryName=JSON.parse(JSON.stringify(category)).slug;
          this.posts[i].categoryName=this.categoryName;
        })  
          
      }
    
      
    });
  }

}
