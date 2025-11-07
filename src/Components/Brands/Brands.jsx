/* eslint-disable jsx-a11y/heading-has-content */
import axios from "axios";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
  function GetAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery("AllBrands", GetAllBrands);

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
      <div className="text-center AllBrands inner_Pages">
        <h1 className="text-AllBrands mb-5">All Brands</h1>
      </div>

      <div className="container">
        <div className="row g-4">
          {data.data.data.map((brand, index) => (
            <>
              <div
                data-bs-toggle="modal"
                data-bs-target={"#" + brand._id}
                key={index}
                className="col-md-3"
              >
                <div class="card inner">
                  <img
                    src={brand.image}
                    class="card-img-top"
                    alt={brand.name}
                  />
                  <div class="card-body">
                    <p class="text-center card-text"> {brand.name} </p>
                  </div>
                </div>
              </div>
            </>
          ))}

          {data.data.data.map((brand, ind) => (
            <>
              <div
                key={ind}
                class="modal fade move_Brand"
                id={brand._id}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <h1 className="text-main model_brand">
                            {" "}
                            {brand.name}{" "}
                          </h1>
                          <p> {brand.name} </p>
                        </div>

                        <div className="col-md-6">
                          <img
                            className="w-100"
                            src={brand.image}
                            alt={brand.name}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
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
