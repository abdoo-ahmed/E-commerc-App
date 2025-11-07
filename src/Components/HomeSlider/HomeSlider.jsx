import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "../../images/61cSNgtEISL._AC_SY200_.jpg";
import im2 from "../../images/41nN4nvKaAL._AC_SY200_.jpg";
import im3 from "../../images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          style={{ height: "400px" }}
          className="w-100"
          src={im1}
          alt="Chair Blue"
        />
      </div>

      <div>
        <img
          style={{ height: "400px" }}
          className="w-100"
          src={im2}
          alt=" bag bink "
        />
      </div>

      <div>
        <img
          style={{ height: "400px" }}
          className="w-100"
          src={im3}
          alt="stickers"
        />
      </div>
    </Slider>
  );
}
