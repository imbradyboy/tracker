import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AccountService} from "../../account.service";
import {ResetLoading, SetLoading} from "../../../core/state/loader/loader.actions";
import {authErrorsListToken} from "../../../core/auth/auth.providers";

@Component({
  selector: 'app-write-project',
  templateUrl: './write-project.component.html',
  styleUrls: ['./write-project.component.scss']
})
export class WriteProjectComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  error: string | null = null;
  @Output() isComplete: EventEmitter<boolean> = new EventEmitter(); // to close dialog on complete

  constructor(@Inject(authErrorsListToken) private authErrorCodes: Map<string, string>, private formBuilder: FormBuilder, private accService: AccountService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nickname: ['', Validators.required],
      dbURL: this.formBuilder.control('', RxwebValidators.url()),
    });

  }

  async submit(form: any): Promise<void> {
    console.log(form);

    if (this.form.valid) {


      try {
        await this.accService.writeProject(form);
        this.isComplete.emit(true);
      } catch (err) {
        if (this.authErrorCodes.has(err.code)) {
          this.error = err.code;
        } else {
          this.error = err;
        }
        // print error to console if user wants to see the exact message
        console.log(err);
      }
    }
  }
}