import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { SingleComponent } from './single/single.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {path:'',redirectTo:'/',pathMatch:'full'},
  {path:'',component:HomeComponent},
   {path:'category/:id',component:CategoryComponent},
  {path:'tag/:id',component:TagsComponent},
  {path:'about',component:PageComponent},
  {path:'useful-links',component:PageComponent},
  {path:':id/:id',component:SingleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
