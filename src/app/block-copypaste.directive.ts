import { Directive } from '@angular/core';
import {HostListener} from '@angular/core';

@Directive({
  selector: '[appBlockCopypaste]'
})
export class BlockCopypasteDirective {

  constructor() {
    console.log('block Copy Paste');
  }

  @HostListener('paste', ['$event'])
  blockPaste(event){
    event.preventDefault();
    console.log('past bloqué');
  }

}
