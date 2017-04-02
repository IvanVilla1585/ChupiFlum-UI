import {Injectable, ElementRef} from '@angular/core';


@Injectable()
export class ShowFeedback {

  constructor(private element: ElementRef){}


  template(msg){
    let template = `<div class="container-message">
      <figure class="image-message">
        <img src="assets/images/icons/message.png" alt="">
      </figure>
      <div class="text-message">
        <span>${msg}</span>
      </div>
    </div>`;
    return template;
  }

  createMessage(msg){
    this.element.nativeElement.insertAdjacentHTML("beforeBegin", this.template(msg));
  }
}