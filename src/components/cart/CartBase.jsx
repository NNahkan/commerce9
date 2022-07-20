import React from 'react';
import './CartBase.css';
import { CARDICON } from '../constants';


const CartBase = ({ image, cart, label, price, ...props }) => (
	<div className='code'>
		<img className='storeImg' src={image} alt="cart" />
		<div>{label}</div>
		<div>${price}</div>
		<button name={props.name} onClick={props.add} value={price} className='btn'>{cart.includes(props.name) ? 'Added' : 'Add'}</button>
	</div>
);

const MyShop = ({ image, qty, label, price, ...props }) => (
	<div className='shopItem'>
		<button name={props.name} onClick={props.remove} className='deleteItem'>X</button>
		<div className='itemInfo'>
		<img  src={image} alt={label} />
		<div>
			<h4>{label}</h4> 
			<p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
			</div>
		</div>
		<select onChange={props.qtyFunc} name={props.name} id="qty">
			<option hidden>{ qty.length ? qty : 1}</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
		</select>
		<div className='other'>${!props.total ? price : props.total}</div>


	</div>
)

const Summary = ({total, discount, ...props}) => (
	<div className={props.className}>
		<div className='summary'>
		<h2>Summary</h2>
		{!props.state.condition.isConfirmation && (
			<label >
			<input autoComplete='off' onChange={props.change} name='userPromo' value={props.promo} type="text" 
			placeholder='Promo'/>
			<button onClick={props.promoValid} >ok</button>
			</label>
		)}
		<div className='itemsWrapper'>
		{!props.condition.isCart && (
			props.cartData.map((x) => (
					<>
					{props.state.cartInfo.cart.includes(x.name) && (
					<div className='itemWrap'>
						<div>
						<img src={x.image} alt={x.label} />
					</div>
					<div className='itemInfos'>
						<div>{x.label}</div>
						<div>Qty : {props.state.cartInfo.purchased[x.name].qty}</div>
						<div>Price: {props.state.cartInfo.total[x.name]}</div>
					</div>
					{!props.state.condition.isConfirmation && (
						<button name={x.name} onClick={props.remove} className='deleteItem'>X</button>
					)}
					</div>
					
				)}
				</>
			))
		)}
		</div>
		<div className='summaryInfo'>
			<div>Cart Subtotal</div>
			<div>$ {props.state.cartInfo.cartTotal}</div>
		</div>
		<div className="summaryInfo">
			<div>Shipping&Handling</div>
			<div>
				{ (props.state.shipping.shipStyle === 'express') ?
				(
					<>$ 10	</>
				) : (total >= 50) ? 
				(               
					<>Free</>
				) : props.state.cartInfo.cart.length ?
				<>5</>
				: <></>
				}
			</div>
		</div>
		<div className="summaryInfo">
			<div>Discount</div>
			<div>{`% ${discount * 100}`}</div>
		</div>
		<div className="summaryInfo totalRed">
			<div>Cart Total:</div>
			<div>{ props.state.cartInfo.cart.length 
			? <>$ {total}</>
			: <>$ 0</>
			}</div>
		</div>
		
			{(props.state.condition.isPayment || props.state.condition.isConfirmation) && (
				<div className='shippingSummary'>
					<h3>Shipping</h3>
				<ul>
					<li>{props.state.shipping.title}</li>
					<li>{props.state.shipping.country} {props.state.shipping.state}</li>
					<li>{props.state.shipping.city} {props.state.shipping.zip}</li>
					<li>Shipping : {props.state.shipping.shipStyle} </li>

				</ul>
				</div>
			)}
			{props.state.condition.isConfirmation && (
				<div className='paymentSummary'>
					<h3>Payment</h3>
					<div className='cardSummary'>
						<div style={{ display:"flex", alignItems:"center"}}>
							<img 
							style={{
								width: "50px",
								height: "33px"
							}}
							src={CARDICON[props.state.cardType]} alt="CardImage" />
							<span>{props.state.cardType}</span>
						</div>
						<div>**** **** **** {String(props.state.cardInfo.card).slice(-4)}</div>
					</div>
				</div>
			)}
	</div>
	{ !props.state.condition.isConfirmation && (
		<div>
		<button onClick={props.submit} className='checkoutBtn'>Checkout</button>
	</div>
	)}
	</div>
)



export {CartBase,MyShop,Summary};
