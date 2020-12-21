import React, { Component } from "react";
import "./../sort-page.css";

export default class SortPage extends Component {
	render(){
		return(
			<div className="sort-page-container">
				<div className="content">
					<ul>
						{this.props.sorts.map((d) => (
							<li onClick={() => this.props.applySort(d.name)}>{d.text}</li>
						))}
					</ul>
					<button onClick={() => this.props.onClose()} className="cancel-button">Close</button>
				</div>
			</div>
		)
	}
}