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
  IterableChanges,
} from '@angular/core';
import { NgForOfContext } from '@angular/common';
import compare from 'just-compare';

export type CompareFn<T = any> = (value: T, comparison: T) => boolean;

class RecordViewTuple<T> {
  constructor(public record: any, public view: EmbeddedViewRef<NgForOfContext<T>>) {}
}

@Directive({
  selector: '[pFor]',
})
export class ForDirective {
  @Input('pForOf')
  items: any[];

  @Input('pForTrackBy')
  trackBy: TrackByFunction<any>;

  @Input('pForFilter')
  filter: { key?: string; value: any };

  @Input('pForCompareBy')
  compareBy: CompareFn;

  get compareFn(): CompareFn {
    return this.compareBy || compare;
  }

  get trackByFn(): TrackByFunction<any> {
    return this.trackBy || ((index, item = {}) => item.id || index);
  }

  private iterableDiffer: IterableDiffer<any>;

  constructor(private iterable: IterableDiffers, private tempRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}

  private applyChanges(changes: IterableChanges<any>, items: any[]) {
    const insertTuples: RecordViewTuple<any>[] = [];
    changes.forEachOperation((item: IterableChangeRecord<any>, adjustedPreviousIndex: number, currentIndex: number) => {
      if (item.previousIndex == null) {
        const view = this.vcRef.createEmbeddedView(
          this.tempRef,
          new NgForOfContext<any>(null!, items, -1, -1),
          currentIndex,
        );
        const tuple = new RecordViewTuple<any>(item, view);
        insertTuples.push(tuple);
      } else if (currentIndex == null) {
        this.vcRef.remove(adjustedPreviousIndex);
      } else {
        const view = this.vcRef.get(adjustedPreviousIndex)!;
        this.vcRef.move(view, currentIndex);
        const tuple = new RecordViewTuple(item, <EmbeddedViewRef<NgForOfContext<any>>>view);
        insertTuples.push(tuple);
      }
    });

    for (let i = 0; i < insertTuples.length; i++) {
      insertTuples[i].view.context.$implicit = insertTuples[i].record.item;
    }

    for (let i = 0, ilen = this.vcRef.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<NgForOfContext<any>>>this.vcRef.get(i);
      viewRef.context.index = i;
      viewRef.context.count = ilen;
      viewRef.context.ngForOf = items;
    }

    changes.forEachIdentityChange((record: any) => {
      const viewRef = <EmbeddedViewRef<NgForOfContext<any>>>this.vcRef.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
    });
  }

  ngOnChanges() {
    if (!Array.isArray(this.items)) throw 'pForOf must be an array!';

    let items = [];
    if (this.filter && this.filter.value !== undefined) {
      const compareFn = this.compareFn;

      items = this.items.filter(item => compareFn(this.filter.key ? item[this.filter.key] : item, this.filter.value));
    } else {
      items = this.items;
    }

    if (!this.iterableDiffer && items) {
      this.iterableDiffer = this.iterable.find(items).create(this.trackByFn);
    }
    if (this.iterableDiffer) {
      const changes = this.iterableDiffer.diff(items);
      if (changes) this.applyChanges(changes, items);
    }
  }
}
