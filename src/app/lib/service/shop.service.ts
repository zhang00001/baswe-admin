import { Injectable } from "@angular/core";
import { MyHttpService } from "./http.service";

@Injectable()
export class ShopService {
  constructor(public http:MyHttpService) {

  }
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
    getCityJSON: "/city.json"
  };
  signup(NewShop:IShop,authcode:string){
    NewShop["authcode"]=authcode;
    return this.http.Post(this.shopApi.signup,NewShop)
  }
  sendAuthcode(phone:string){

return this.http.Get(this.shopApi.shopSignupAuthCode,{params:{phone} })
  }
  getCityJSON():Promise<IRegion[]>{
    return this.http.Get(this.shopApi.getCityJSON)
  }
}
