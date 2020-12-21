import React, { Component } from "react";

export default class Product extends Component {
  render() {

    const { d } = this.props;
    return (

      <div className="product">
        <div className="product-header">
          <span className="has-special-offer">Special Offer</span>
          <span className="add-to-favorite"></span>
        </div>
        <div className="product-img">
          <img src={d.skuImageUrl} />
        </div>
        <div className="product-title">{d.skuName}</div>
        <div className="product-footer">
          <span className="price" style={{color:"#e6005c"}}>&#x20B9; {d.listPrice}</span>
          <span className={d.skuAverageRating?"has-rating":""}>{d.skuAverageRating||<></>}</span>
        </div>
      </div>

    );

  }
}
