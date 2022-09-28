import { Component, OnInit } from '@angular/core';

import { faFacebookF,faTwitter,faLinkedinIn,faInstagram,faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faFacebookF=faFacebookF;faTwitter=faTwitter;faLinkedinIn=faLinkedinIn;faInstagram=faInstagram;faYoutube=faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
