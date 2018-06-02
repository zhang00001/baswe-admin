import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ShopService } from "./../../lib/service/shop.service";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"]
})
export class SignupPageComponent implements OnInit {
  authcode: "";


  loopTime = 0;
  newShop: IShop = {
    telphone: "",
    boss_name: "",
    shop_name: "",
    phone: "",
    password: "",
    region: "",
    city: "",
    addr: "",
    qq: ""
  };
  values:any[]=[]
  options: CascaderOption[] = [];

  ngOnInit() {
    this.changeNzOptions();
  }

  public form: FormGroup;

  constructor(private fb: FormBuilder, public shop: ShopService) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required]
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
  signup() {
    this.shop.signup(this.newShop, this.authcode);
  }
  sendAuthcode() {
    if (/^1[3-9]\d{9}$/.test(this.newShop.phone)) {
      console.log(this.newShop.phone);
      this.loopTime = 60;
      let timer = setInterval(() => {
        if (this.loopTime > 0) {
          this.loopTime--;
        } else {
          clearInterval(timer);
        }
      }, 1000);
      // this.shop.sendAuthcode(this.newShop.phone)
    } else {
      this.shop.http.createMessage("warning", "手机号不合法");
    }
  }
  async changeNzOptions() {
    let regions = await this.shop.getCityJSON();
    this.options = regions.map(region => {
      let cityChildren = region.city.map(city => {
        let areaChildren = city.area.map(area => {
          return {
            label: area,
            value: area,
            isLeaf: true
          };
        });
        return { value: city.name, label: city.name, children: areaChildren };
      });
      return { label: region.name, value: region.name, children: cityChildren };
    });
    console.log(this.options);


  }
}
