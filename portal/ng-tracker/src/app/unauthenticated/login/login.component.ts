import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {authErrorsListToken} from "../../core/auth/auth.providers";
import {AuthService} from "../../core/auth/auth.service";
import {Store} from "@ngxs/store";
import {ResetLoading, SetLoading} from "../../core/state/loader/loader.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  error: string | null = null;

  constructor(@Inject(authErrorsListToken) private authErrorCodes: Map<string, string>, private formBuilder: FormBuilder,
              private auth: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    // stop loading on complete
    this.store.dispatch([
      ResetLoading
    ]);
  }

  /**
   * Build login form
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: this.formBuilder.control('', Validators.required),
    });
  }

  /**
   * Submit login form
   * @param form
   */
  async submit(form: { email: string, password: string }) {

    // reset error
    this.error = null;

    if (this.form.valid) {
      try {
        // start loading
        this.store.dispatch([new SetLoading('indeterminate')]);


        await this.auth.signIn(form.email, form.password);
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
