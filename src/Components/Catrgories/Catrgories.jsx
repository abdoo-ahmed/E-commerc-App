import axios from "axios";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Catrgories() {
  function AllGetCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("CategorySlider", AllGetCategories);
  function GetCategoriesClick() {
    if (data.statusText === "OK") {
      setTimeout(() => {
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
      }, 500);
    }
  }

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

  return (
    <>
      <div className="container my-3">
        <div className="row inner_Pages gy-4">
          {data.data.data.map((category, index) => (
            <>
              <div key={index} className="col-md-4 ">
                <div
                  role="button"
                  onClick={GetCategoriesClick}
                  class="card inner"
                >
                  <img
                    className="w-100 "
                    style={{ height: "300px" }}
                    src={category.image}
                    alt={category.name}
                  />
                  <div class="card-body">
                    <h3 className="text-center text-main"> {category.name} </h3>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
