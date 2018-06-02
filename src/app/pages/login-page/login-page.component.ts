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
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  username: string = "";
  password: string = "";
  selectedLoginOption: LoginOption;
  isElectron: boolean = !!this.electron.remote;


  constructor(
    private fb: FormBuilder,
    public admin: ShopService,
    public router: Router,
    public storage: StorageService,
    public m2: M2Service,
    public http: MyHttpService,
    public lowHttp: Http,
    public electron: ElectronService
  ) {}

  modules: IModule[] = [];

  async ngOnInit() {

  }
  async login() {
    this.cmsLogin();
  }

  async cmsLogin() {



  }
}
