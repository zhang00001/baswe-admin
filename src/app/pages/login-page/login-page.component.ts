import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


interface LoginOption {
  label: string;
  value: {
    url: string;
  };
}
import {
  AdminService,
  StorageService,
  M2Service,
  MyHttpService,
  ElectronService,
  ShopService
} from "../../lib";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  username: string = "";
  password: string = "";
  selectedLoginOption: LoginOption;
  isElectron: boolean = !!this.electron.remote;
  loading: boolean = false;


  constructor(

    public shop: ShopService,
    public router: Router,
    public storage: StorageService,
    public m2: M2Service,
    public http: MyHttpService,
    public lowHttp: Http,
    public electron: ElectronService
  ) { }

  modules: IModule[] = [];

  async ngOnInit() {

  }
  async login() {
    if (!this.loading) {

      this.loading = true;
      let result = await this.shop.signin(this.username, this.password);

      if (result) {
        this.shop.shop_id = result.shop.shop_id;

        await this.shop.http.createMessage('success', '欢迎回来' + result.shop_name);
        this.storage.adminModuleList = result.modules;
        this.router.navigateByUrl('/admin')
      }
      this.loading = false;

    }
  }


}
