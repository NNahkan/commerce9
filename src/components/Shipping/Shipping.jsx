import React from "react";
import "./Shipping.css";
import GoBack from '../GoBack/GoBack'


const ShipInfo = ({label,errorM, ...props }) => (
  <div className="shipWrap">
    <label className="shipLabel">
      {label}
    </label>
    {props.name !== "country" ? (
      <input style={{
			border: errorM && '2px solid red'}} className="shipInput" {...props} />
    ) : (
      <select style={{paddingLeft: '15px', width: "25%" }} onClick={props.onBlur} {...props}>
        <option hidden>Choose a Country</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Åland Islands">Åland Islands</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guiana">French Guiana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
		  <option value="United States">United States</option>
      </select>
    )}
	 { errorM && (
			<div className="errorShipping">{errorM}</div>
		)}
  </div>
);

const ShippingMethod = ({label,value,onChange ,condition,previousFunc, ...props}) => (
	<div className="shipMethodWrapper">
		<h2>Shipping Method</h2>
		<div className="methodOptionWrapper">
			<div className="method">
			<input onClick={onChange} value="standard"  type="radio" name="method" id="standard" defaultChecked  />
			<label htmlFor="standard">Standard</label>
			</div>
			<div>
				Delivery in 4-6 Business Days-Free ($50 min.)
			</div>
		</div>
		<div className="methodOptionWrapper">
			<div className="method">
			<input onClick={onChange} value="express"  type="radio" name="method" id="express" />
			<label htmlFor="express">Express</label>
			</div>
			<div>
				Delivery in 1-3 Business Days - $10.00
			</div>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a href="#">Shopping Details</a>
		</div>
		<GoBack previousFunc={previousFunc}/>
	</div>
	
)


export {ShipInfo,ShippingMethod};
