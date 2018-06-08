import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../../lib";
enum ViewState {
  List = 1,
  Create,
  Edit
}
enum FilterType {
  Floor = 1,
  BedNum,
  RoomType,
  Status,
  Area
}
@Component({
  selector: "app-room-manage",
  templateUrl: "./room-manage.component.html",
  styleUrls: ["./room-manage.component.css"]
})
export class RoomManageComponent implements OnInit {
  keyword: string = "";
  rooms: IRoom[] = [];
  selectedRoom: IRoom;
  filterFoolr: number;
  filterType: string;
  filterStatus: string;

  floorFilterOptions: { label: string; value: number }[] = [];
  filterBedNum: number;
  bed_numFilterOptions: { label: string; value: number }[] = [];
  typeFilterOptions: { label: string; value: string }[] = [];
  statusFilterOptions: { label: string; value: string }[] = [];

  newRoom: IRoom = {
    room_name: "",
    room_type: 1,
    room_id: 0,
    bed_num: 10,
    floor_num: 1,
    box_fee: 0,
    pay_by_hour_flg: false,
    price_of_timing: 0,
    status: "00",
    offset_flg: false,
    owner: ""
  };
  search() {
    console.log(`search`);
    this.getRooms();
    if (this.keyword) {
      this.rooms = this.rooms.filter(room =>
        new RegExp(this.keyword, "g").test(room.room_name)
      );

      console.log(this.rooms);
    }
    if (this.filterFoolr) {
      this.rooms = this.rooms.filter(
        room => room.floor_num == this.filterFoolr
      );
    }
    if (this.filterBedNum) {
      this.rooms = this.rooms.filter(room => room.bed_num == this.filterBedNum);
    }
    if (this.filterStatus) {
      this.rooms = this.rooms.filter(room => room.status == this.filterStatus);
    }
    if (this.filterType) {
      this.rooms = this.rooms.filter(room => room.room_type == this.filterType);
    }
  }
  filter() {}
  roomTypeOptions: { room_type_label: string; room_type: number }[] = [
    { room_type_label: "足疗房", room_type: 1 },
    { room_type_label: "保健房", room_type: 2 },
    { room_type_label: "泰式房", room_type: 3 },
    { room_type_label: "养生房", room_type: 4 },
    { room_type_label: "棋牌房", room_type: 5 },
    { room_type_label: "茶艺房", room_type: 6 },
    { room_type_label: "洗浴房", room_type: 7 }
  ];
  roomStatusOptions: { status_label: string; status }[] = [
    {
      status: "00",
      status_label: "停用"
    },
    {
      status: "01",
      status_label: "就绪"
    },
    {
      status: "02",
      status_label: "占用"
    },
    {
      status: "03",
      status_label: "使用"
    },
    {
      status: "04",
      status_label: "待清洁"
    },
    {
      status: "05",
      status_label: "清洁中"
    }
  ];
  state = ViewState.List;
  ViewState = ViewState;
  gridStyle = {
    width: "100px",
    textAlign: "center"
  };
  constructor(public storage: StorageService) {}
  selectRoom(room: IRoom) {
    if (this.selectedRoom == room && this.state == ViewState.Edit)
      return (this.state = ViewState.List);
    this.selectedRoom = room;
    this.state = ViewState.Edit;
  }
  getRooms() {
    this.rooms = this.storage.rooms;
    this.floorFilterOptions = [];
    this.bed_numFilterOptions = [];
    this.typeFilterOptions = [];
    this.rooms.forEach(room => {
      let floorExisit = this.floorFilterOptions.find(
        option => option.value == room.floor_num
      );
      let bed_numExist = this.bed_numFilterOptions.find(
        option => option.value == room.bed_num
      );
      let typeExisit = this.typeFilterOptions.find(
        option => option.value == room.room_type
      );
      let statusExisit = this.statusFilterOptions.find(
        option => option.value == room.room_type
      );
      if (!statusExisit) {
        this.statusFilterOptions.push({
          label:
            this.roomStatusOptions.find(
              roomOption => roomOption.status == room.status
            ).status_label + "",
          value: room.status
        });
      }

      if (!typeExisit) {
        this.typeFilterOptions.push({
          label: this.roomTypeOptions.find(
            roomOption => room.room_type == roomOption.room_type
          ).room_type_label,
          value: room.room_type
        });
      }

      if (!bed_numExist) {
        this.bed_numFilterOptions.push({
          label: room.bed_num + "",
          value: room.bed_num
        });
      }

      if (!floorExisit) {
        this.floorFilterOptions.push({
          label: room.floor_num + "层",
          value: room.floor_num
        });
      }
    });
  }

  delRoom() {
    let i = this.rooms.findIndex(room => room == this.selectedRoom);
    this.rooms.splice(i, 1);
    this.storage.rooms = this.rooms;
  }

  addRoom() {
    console.log(this.newRoom);
    this.rooms.push(JSON.parse(JSON.stringify(this.newRoom)));
    this.storage.rooms = this.rooms;
    this.state = ViewState.List;
  }
  editRoom() {
    this.storage.rooms = this.rooms;
  }
  ngOnInit() {
    this.getRooms();
  }
}
