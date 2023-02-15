import axios from "axios";
import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../config/axios";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./Tracking.css";
import ARABIC_DATA from "../data/translate.json";

function Tracking() {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState({
    provider: "Bosta",
    CurrentStatus: {
      state: "DELIVERED",
      timestamp: "2020-07-22T13:22:56.383Z",
    },
    PromisedDate: "2020-07-22T19:07:50.883Z",
    TrackingNumber: "1094442",
    TrackingURL: "bosta.co/tracking-shipment/?track_num=1094442",
    SupportPhoneNumbers: ["19043"],
    TransitEvents: [
      {
        state: "TICKET_CREATED",
        timestamp: "2020-07-21T17:37:31.116Z",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-21T19:07:50.931Z",
        hub: "Alexandria Hub",
      },
      {
        state: "IN_TRANSIT",
        timestamp: "2020-07-21T19:19:44.202Z",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-21T22:51:12.385Z",
        hub: "Cairo Sorting Facility",
      },
      {
        state: "IN_TRANSIT",
        timestamp: "2020-07-22T00:11:04.465Z",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-22T00:18:51.305Z",
      },
      {
        state: "NOT_YET_SHIPPED",
        timestamp: "2020-07-22T07:21:24.498Z",
      },
      {
        state: "OUT_FOR_DELIVERY",
        timestamp: "2020-07-22T07:21:25.036Z",
      },
      {
        state: "DELIVERED",
        timestamp: "2020-07-22T13:22:56.383Z",
      },
    ],
    CreateDate: "2020-07-21T17:37:31.147Z",
  });

  function formatCurrentStatusDate(date) {
    let currentDate = date.split("T")[0];
    let weekDay = ARABIC_DATA[new Date(date).toDateString().split(" ")[0]];
    let hour = orderData.CurrentStatus.timestamp
      .split("T")[1]
      .split(".")[0]
      .split(":");
    let currentHour = "";
    if (hour[0] === 12) {
      currentHour = hour[0];
      hour[1] += "PM";
    } else if (hour[0] === 24) {
      currentHour = hour[0] - 12;
      hour[1] += "AM";
    } else if (hour[0] > 12) {
      currentHour = hour[0] - 12;
      hour[1] += "PM";
    } else {
      currentHour = hour[0];
      hour[1] += "AM";
    }
    return `${weekDay} ${currentDate} at ${currentHour}:${hour[1]}`;
  }
  function formatPromisedDate(date) {
    let newDate = new Date(date);
    let currentMonth = ARABIC_DATA[`mon${newDate.getMonth() + 1}`];
    let currentDay = newDate.getDay();
    let currentyear = newDate.getFullYear();
    return `${currentDay} ${currentMonth} ${currentyear}`;
    // return `${weekDay} ${currentDate} at ${currentHour}:${hour[1]}`;
  }
  function formatTableDate(date) {
    let currentDate = date.split("T")[0];
    let weekDay = ARABIC_DATA[new Date(date).toDateString().split(" ")[0]];
    let hour = orderData.CurrentStatus.timestamp
      .split("T")[1]
      .split(".")[0]
      .split(":");
    let currentHour = "";
    if (hour[0] === 12) {
      currentHour = hour[0];
      hour[1] += "PM";
    } else if (hour[0] === 24) {
      currentHour = hour[0] - 12;
      hour[1] += "AM";
    } else if (hour[0] > 12) {
      currentHour = hour[0] - 12;
      hour[1] += "PM";
    } else {
      currentHour = hour[0];
      hour[1] += "AM";
    }
    return `${weekDay} ${currentDate} at ${currentHour}:${hour[1]}`;
  }
  useEffect(() => {
    axios
      .get(
        `https://tracking.bosta.co/shipments/track/${searchParams.get(
          "trackingNo"
        )}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        // if (err.statusCode == 404) {
        // }
      });
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <div class="container-fluid order-container mt-4 py-4 px-4 border border-1 rounded rounded-3">
          <div class="row order-info align-items-start">
            <div class="col">
              <p className="order-container-title">
                رقم الشحنة {orderData["TrackingNumber"]}
              </p>
              <p className="order-container-detail">
                {ARABIC_DATA[`${orderData.CurrentStatus.state}`]}
              </p>
            </div>
            <div class="col">
              <p className="order-container-title">اخر تحديث</p>

              <p className="order-container-detail">
                {formatCurrentStatusDate(orderData.CurrentStatus.timestamp)}
              </p>
            </div>
            <div class="col">
              <p className="order-container-title">اسم التاجر</p>
              <p className="order-container-detail">{orderData.provider}</p>
            </div>
            <div class="col">
              <p className="order-container-title">موعد التسليم خلال</p>
              <p className="order-container-detail">
                {formatPromisedDate(orderData.PromisedDate)}
              </p>
            </div>
          </div>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div class="d-flex order-stepper-details mt-2 justify-content-between">
            <p className="order-container-title">تم إنشاء الشحنة</p>
            <p className="order-container-title">تم إستلام الشحنة من التاجر</p>
            <p className="order-container-title">الشحنة خرجت للتسليم</p>
            <p className="order-container-title">تم التسليم</p>
          </div>
        </div>
        <div class="container-fluid d-flex mt-3 p-0">
          <div className="col-8 ms-5">
            <p className="fw-bold">تفاصيل الشحنة</p>
            <div className="order-table">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">الفرع</th>
                    <th scope="col">التاريخ</th>
                    <th scope="col">الوقت</th>
                    <th scope="col">تفاصيل</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>مدينة نصر</td>
                    <td>02/06/2020</td>
                    <td>10:30pm</td>
                    <td>تم إنشاء الشحنة</td>
                  </tr>
                  <tr>
                    <td>مدينة نصر</td>
                    <td>02/06/2020</td>
                    <td>10:30pm</td>
                    <td>تم إنشاء الشحنة</td>
                  </tr>
                  <tr>
                    <td>مدينة نصر</td>
                    <td>02/06/2020</td>
                    <td>10:30pm</td>
                    <td>تم إنشاء الشحنة</td>
                  </tr>
                  <tr>
                    <td>مدينة نصر</td>
                    <td>02/06/2020</td>
                    <td>10:30pm</td>
                    <td>تم إنشاء الشحنة</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col">
            <p className="fw-bold">عنوان التسليم</p>
            <div className="container order-address bg-light rounded rounded-3 border border-1 pt-2">
              <p>
                امبابه شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 22
                ,,,Cairo
              </p>
            </div>
            <div className="container order-report d-flex  align-items-between my-3 py-3 border border-1 rounded rounded-3">
              <img src="assets/images/ques.png" alt="logo" width={"150px"} />
              <div className="d-flex flex-column align-items-center">
                <p className="fw-bold">هل يوجد مشكلة في شحنتك ؟!</p>
                <button className="btn">إبلاغ عن مشكلة</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Tracking;
