import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {authErrorsListToken} from "../../core/auth/auth.providers";
import {Store} from "@ngxs/store";
import {ResetLoading, SetLoading} from "../../core/state/loader/loader.actions";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  error: string | null = null;
  showPassword: boolean = false;

  constructor(@Inject(authErrorsListToken) private authErrorCodes: Map<string, string>, private formBuilder: FormBuilder,
              private auth: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    // stop loading on complete
    this.store.dispatch([
      new ResetLoading()
    ]);
  }

  /**
   * Build login form
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      // regex for at least 8 characters long with a mix of letters, numbers, and at least one symbol from !@#$%^&*_
      password: ['', Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}')],
      confirmPassword: ['', RxwebValidators.compare({fieldName: 'password'})]
    });
  }

  /**
   * Submit registration form
   * @param form
   */
  async submit(form: { email: string, password: string, confirmPassword: string }) {

    // reset error
    this.error = null;

    if (this.form.valid) {
      try {
        // start loading
        this.store.dispatch([new SetLoading('indeterminate')]);


        await this.auth.signUp(form.email, form.password);
      } catch (err) {
        if (this.authErrorCodes.has(err.code)) {
          this.error = err.code;
        } else {
          this.error = err;
        }
        // print error to console if user wants to see the exact message
        console.log(err);

        // stop loading on fail
        this.store.dispatch([
          new ResetLoading()
        ]);
      }
    }
  }
}
