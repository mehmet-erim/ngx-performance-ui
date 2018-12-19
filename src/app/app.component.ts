import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToasterShow } from '../@core/actions/toaster.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mn-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-ui-kit';
  mm = 'hasan';

  myForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onClickToastDispatch() {
    this.store.dispatch(new ToasterShow({ type: 'danger' }));
  }
}
