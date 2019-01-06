import { Observable, forkJoin, MonoTypeOperatorFunction, pipe, Subject } from 'rxjs';
import { delay, filter, take, takeUntil, tap } from 'rxjs/operators';
import { notNull } from './common-utils';

export function fromFork(...streams: Array<Observable<any>>): Observable<any> {
  return forkJoin(...streams.map(stream => stream.pipe(take(1))));
}

export function takeNotNulllUntil<T>(destroy$): MonoTypeOperatorFunction<T> {
  return pipe(
    filter(notNull),
    takeUntil(destroy$),
  );
}

export function takeUntilDestroy<T>(component: any): MonoTypeOperatorFunction<T> {
  const proto = Object.getPrototypeOf(component);
  const onDestroy = proto.ngOnDestroy;

  if (!(onDestroy && typeof onDestroy === 'function')) {
    throw new Error(
      (proto.constructor.name || 'Component') +
        ' must have the "ngOnDestroy" method for takeUntilDestroy operator to work.' +
        ' You may use XcDestroy decorator on component class for quick implementation.',
    );
  }

  const destroy$ = new Subject<void>();

  proto.ngOnDestroy = function() {
    onDestroy.apply(this, arguments);

    destroy$.next();
    destroy$.complete();
  };

  return takeUntil<T>(destroy$);
}
