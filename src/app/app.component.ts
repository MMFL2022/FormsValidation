import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  testFormGroup: FormGroup;

  testFieldAModel: string = '';
  duplicateName: boolean = false;

  constructor() {
    this.testFormGroup = new FormGroup({
      'testFieldAInput': new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(64),
          Validators.pattern('[a-zA-Z]+')
        ]
      }),
    });
  }
}