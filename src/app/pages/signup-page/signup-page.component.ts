import { Component, OnInit, } from "@angular/core";
import { Router, } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ShopService } from "./../../lib/service/shop.service";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"]
})
export class SignupPageComponent implements OnInit {
  authcode: "";
  checkLicense: boolean = false;
  repeatPassword: string = '';
  isSignuping: boolean = false;

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
    qq: "",
    area: ""
  };
  timmer: any;
  values: any[] = []
  options: CascaderOption[] = [];

  ngOnInit() {

    this.changeNzOptions();
  }


  constructor(private fb: FormBuilder, public shop: ShopService, public router: Router) {
  }

  public onChanges(values: any): void {
    console.log(values);
  }
  async signup() {
    if (this.repeatPassword != this.newShop.password) {
      return this.shop.http.createMessage('warning', '密码不一致')
    }
    if (!this.checkLicense) {
      return this.shop.http.createMessage('warning', '请勾选协议')
    }
    if (this.values.length < 3) {
      return this.shop.http.createMessage('warning', '请选择地区')
    }
    this.newShop.region = this.values[0];
    this.newShop.city = this.values[1];
    this.newShop.area = this.values[2];

    if (!this.isSignuping) {
      this.isSignuping = true;
      let result = await this.shop.signup(this.newShop, this.authcode);
      if (result) {
        await this.shop.http.createMessage('success', '注册成功');
      }

      this.isSignuping = false;
    } else {
      return;
    }

  }
  async sendAuthcode() {
    if (/^1[3-9]\d{9}$/.test(this.newShop.phone)) {
      console.log(this.newShop.phone);
      await this.shop.sendAuthcode(this.newShop.phone);
      this.loopTime = 60;
      if (this.timmer) {
        return;
      }
      this.timmer = setInterval(() => {
        if (this.loopTime > 0) {
          this.loopTime--;
        } else {
          clearInterval(this.timmer);
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

  }

  async goLogin() {
    history.back()
  }
}
