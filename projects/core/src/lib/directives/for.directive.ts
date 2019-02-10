import {
  Directive,
  EmbeddedViewRef,
  Input,
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';

class ForContext {
  constructor(public $implicit: any, public index: number) {}
}

@Directive({
  selector: '[pFor]',
})
export class ForDirective {
  @Input()
  set pForOf(items: any[]) {
    if (!Array.isArray(items)) throw 'pForOf must be an array!';

    if (!this.iterableDiffer && items) {
      this.iterableDiffer = this.iterable.find(items).create(this.trackByFn);
    }

    const changes = this.iterableDiffer.diff(items);
    if (changes) {
      changes.forEachOperation((record: IterableChangeRecord<any>, previousIndex: number, currentIndex: number) => {
        if (record.previousIndex == null) {
          this.vcRef.createEmbeddedView(this.tempRef, new ForContext(record.item, currentIndex), currentIndex);
        } else if (currentIndex == null) {
          this.vcRef.remove(previousIndex);
        } else {
          const view = this.vcRef.get(previousIndex);
          this.vcRef.move(view, currentIndex);
        }
      });

      changes.forEachIdentityChange((record: IterableChangeRecord<any>) => {
        const viewRef = this.vcRef.get(record.currentIndex) as EmbeddedViewRef<ForContext>;
        viewRef.context.$implicit = record.item;
      });
    }
  }

  @Input('pForTrackBy')
  trackBy: TrackByFunction<any>;

  get trackByFn(): TrackByFunction<any> {
    return this.trackBy || ((index, item = {}) => item.id || index);
  }

  private iterableDiffer: IterableDiffer<any>;

  constructor(private iterable: IterableDiffers, private tempRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}
