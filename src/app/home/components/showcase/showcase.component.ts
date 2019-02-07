import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PaginationComponent, Toaster } from '../../../../../projects/ui/src/public_api';
import { LoaderSetProgress, Mask, LoaderState, transformByRegex } from '../../../../../projects/core/src/public_api';
import { ToasterShow, LayoutScroll } from '../../../../../projects/ui/src/lib/actions';

@Component({
  selector: 'p-showcase',
  templateUrl: './showcase.component.html',
  styles: [],
})
export class ShowcaseComponent implements OnInit {
  toaster = { closeOnClick: false, type: 'primary' } as Toaster.State;

  selectValue;

  inputValue = '';

  textMask: Mask.Config = {
    mask: ['+', '9', '0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  isModalShow;

  radio: 'one' | 'two' = 'two';

  checkbox: boolean;

  textarea: string;

  autocompleteValue;

  spinner;

  @Select(LoaderState.progress)
  progress$: Observable<boolean>;

  page = {
    totalPages: 15,
    paginationRange: 7,
    previousLabel: 'Previous',
    nextLabel: 'Next',
  } as PaginationComponent;

  date = new Date();

  constructor(private store: Store) {}

  ngOnInit() {
    console.log(transformByRegex(53088299121, this.textMask));
  }

  showToaster() {
    this.store.dispatch(
      new ToasterShow({
        type: this.toaster.type,
        header: this.toaster.header || 'Okay!',
        body: this.toaster.body || '<i>Hello World!</i> <b>Hi!!</b>',
        closeOnClick: this.toaster.closeOnClick,
        timeout: this.toaster.timeout,
      }),
    );
  }

  log(val) {
    console.warn(val);
  }

  scrollTo(location: 'top' | 'bottom') {
    this.store.dispatch(new LayoutScroll(location));
  }

  onChangeRadio(value) {
    console.log(value);
  }

  setProgress(status: boolean) {
    this.store.dispatch(new LoaderSetProgress(status));
  }
}
