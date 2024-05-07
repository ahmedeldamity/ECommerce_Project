import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';

  constructor(@Self() public controlDir:NgControl){
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl{
    return this.controlDir.control as FormControl;
  }

  getErrorMessage(label:string):string{
    if(label === "Password")
      return "Password not complex enough.";
    return "Must be Egyptian phone number."
  }

}
