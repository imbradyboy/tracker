/**
 * This directive allows us to insert a background image onto an element
 */
import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements AfterViewInit {

  @Input('appBgImage') backgroundImage: string = '';
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }


  ngAfterViewInit() {
    this.el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
    this.el.style.backgroundSize = 'cover';
  }

}
