import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faTags } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  id:any; faCalendar=faCalendar;faTags=faTags;faFacebookF=faFacebookF;
  tagname:any;categoryName:any;
  posts:any={
    "title":'',
    "content":'',
    "date":"",
    "categories":'',
    "tags":'',
    
  };
  private url="https://shinod.in/wp-json/wp/v2/posts";
  per_page = 6;
  constructor(private postService:PostService,private route:ActivatedRoute) { 
  this.id = this. route. snapshot. paramMap. get('id');
  this.tagname= this.gettagName(this.id);
  }

  ngOnInit(): void {
    this.postService.getPostsByTag(this.url,this.per_page,this.id)
        .subscribe((response: any) => {
          
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
  initNavSettings(navSettings: any) {
    throw new Error('Method not implemented.');
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
    gettagName(tagId:any){
 
      return this.postService.getTagNameById(tagId).subscribe((tag:any) => {
       this.tagname=(JSON.parse(JSON.stringify(tag))).name;
       
     });
     }
}
