import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jsonData: any = {};
  overlayArray: any = [];
  overlayIndex: number = 0;
  productName: string;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    const proxy = '';
    this.http.get('./assets/myData.json').subscribe(data => {
      this.jsonData = data;
    });

    //getJSONData();


  }

  badgeClick(index) {
    this.overlayArray.forEach((ele, idx) => {
      if (index == idx) {
        ele.hidden = false;
        this.overlayIndex = index;
      } else {
        ele.hidden = true;
      }
    });
  }

  goNext() {
    this.overlayArray[this.overlayIndex].hidden = true;
    if (this.overlayIndex === this.overlayArray.length - 1) {
      this.overlayIndex = 0;
    } else {
      this.overlayIndex++;
    }
    this.overlayArray[this.overlayIndex].hidden = false;

  }

  goPrev() {
    this.overlayArray[this.overlayIndex].hidden = true;
    if (this.overlayIndex === 0) {
      this.overlayIndex = this.overlayArray.length - 1;
    } else {
      this.overlayIndex--;
    }
    this.overlayArray[this.overlayIndex].hidden = false;
  }

  openOverlay(product) {
    this.productName = product.name;
    product.thumbnail.hidden = false;
    product.images.forEach(ele => {
      ele.hidden = true;
    });
    this.overlayArray.push(product.thumbnail);
    this.overlayArray.push(...product.images);
    document.getElementById("myNav").style.height = "100%";
  }

  closeOverlay() {
    document.getElementById("myNav").style.height = "0";
    this.overlayIndex = 0;
    this.overlayArray = [];
  }

  getFlagValue(flag) {
    return flag.id === 'newcore' ? 'New' : flag.id === 'organic' ? 'Organic' :
      flag.id === 'fairTrade' ? 'Fair Trade' : ''
  }

  getMessage(message: string) {
    const idx = message.toLowerCase().indexOf('code');
    if (idx != -1) {
      const code = message.substring(idx + 5, message.length);
      return `${message.substring(0, idx + 5)} <span class="message-code">${code}</span>`
    }
  }
}

