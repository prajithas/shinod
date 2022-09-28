import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { faCalendar,faTags } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF,faTwitter} from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  faCalendar=faCalendar;faTags=faTags;faFacebookF=faFacebookF;
catId:any='';
id:any;
posts:any={
  "title":'',
  "content":'',
  "date":"",
  "categories":'',
  "tags":'',
  
};
  private url="https://shinod.in/wp-json/wp/v2/posts";
  per_page = 6;

  constructor(private postService:PostService,private route:ActivatedRoute,private router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;   
  }

  ngOnInit(): void {
    this.id = this. route. snapshot. paramMap. get('id');
    console.log(this.id);
 
      this.postService.getCategory("https://shinod.in/wp-json/wp/v2/categories")
      .subscribe((response: any) => {
        //this.catId=response.id;
        console.log(response);
        const result = response.filter((obj:any) => {
          return obj.slug === this.id;
        });
        this.catId=JSON.parse(JSON.stringify(result))[0].id;   
        this.postService.getPostsByCategory(this.url,this.per_page,this.catId)
        .subscribe((response: any) => {
          
          this.posts = JSON.parse(JSON.stringify(response));
          localStorage.removeItem("categoryId");
        });
        })
    
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
   
}
