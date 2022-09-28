import { Component, OnInit } from '@angular/core';
import { faFacebookF,faTwitter,faLinkedinIn,faInstagram,faYoutube } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faFacebookF=faFacebookF;faTwitter=faTwitter;faLinkedinIn=faLinkedinIn;faInstagram=faInstagram;faYoutube=faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
