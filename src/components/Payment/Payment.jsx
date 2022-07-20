import React from 'react';
import './Payment.css';
import { CARD,CARDICON } from '../constants';


const Payment = ({label,errorM,error, isCard,cardType, ...props }) => (
	<div className="paymentWrap">
    <label className="paymentLabel">{label}</label>
	 <input style={{
			border: errorM && '2px solid red'}} className="paymentInput" maxLength={19} {...props} />
	 { errorM && (
			<div className="error">{errorM}</div>
		)}
	{(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
			<img 
			style={{
				position: "absolute",
				top: "5px",
				right: "10px",
				width: "50px",
				height: "33px"
			}}
			src={CARDICON[cardType]}
			alt="card" 
				/>
		)}
  </div>
)

export default Payment