import React from "react";

const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  //console.log(priceOptions);
  return (
    <div>
      <div className="card order-card">
        <img
          className="card-img-top image"
          src={props.imgSrc}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <p className="card-text">{props.description}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-light">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-light rouded">
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
