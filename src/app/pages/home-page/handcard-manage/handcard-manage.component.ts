import { Component, OnInit } from "@angular/core";
import { StorageService, ShopService } from "../../../lib";
enum ViewState {
  List = 1,
  Create,
  Edit
}
@Component({
  selector: "app-handcard-manage",
  templateUrl: "./handcard-manage.component.html",
  styleUrls: ["./handcard-manage.component.css"]
})
export class HandcardManageComponent implements OnInit {
  state = ViewState.List;
  selectedStatus;
  ViewState = ViewState;
  statusOption: { label: string; value: 0 | 1 | 2 }[] = [
    { label: "停用", value: 0 },
    { label: "可用", value: 1 },
    { label: "占用", value: 2 }
  ];
  handcards: IHandcard[] = [];
  newHandcard: IHandcard = {
    hand_card_name: "",
    male: "1",
    status: 0
  };
  gridStyle = {
    width: "50px",
    textAlign: "center"
  };
  constructor(public storage: StorageService, public shop: ShopService) {}
  addHandcard() {
    let existCard = this.handcards.find(
      handcard => handcard.hand_card_name == this.newHandcard.hand_card_name
    );
    if (!existCard) {
      this.handcards.push(JSON.parse(JSON.stringify(this.newHandcard)));
    } else {
      this.shop.http.createMessage("error", "该手牌号已经存在");
    }
    this.storage.handcards = this.handcards;
  }
  getHandcars() {
    this.handcards = this.storage.handcards;
  }
  ngOnInit() {
    this.getHandcars();
  }
}
