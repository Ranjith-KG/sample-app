import React, { Component } from "react";
import { connect } from 'react-redux';
import { getProductData } from './../Actions/ProductActions';

import Product from "./Product";
import FilterPage from './FilterPage';
import SortPage from './SortPage';

class LandingPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      listViewEnabled: false,
      filterViewEnabled: false,
      sortViewEnabled: false
    }
  }

  enableListView = () => {
    this.setState(prevState  => {
      return {
        ...prevState,
        listViewEnabled : !prevState.listViewEnabled
      }
    })
  }

  toggleFilterView = () => {
    this.setState(prevState  => {
      return {
        ...prevState,
        filterViewEnabled : !prevState.filterViewEnabled
      }
    })
  }

  toggleSortView = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        sortViewEnabled: !prevState.sortViewEnabled
      }
    })
  }

  filterParams = () => {
    let filterParameters = [];
    this.props.filters.forEach((main) => {
      main.buckets.forEach((sub) => {
        if(this.props.selectedSubFilters.includes(sub.key)){
          filterParameters.push(encodeURIComponent(main.name) + '=' + encodeURIComponent(sub.key));
        }
      })
    })
    return filterParameters.join('&');
  }

  applyFilters = () => {
    this.props.getProductData(this.filterParams());
    this.setState({
      filterViewEnabled: false
    });
  }

  applySort = ( value ) => {
    let filtersApplied = this.filterParams(),
    queryParams = "";
    if(filtersApplied){
      queryParams = filtersApplied+"&sort="+value+":desc";
    }else{
      queryParams = "&sort="+value+":desc";
    }
    this.props.getProductData(queryParams);
    this.setState({
      sortViewEnabled: false
    });
  }

  componentDidMount() {
    this.props.getProductData();
  }

  render() {
    const { 
      products, 
      filters, 
      sorts, 
      selectedFilterMain, 
      selectedSubFilters,
      productTitle,
      totalCount 
    } = this.props;
    let productClass = "product-container";
    if(this.state.listViewEnabled){
      productClass += " product-list-view";
    }
    return (
      <>
      <div className="container">
        {!this.state.filterViewEnabled &&
        <div className="fixed-header">
          <div className="top-nav">
              <span className="side-menu" style={{marginRight: "10px"}}></span>
              <img className="logo" src="https://storage.googleapis.com/hng-static/social-icons/logo_hng_big.svg" width="175"/>
          </div>
          <div className="search-result">
              <div className="product-name">{productTitle} <span className="product-count" style={{color:"grey"}}>- {totalCount} Products</span></div>
              <div className="actions">
                <button className="action-btn list-view" style={{color:"grey"}} onClick={this.enableListView}>&#9868;</button>
                <button className="action-btn sort" onClick={this.toggleSortView}>Sort</button>
                <button className="action-btn filter" onClick={this.toggleFilterView}>Filter</button>
              </div>
          </div>
        </div>
      }
        <div className="main-content">
          <div className="location">
            Deliver to Home - Banglore 560100
          </div>
          <div className={productClass}>
            {
              products.map((d, i) => {
                return <Product key={d.skuId} d={d}/>
              })
            }
          </div>
          </div>
      </div>
      {
          this.state.filterViewEnabled && 
             <FilterPage 
              filters={filters} 
              selectedFilter={selectedFilterMain}
              selectedSubFilters={selectedSubFilters}
              applyFilters={this.applyFilters}
              onClose={this.toggleFilterView}/>
      }
      {
        this.state.sortViewEnabled &&
          <SortPage
            sorts={sorts}
            onClose={this.toggleSortView}
            applySort={this.applySort}/>
      }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.ProductReducer.products,
  sorts : state.ProductReducer.sortOptions,
  filters: state.ProductReducer.filterOptions,
  selectedFilterMain: state.ProductReducer.selectedFilterMain,
  selectedSubFilters: state.ProductReducer.selectedSubFilters,
  productTitle: state.ProductReducer.productTitle,
  totalCount: state.ProductReducer.totalCount
});

const mapDispatchToProps = {
  getProductData
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);