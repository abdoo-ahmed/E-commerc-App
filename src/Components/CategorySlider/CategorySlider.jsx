import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeCircles } from "react-loader-spinner";

export default function CategorySlider() {
  function GetCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("CategorySlider", GetCategories);

  if (isLoading) {
    return (
      <>
        <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-items-center">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#fff"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map((category, index) => (
        <div key={index} className="text-center">
          <div className="row">
            <div className="col">
              <img
                className="w-100"
                style={{ height: "200px" }}
                src={category.image}
                alt={category.name}
              />
              <h4> {category.name} </h4>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
