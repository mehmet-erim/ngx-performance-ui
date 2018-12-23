import { Component, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'mn-toaster',
  template: `
    <div #toast class="toaster alert alert-{{ type }} alert-dismissible show">
      <div *ngIf="header" class="header">
        <div class="icon">V</div>
        <span class="alert-heading">{{ header }}</span>
      </div>
      <div class="body" [innerHtml]="body"></div>
      <button *ngIf="closeOnClick" type="button" class="close" (click)="close()"><span>&times;</span></button>
    </div>
  `,
})
export class ToasterComponent {
  body: SafeHtml;

  header: string;

  timeout: number;
  type: string;

  closeOnClick: boolean;

  @Output() destroy = new EventEmitter<void>();

  @ViewChild('toast') toast: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => this.close(), this.timeout);
  }

  close() {
    this.renderer.setStyle(this.toast.nativeElement, 'animation', 'toastOut .5s');
    setTimeout(() => {
      this.destroy.emit();
    }, 500);
  }
}
