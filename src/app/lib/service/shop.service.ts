import { Injectable } from "@angular/core";
import { MyHttpService } from "./http.service";
import { Headers } from "@angular/http";

@Injectable()
export class ShopService {
  set shop_id(_id: string) {
    localStorage.setItem("shop_id", _id + "");
  }
  get shop_id() {
    return localStorage.getItem("shop_id");
  }

  constructor(public http: MyHttpService) {}
  shopApi = {
    /**
     * 商户登录
     *
     * body:{username,password}
     */
    signin: "/api/shop/signin",
    /**
     * 商户注册
     * body:IShop,authcode
     *
     */
    signup: "/api/shop/signup",
    /**
     * 员工分页
     */
    employeePage: "/api/shop/employee-page",
    /**
     * 创建员工
     */
    createEmployee: "/api/shop/create-employee",
    /**
     * post
     * query: ?employee_id&shop_id
     *body:IEmployeee
     */
    updateEmployee: "/api/shop/employee/update",
    /**
     * get  注册短信验证码
     * ? phone
     */
    shopSignupAuthCode: "/api/shop/authcode",
    /**
     * 获取
     * * 省份
     *    * 城市
     *      * 区域
     * 返回 IRegion[]
     */
    getCityJSON: "/city.json",
    /**
     * post  提交店铺经纬度
     * ? shop_id
     * body:{lat_lng}
     */
    updateShopLocation: "/api/shop/location/update"
  };
  signin(username: string, password: string) {
    return this.http.Post(this.shopApi.signin, { username, password });
  }
  signup(NewShop: IShop, authcode: string) {
    NewShop["authcode"] = authcode;
    return this.http.Post(this.shopApi.signup, NewShop);
  }
  sendAuthcode(phone: string) {
    return this.http.Get(this.shopApi.shopSignupAuthCode, {
      params: { phone }
    });
  }
  // 声明函数返回IRegion数组类型
  getCityJSON(): Promise<IRegion[]> {
    return this.http.Get(this.shopApi.getCityJSON);
  }
  createEmployee(newEmployee: IEmployee) {
    return this.http.Post(this.shopApi.createEmployee, newEmployee, {
      params: { shop_id: this.shop_id }
    });
  }
  getEmployePage(page: number = 0, pageSize = 5) {
    return this.http.Get(this.shopApi.employeePage, {
      params: { page, pageSize, shop_id: this.shop_id }
    });
  }
  // 删除员工
  deletestaff() {}
  // 更新员工个人信息
  updateStaff(newEmployee: IEmployee) {
    return this.http.Post(this.shopApi.updateEmployee, newEmployee, {
      params: { shop_id: this.shop_id, employee_id: newEmployee.employee_id }
    });
  }
  getLng(lat_lng: string) {
    return this.http.Post(this.shopApi.updateShopLocation, {lat_lng}, {
      params: {
        shop_id: this.shop_id
      }
    });
  }
}
