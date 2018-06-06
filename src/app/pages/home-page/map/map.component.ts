import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ShopService } from "../../../lib";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  lnglat;
  constructor(public shop: ShopService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    let AMap = window["AMap"];
    map = new AMap.Map("container", {
      resizeEnable: true
    });

    map.plugin("AMap.Geolocation", function() {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: "RB"
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
      AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
      var str = ["定位成功"];
      str.push("经度：" + data.position.getLng());
      str.push("纬度：" + data.position.getLat());
      if (data.accuracy) {
        str.push("精度：" + data.accuracy + " 米");
      } //如为IP精确定位结果则没有精度信息
      str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
      document.getElementById("tip").innerHTML = str.join("<br>");
    }
    //解析定位错误信息
    function onError(data) {
      document.getElementById("tip").innerHTML = "定位失败";
    }
    //为地图注册click事件获取鼠标点击出的经纬度坐标\

    var marker;
    var clickEventListener = map.on("click", (e)=> {
      this.lnglat = e.lnglat;
      console.log(this.lnglat.getLng() + "," + this.lnglat.getLat());
      // select(e)
      // map.setCenter(e.poi.location);
      console.log(e);
      map.setZoomAndCenter(28, [this.lnglat.getLng(), this.lnglat.getLat()]);
      if (marker) {
        map.remove(marker);
      }
      marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [this.lnglat.getLng(), this.lnglat.getLat()]
      });
      // 将以上覆盖物添加到地图上
      // 单独将点标记添加到地图上
      // map.add(marker);
      // add方法可以传入一个覆盖物数组，将点标记和矢量圆同时添加到地图上
      map.add([marker]);
      map.setFitView();
    });
    // 提交店铺位置
  }
  async getLng() {
    let lng = [this.lnglat.getLng(), this.lnglat.getLat()].join(",");
    await this.shop.getLng(lng);
  }
}
