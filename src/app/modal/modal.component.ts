import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormBuilder().group({
      lastName: [data.element ? data.element.lastName : '', [
        Validators.required,
        Validators.minLength(5),
      ]],
      firstName: [data.element ? data.element.firstName : '', [
        Validators.required,
        Validators.minLength(5),
      ]],
      middleName: [data.element ? data.element.middleName : '', [
        Validators.minLength(5),
      ]],
      email: [data.element ? data.element.email : '', [
        Validators.required,
        Validators.email,
      ]],
      status: [data.element ? data.element.status : 'Активен', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
