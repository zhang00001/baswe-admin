import { Component, OnInit } from '@angular/core';
// import { Menu } from 'electron';
import { ShopService, CommonService } from '../../../lib';
import { UploadFile } from "ng-zorro-antd";
import { Observable } from "rxjs";
enum ViewState {
  List = 0,
  AddStaff,
  UpdateStaff
}

@Component({
  selector: 'app-staff-list-page',
  templateUrl: './staff-list-page.component.html',
  styleUrls: ['./staff-list-page.component.css']
})

export class StaffListPageComponent implements OnInit {
  page: number = 0;
  pageSize: number = 10;
  fileList: any[] = [];

  total: number = 10;
  dataSet: IEmployee[] = [];
  ViewState = ViewState;
  state: ViewState = ViewState.List;
  loading: boolean = false;
  customDepartment: boolean = false;
  customJob: boolean = false;
  formatterPercent = value => `${value} cm`;
  repassword: string = ''
  parserPercent = value => value.replace(' cm', '');
  newEmployee: IEmployee = {
    department: "",
    name: '',
    nation: '',
    shop_code: '',
    height: 140,
    password: '',
    password_hash: '',
    nickname: '',
    role_code: '',
    telphone: '',
    phone: '',
    active_flg: '',
    qq: '',
    email: '',
    birthday: new Date(1990, 1, 1),
    on_board: new Date(),
    compensation: 0,
    emergency_contact: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    province: '',
    city: '',
    id_card: '',
    id_card_addr: '',
    sex: 1,
    job: '',
    images: []


  }
  previewImage: string = '';
  previewVisible: boolean = false;
  constructor(public shop: ShopService, public common: CommonService) {

  }
  upload = async item => {
    // await this.
    // this.fileList.push({
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // });
    let base64 = await this.common.convertFileToBase64(item.file);
    let result = await this.common.uploadImage(base64);
    this.fileList.push({ url: result.url, uid: result.id });

    return (
      Observable.of({}).subscribe(
        () => {
          let clearUpload = setTimeout(() => {
            let i = this.fileList.findIndex(file => file.status == "uploading");
            if (i >= 0) {
              this.fileList = this.fileList.filter(
                file => file.status != "uploading"
              );
              console.log(this.fileList);
              // clearInterval(clearUpload);
            }
          }, 1000);
          console.log(`success`, this.fileList);
        },
        () => {
          console.log(`error`);
        }
      ),
      () => {
        console.log("process");
      }
    );
  };
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };


  ngOnInit() {
    this.getEmployeePage()
  }

  async createEmployee() {
    if (!this.newEmployee.name) {
      return this.shop.http.createMessage('error', '缺少用户名')
    }
    if (!this.newEmployee.sex) {
      return this.shop.http.createMessage('error', '缺少性别')
    }
    if (!this.newEmployee.nation) {
      return this.shop.http.createMessage('error', '缺少民族')
    }
    if (!this.newEmployee.birthday) {
      return this.shop.http.createMessage('error', '缺少生日')
    }
    if (!this.newEmployee.phone) {
      return this.shop.http.createMessage('error', '缺少手机号')
    }
    if (!this.newEmployee.education_background) {
      return this.shop.http.createMessage('error', '缺少学历')
    }
    if (!this.newEmployee.speciality) {
      return this.shop.http.createMessage('error', '缺少特长')
    }
    if (!this.newEmployee.password) {
      return this.shop.http.createMessage('error', '缺少密码')
    }
    if (!this.newEmployee.emergency_contact) {
      return this.shop.http.createMessage('error', '缺少联系人')
    }
    if (!this.newEmployee.emergency_contact_phone) {
      return this.shop.http.createMessage('error', '缺少联系人手机号')
    }
    if (!this.newEmployee.emergency_contact_relationship) {
      return this.shop.http.createMessage('error', '缺少联系关系')
    }

    if (!this.newEmployee.department) {
      return this.shop.http.createMessage('error', '缺少岗位')
    }
    if (!this.newEmployee.job) {
      return this.shop.http.createMessage('error', '缺少职位')
    }
    if (!this.newEmployee.shop_code) {
      return this.shop.http.createMessage('error', '缺少员工编号');
    }
    if (!this.newEmployee.referrer) {
      return this.shop.http.createMessage('warning', '缺少推荐人,自动分配推荐人');
    }
    // if (this.loading) return;
    // this.loading = true;
    this.newEmployee.images = this.fileList.map(file => file.url);
    let result = await this.shop.createEmployee(this.newEmployee);
    if (result) {
      this.shop.http.createMessage('success', '成功添加员工');
      // this.loading = false;
      this.state = ViewState.List;
      console.log(this.newEmployee);
    }
  }
  /**
   * 获取员工分页
   */
  async  getEmployeePage() {
    let result = await this.shop.getEmployePage(this.page, this.pageSize);
    this.total = result.count;
    this.dataSet = result.rows;

  }

}
