import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AccountService} from "../account.service";
import {authErrorsListToken} from "../../core/auth/auth.providers";

@Component({
  selector: 'app-write-project',
  templateUrl: './write-project.component.html',
  styleUrls: ['./write-project.component.scss']
})
export class WriteProjectComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  error: string | null = null;
  @Output() isComplete: EventEmitter<boolean> = new EventEmitter(); // to close dialog on complete
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter(); // to toggle loading on write project dialog
  @Input() editProject: any; // to toggle loading on write project dialog


  constructor(@Inject(authErrorsListToken) private authErrorCodes: Map<string, string>, private formBuilder: FormBuilder,
              private accService: AccountService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nickname: [this.editProject?.nickname, [
        Validators.required,
        Validators.maxLength(30)
      ]],
      dbURL: this.formBuilder.control(this.editProject?.dbURL, RxwebValidators.url()),
    });

  }

  async submit(form: any): Promise<void> {
    if (this.form.valid) {
      try {
        this.isLoading.emit(true);
        // pass in new values as well as old ones so we can update the old array element
        await this.accService.writeProject(form, this.editProject);
        this.isComplete.emit(true);
      } catch (err) {
        if (this.authErrorCodes.has(err.message)) {
          this.error = err.message;
        } else {
          this.error = err;
        }
        // print error to console if user wants to see the exact message
        console.error(err.message);
        this.isLoading.emit(false);
      }
    }
  }
}
