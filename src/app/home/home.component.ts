import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {Meta,Title} from '@angular/platform-browser';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;categoryName:any;faCalendar=faCalendar;
  private url="https://shinod.in/wp-json/wp/v2/posts";
  per_page = 6;
  constructor(private postService:PostService,private meta:Meta,private title:Title) {
    this.meta.addTags([
      {'name':'description',content:'shinod.in is an online journal, Personal blog of shinod edakkad, a web journo, who interested in domain, web hosting, web designing and newsportal management'},
      {'name':'author',content:'shinod'},
      {'name':'keywords',content:'shinod,journalist,Personal blog,web journo,domain, web hosting, web designing'},
    ]);
    this.setTitle('Shinod-digital media management');
   }
   public setTitle(newTitle:string){
    this.title.setTitle(newTitle);
   }
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
  page = 1;
  next() {
      this.postService.nextUser(this.page += 1).subscribe(data => {
        console.log(data);
        if (data) {
          this.posts = data;
        }
      });
    }
    previous() {
      if (this.page > 1) {
        this.postService.previousUser(this.page -= 1).subscribe(data => {
          console.log(data);
          if (data) {
            this.posts = data;
          }
        });
      }
    }
}
