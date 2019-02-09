import { Directive, ElementRef, Input, Renderer2, ViewContainerRef, TemplateRef, Type } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { createProjectableNode } from '../utils';
import { EventListenerState } from '../../../../core/src/lib/states';
import { takeUntilDestroy } from '../../../../core/src/lib/utils';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[pDropdown]',
  exportAs: 'pDropdown',
})
export class DropdownDirective {
  private _pDropdown: string | TemplateRef<any> | Type<any>;

  @Input()
  set pDropdown(v: string | TemplateRef<any> | Type<any>) {
    this._pDropdown = v;

    if (this.dropdownContainer) this.remove();
    this.view();
  }
  get pDropdown() {
    return this._pDropdown;
  }

  @Input('pDropdownShowInitialize')
  show: boolean = false;

  @Input('pDropdownTrigger')
  trigger: 'mousemove' | 'click' = 'click';

  @Select(EventListenerState.getOne('mousemove'))
  mousemove$: Observable<MouseEvent>;

  @Select(EventListenerState.getOne('click'))
  click$: Observable<MouseEvent>;

  container: HTMLElement;
  dropdownContainer: HTMLElement;

  constructor(private renderer: Renderer2, private elRef: ElementRef, private vcRef: ViewContainerRef) {}
  private subscribeToMouse() {
    (this.trigger === 'mousemove' ? this.mousemove$ : this.click$)
      .pipe(
        takeUntilDestroy(this),
        filter(event => !!event),
      )
      .subscribe(event => {
        if (this.elRef.nativeElement.contains(event.target)) {
          if (this.show) {
            this.renderer.addClass(this.dropdownContainer, 'd-none');
            this.show = false;
          } else {
            this.renderer.removeClass(this.dropdownContainer, 'd-none');
            this.show = true;
          }
        } else if (
          !this.elRef.nativeElement.contains(event.target) &&
          !this.dropdownContainer.contains(event.target as Node)
        ) {
          this.renderer.addClass(this.dropdownContainer, 'd-none');
          this.show = false;
        }
      });
  }

  ngOnInit(): void {
    this.view();
    this.subscribeToMouse();
  }

  ngOnDestroy(): void {}

  view() {
    const element: HTMLElement = this.elRef.nativeElement;
    const elWidth = element.offsetWidth;

    this.container = this.renderer.createElement('div');
    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.addClass(this.container, 'd-inline-block');
    const parent = this.renderer.parentNode(element);
    this.renderer.appendChild(this.container, element);

    this.dropdownContainer = this.renderer.createElement('div');

    if (!this.show) this.renderer.addClass(this.dropdownContainer, 'd-none');

    this.renderer.addClass(this.dropdownContainer, 'card');
    this.renderer.setStyle(this.dropdownContainer, 'position', 'absolute');
    this.renderer.setStyle(this.dropdownContainer, 'min-width', `${elWidth}px`);

    const dropdown = this.renderer.createElement('div');
    this.renderer.addClass(dropdown, 'card-body');

    const dropdownContentNode = createProjectableNode.call(this, this.pDropdown);
    dropdownContentNode.forEach(node => {
      this.renderer.appendChild(dropdown, node);
    });

    this.renderer.appendChild(this.dropdownContainer, dropdown);

    this.renderer.appendChild(this.container, this.dropdownContainer);
    this.renderer.appendChild(parent, this.container);
  }

  remove() {
    this.dropdownContainer.remove();
  }
}
