import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";
const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div
            id="carouselExampleControls"
            className="carousel slide carousal-fade"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search...."
                    aria-label="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </form>
              </div>
              <div className="carousel-item active">
                <img
                  src="../images/burger.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="../images/chicken.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="../images/pizza.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev">
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next">
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row md-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.categoryName}
                </div>
                <hr></hr>
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.categoryName &&
                        item.name.toLowerCase().includes(search)
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3">
                          <Card
                            foodName={filterItems.name}
                            options={filterItems.options[0]}
                            imgSrc={filterItems.img}
                            description={filterItems.description}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No such data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>***********</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
