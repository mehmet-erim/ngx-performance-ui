import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'mn-toaster',
  template: `
    <div #toast class="toaster alert alert-{{ type }} alert-dismissible show move-in-top">
      <div *ngIf="header" class="header">
        <div class="icon"><i class="fas fa-info-circle"></i></div>
        <span class="alert-heading">{{ header }}</span>
      </div>
      <div class="body" [innerHtml]="body"></div>
      <button *ngIf="closeOnClick" type="button" class="close" (click)="close()"><span>&times;</span></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.renderer.setStyle(this.toast.nativeElement, 'animation', 'moveOutTop .5s');
    setTimeout(() => {
      this.destroy.emit();
    }, 500);
  }
}
