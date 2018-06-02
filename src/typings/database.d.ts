interface IArticleCategroy {
  id?: number;
  name?: string;
  images?: string[];
  sort?: number;

  created_at?: Date;
  updated_at?: Date;
  checked?: boolean;
}

interface IArticles {
  id?: number;
  title?: string;
  content?: string;
  content_md: string;
  autor_id?: number;
  verify_id?: number;
  click_num?: number;

  article_categroy_id?: number; //组id
  autor_name?: string; //作者
  verify_name?: string; //审核
  created_at?: Date;
  updated_at?: Date;
  verify_status?: number; //审核状态
  images?: string | string[];
  is_recommand?: boolean;
}
/**
 * 商户数据结构
 */

  interface IShop {
    shop_id?: number;
    shop_name?: string;
    telphone?: string;
    password?: string;
    province?: string;
    city?: string;
    addr?: string;
    referrer?: string;
    servicer?: string;
    regist_time?: Date;
    active_status?: string;
    active_time?: Date;
    legal_person_name?: string;
    legal_person_mobi?: string;
    boss_name?: string;
    boss_mobi?: string;
    manager_name?: string;
    manager_mobi?: string;
    area_size?: number;
    rooms?: number;
    skillers?: number;
    branches?: number;
    franchies?: number;
    pictures?: string;
    introduction?: string;
    open_date?: Date;
    lat_lng?: string;
    update_time?: Date;
  }



  interface IEmployee {
    shop_id?:number;
    employee_id?:number;
    name;
    /**
     * 昵称
     */
    nickname;
    /**
     * 角色code
     */
    role_code;
        /**
     * 固定电话     */
    telphone;
    /**
     * 手机号码
     */
    phone;
    /**
     * 激活标志,1为正常会员注册激活标识，100以上为平台使用，101为平台雇佣推广人员
     */
    active_flg;
    qq;
    passwd;
    passwd_hash;
    /**
     * 员工编号
     */
    shop_code?:string;
    /**
     * 头像照片
     */
    photo?:string;
    /**
     * 照片路径
     */
    photo_path?:string;
    id_card?:string;
    /**
     * 1男 2女
     *
     */
    male?:string;
    /**
     * 民族
     **/
    nation;

    birthday;
    /**
     * 婚否
     */
    marital?:0 | 1 | true | false;
    native_place?:string;
    /**
     * 身份证地址
     */
    id_card_addr?:string;
    /**
     * 现住址
     */
    address?:string;
    /**
     * 学历
     */
    education_background?:string;
    /**
     * 身高
     */
    stature?:number;
    /**
     * 特长
     */
    speciality?:string;
    /**
     * 介绍人
     */
    introducer?:string;
    /**
     * 入职时间
     */
    on_board;
    /**
     * 基本薪资
     */
    compensation;
    /**
     * 紧急联系人姓名
     */
    emergency_contact;
    /**
     * 紧急联系人关系
     */
    emergency_contact_relationship;
    /**
     * 紧急联系人电话
     */
    emergency_contact_phone;
    province;
    city;
    cent;
    level;
    service_id;
    service_flag?:string;
    service_end_date?:Date;
    created_at?:Date;
  }



