import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostService } from '../post.service';
import { faCalendar,faTags } from '@fortawesome/free-solid-svg-icons';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  faCalendar=faCalendar;faTags=faTags;
  public id: any;
  public categoryId:any;
  public tagId:any;
  tag:any=[];
  posts:any={
    "title":'',
    "content":'',
    "date":"",
    "categories":'',
    "tags":'',
    
  };
  categoryName:any={
    "name":""
  };
  tagName:any={"name":''}; 
  constructor(private router:Router,private route:ActivatedRoute,private postService:PostService,private meta:Meta,private title:Title) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this. route. snapshot. paramMap. get('id');
    let postId=this.id;
    
  }
  ngOnInit(): void {  
   
    var postsId=this.id.split('_',2)[1];
    this.postService.getPostById(postsId).subscribe((post:any) => {
      this.posts=JSON.parse(JSON.stringify(post));
     
     this.categoryId=this.posts.categories[0];
    this.categoryName=this.getcategoryName(this.categoryId);
    let len=this.posts.tags.length;
    
    for(let i=0;i<len;i++){
     
     this.gettagName(this.posts.tags[i]);
    
    }
    
  this.meta.addTags([
    {'name':'description',content:this.posts.excerpt.rendered+'shinod.in is an online journal, Personal blog of shinod edakkad, a web journo, who interested in domain, web hosting, web designing and newsportal management'},
    {'name':'author',content:'shinod'},
    {'property':'og:title',content:this.posts.title.rendered},
    {'property':'og:description',content:this.posts.excerpt.rendered+'shinod.in is an online journal, Personal blog of shinod edakkad, a web journo, who interested in domain, web hosting, web designing and newsportal management'},
    {'name':'keywords',content:'shinod,journalist,Personal blog,web journo,domain, web hosting, web designing'},
  ]);
  this.setTitle(this.posts.title.rendered);
  });
  
}
public setTitle(newTitle:string){
  this.title.setTitle(newTitle);
 }

getcategoryName(categoryId:any){
 
 return this.postService.getCategoryNameById(categoryId).subscribe((category:any) => {
    this.categoryName=JSON.parse(JSON.stringify(category));
    localStorage.setItem("categoryId",this.categoryName.id);
  })
}
gettagName(tagId:any){
 
 return this.postService.getTagNameById(tagId).subscribe((tag:any) => {
  this.tagName=(JSON.parse(JSON.stringify(tag)));
  this.tag.push(this.tagName);
});
}
navigate(){
  this.router.navigate(['category/'+this.categoryName.slug],{state:{category:this.categoryId}})
}
}
