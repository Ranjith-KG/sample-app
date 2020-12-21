import React, { Component } from "react";
import './../filter-page.css';
import { selectMainFilterAction, selectSubFilterAction, clearFiltersAction } from './../Actions/ProductActions';
import { connect } from 'react-redux';

class FilterPage extends Component {

  subCategoryList = (filters, selectedFilter) => {
    let list = [];
    filters.filter(f => selectedFilter == f.name).forEach((d) => {
        d.buckets.forEach((filter) => {
          let liClass = this.props.selectedSubFilters.includes(filter.key)?"selected":"not-selected";
          list.push(
            <li key={filter.key} onClick={() => this.props.selectSubFilterAction(filter.key)}>
              {filter.text+" ("+filter.docCount+")"}
              <span class={"filter "+liClass}></span>
            </li>
          );
        });
    });
    return list;
  };

	render(){

    const { filters, selectedFilter } = this.props;
		return(
			<div className="filter-page-container">
        <div className="header">
          <span style={{fontSize:"18px",fontWeight:"bold",cursor:"pointer"}} className="close" onClick={() => this.props.onClose()}>&#9747;</span>
          <h3 style={{color:"black"}}>Filter By</h3>
          <span style={{cursor:"pointer"}} className="clear-all" onClick={() => this.props.clearFiltersAction()}>Clear All</span>
        </div>
        <main>
          <section className="main-filters">
            <ul>
              {
                filters.map((d) => {
                  let liClass = selectedFilter == d.name ? "active" : "";
                  return (
                    <li key={d.name} className={liClass} onClick={() => this.props.selectMainFilterAction(d.name)}>{d.text}</li>
                  );
                })
              }
            </ul>
          </section>
          <section className="sub-filters">
            <ul>
              {
                this.subCategoryList(filters, selectedFilter)
              }
            </ul>
          </section>
        </main>
        <div className="footer" style={{cursor:"pointer"}}>
          <span onClick={() => this.props.applyFilters()}>Apply</span>
        </div>
			</div>
		)
	}
}

const mapDispatchToProps = {
  selectMainFilterAction,
  selectSubFilterAction,
  clearFiltersAction
}

export default connect(null, mapDispatchToProps)(FilterPage);