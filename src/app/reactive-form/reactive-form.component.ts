import { Component } from "@angular/core";
import {debounceTime} from 'rxjs/operators';
// Must import to use Forms functionality
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  NgForm
} from "@angular/forms";

@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
  styleUrls: ["./reactive-form.component.scss"]
})
export class ReactiveFormComponent {
  regiForm: FormGroup;
  FirstName: string = "";
  LastName: string = "";
  Address: string = "";
  DOB: Date = null;
  Gender: string = "";
  Blog: string = "";
  Email: string = "";
  IsAccepted: number = 0;

  constructor(private fb: FormBuilder) {
    // To initialize FormGroup
    this.regiForm = fb.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Address: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])
      ],
      DOB: [null, Validators.required],
      Gender: [null, Validators.required],
      Blog: [null, Validators.required],
      Email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      IsAccepted: [null]
    });
  }

  // On Change event of Toggle Button
  onChange(event: any) {
    if (event.checked == true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }
  ngOnInit(): void {
    this.onChanges();
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }

  onChanges(){
    this.regiForm.get('FirstName').valueChanges
    .pipe(debounceTime(1500))
    .subscribe(value => {
      if(this.regiForm.get('LastName').value === null || this.regiForm.get('LastName').value === '' ){
        this.regiForm.patchValue({
          LastName: value,
        });
        if(this.regiForm.get('Address').value === null || this.regiForm.get('Address').value === '' ){
          this.regiForm.patchValue({
            Address: value,
          });
        }
      }
    });

    if((this.regiForm.get('FirstName').value !== null || this.regiForm.get('FirstName').value !== '' )){
      this.regiForm.get('LastName').valueChanges
      .pipe(debounceTime(1500))
      .subscribe(value => {
        if(this.regiForm.get('Address').value === null || this.regiForm.get('Address').value === '' ){
          this.regiForm.patchValue({
            Address: value
          });
        }
      });
    }
  }
}
