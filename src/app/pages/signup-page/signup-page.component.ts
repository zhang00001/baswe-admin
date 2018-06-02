import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }]
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }]
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }]
  }]
}];

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  // constructor() { }

  ngOnInit() {
  }
  nzOptions = options;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required ]
    });
  }

  public reset(): void {
    this.form.reset();
    console.log(this.form.value);
  }

  public submit(): void {
    console.log(this.form.value);
  }

  public onChanges(values: any): void {
    console.log(values);
  }

}



// @Component({
//   selector: 'nz-demo-cascader-reactive-form',
//   template: `
//     <form [formGroup]="form" novalidate>
//       <nz-cascader
//         [nzOptions]="nzOptions"
//         (nzChange)="onChanges($event)"
//         [formControlName]="'name'">
//       </nz-cascader>
//     </form>
//     <br>
//     <button nz-button (click)="reset()">Reset</button>
//     <button nz-button (click)="submit()">Submit</button>
//     `,
//   styles  : [
//     `
//     .ant-cascader-picker {
//       width: 300px;
//     }
//     `
//   ]
// })
// export class class SignupPageComponent implements OnInit  {
//   /** init data */
//   nzOptions = options;

//   public form: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.createForm();
//   }

//   private createForm(): void {
//     this.form = this.fb.group({
//       name: [null, Validators.required ]
//     });
//   }

//   public reset(): void {
//     this.form.reset();
//     console.log(this.form.value);
//   }

//   public submit(): void {
//     console.log(this.form.value);
//   }

//   public onChanges(values: any): void {
//     console.log(values);
//   }
// }
