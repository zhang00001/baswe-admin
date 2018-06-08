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
  shop_name: string;
  telphone: string;
  qq?: string;
  phone: string;
  password: string;
  /**
   * 省份
   */
  region: string;
  /**
   * 市
   */
  city: string;
  /**
   * 区
   */
  area: string;
  addr?: string;
  /**
   * 座机
   */

  /**
   * 推荐人id
   */
  referrer?: string;
  /**服务人ID */
  servicer?: string;
  /**是否激活 激活就是安装 */
  active_status?: string;
  active_time?: Date;
  /**
   * 法人姓名
   */
  legal_person_name?: string;
  /**
   * 法人手机号
   */
  legal_person_mobi?: string;
  boss_name?: string;
  boss_mobi?: string;
  /**
   * 店长名字
   */
  manager_name?: string;
  /**
   * 店长手机
   */
  manager_mobi?: string;
  area_size?: number;
  rooms?: number;
  /**
   * 技师数
   */
  skillers?: number;
  /**
   * 分店数
   */
  branches?: number;
  /**
   * 加盟店数
   */
  franchies?: number;
  pictures?: string;
  introduction?: string;
  open_date?: Date;
  /**
   * 经纬度
   */
  lat_lng?: string;
  update_at?: Date;
  created_at?: Date;
}

interface IEmployee {
  role_id: number;
  shop_id?: number;
  employee_id?: number;
  sex: number;
  job: string;
  images: string[] | string;
  /**
   * 部门
   */
  department: string;

  height: number;
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
  active_flg?;
  qq?;
  password;
  password_hash?;
  email: string;
  /**
   * 推荐人id
   */
  referrer?: string;
  /**
   * 员工编号
   */
  shop_code?: string;
  /**
   * 头像照片
   */
  photo?: string;
  /**
   * 照片路径
   */
  photo_path?: string;
  id_card: string;
  /**
   * 1男 2女
   *
   */
  male?: string;
  /**
   * 民族
   **/
  nation;

  birthday;
  /**
   * 婚否
   */
  marital?: 0 | 1 | true | false;
  native_place?: string;
  /**
   * 身份证地址
   */
  id_card_addr?: string;
  /**
   * 现住址
   */
  address?: string;
  /**
   * 学历
   */
  education_background?: string;
  /**
   * 身高
   */
  stature?: number;
  /**
   * 特长
   */
  speciality?: string;
  /**
   * 介绍人
   */
  introducer?: string;
  /**
   * 入职时间
   */
  on_board: Date;
  /**
   * 基本薪资
   */
  compensation: number;
  /**
   * 紧急联系人姓名
   */
  emergency_contact: string;
  /**
   * 紧急联系人关系
   */
  emergency_contact_relationship: string;
  /**
   * 紧急联系人电话
   */
  emergency_contact_phone: string;
  province: string;
  city?;
  cent?;
  level?;
  service_id?;
  service_flag?: string;
  service_end_date?: Date;
  created_at?: Date;
}

/**
 * 省份
 */
interface IRegion {
  name: string;
  /**
   * 城市
   */
  city: ICity[];
}

interface ICity {
  name: string;
  area: string[];
}

interface IRoom {
  shop_id?: number;
  imp_date?: Date;
  room_id?: number;
  /**
   *
   * 房间类型（m_room_type）
   *
   * 1 足疗房
   * 2 保健房
   * 3 泰式房子
   * 4 养生房
   * 5 棋牌房
   * 6 茶艺坊
   * 7 洗浴房
   */

  room_type;
  area_code?;
  floor_num: number;
  room_name: string;
  bed_num: number;
  /**
   * 00停用 ,
   * 01就绪，
   * 02 占用，
   * 03 使用，
   * 04 待清洁，
   * 05清洁中
   */
  status: "00" | "01" | "02" | "03" | "04" | "05";
  /**
   * 包厢费用
   */
  box_fee: number;
  /**
   * 冲抵消费
   * 0不可以 1可以
   */
  offset_flg;
  /**
   * 是否计时收费
   */
  pay_by_hour_flg: boolean;
  /**
   * 计时收费的价格
   */
  price_of_timing;
  owner?;
  union_id?;
  reserve_str1?;
  reserve_str2?;
  reserve_str3?;
}

interface IHandcard {
  shop_id?: number;
  imp_date?: Date;
  hand_card_id?: number;
  hand_card_name?: string;
  area_code?;
  male: "1" | "2";
  /**
   * 状态（0 停用 1 可用 2 占用）
   */
  status: 0 | 1 | 2;
  union_id?: number;
  room_id?;
}
