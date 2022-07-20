/* eslint-disable jsx-a11y/anchor-is-valid */

/* I notice too late  about that I should do like
<Login/>
<Cart/>
<Shipping/>
<Payment/>
<Confirmation/>

Sorry for that..

I try to clean code as much as I can
*/


import React from "react";
import InputBase from "../inputBase/InputBase";
import s from "../Form/Form.module.css";
import {
  emailValidation,
  onlyTextValidation,
  passwordMatch,
  passwordValidation,
  phoneValidation,
  postcodeValidation,
  cardExpireValidation,
  cardNumberValidation,
  securityCodeValidation,
} from "../validation";
import { promo } from "../constants";
import { CartBase, MyShop, Summary } from "../cart/CartBase";
import { ShipInfo, ShippingMethod } from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import GoBack from "../GoBack/GoBack";
import Confirmation from "../Confirmation/Confirmation";

const CONDITIONS = {
  isSignIn: true,
  isLoggedIn: true,
  isCart: false,
  isShipping: false,
  isPayment: false,
  isConfirmation: false,
};

const PERSON_INFOS = {
  email: "",
  password: "",
  confirmPass: "",
  firstName: "",
  surName: "",
  postcode: "",
};

const CART_INFOS = {
  cart: [],
  total: {},
  checkoutTotal: 0,
  userPromo: "",
  purchased: {},
  discount: 0,
  cartTotal: 0,
};

const SHIPPING_INFOS = {
  title: "",
  fullName: "",
  address: "",
  zip: "",
  country: "",
  city: "",
  state: "",
  phone: "",
  shipStyle: "standard",
};

const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: "",
};


class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      condition: CONDITIONS,
      person: PERSON_INFOS,
      cartInfo: CART_INFOS,
      shipping: SHIPPING_INFOS,
      cardInfo: INIT_CARD,
      error: {},
      cardType: null,
    };
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  handleValidations = (name, value) => {
    let errorText;
    let handVal = (valid) => {
      errorText = valid(value);
      this.setState((prevState) => ({
        error: {
          ...prevState.error,
          [`${name}Error`]: errorText,
        },
      }));
    };
    switch (name) {
      case "card":
        handVal(cardNumberValidation);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
        }));
        break;
      case "expiry":
        handVal(cardExpireValidation);
        break;
      case "securityCode":
        handVal(securityCodeValidation);
        break;
      case "email":
        handVal(emailValidation);
        break;
      case "password":
        handVal(passwordValidation);
        break;
      case "confirmPass":
        errorText = passwordMatch(this.state.person.password, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, confirmPassError: errorText },
        }));
        break;
      case "firstName":
      case "surName":
      case "fullName":
      case "city":
      case "state":
      case "cardHolder":
        handVal(onlyTextValidation);
        break;
      case "postcode":
      case "zip":
        handVal(postcodeValidation);
        break;
      case "phone":
        handVal(phoneValidation);
        break;
      default:
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            [`${name}Error`]: undefined,
          },
        }));
        break;
    }
  };

  handleBlur = ({ target: { name, value } }) =>
    this.handleValidations(name, value);

  handleRadio = ({ target: { id } }) => {
    const statement = id === "create" ? false : true;
    this.setState((prevState) => ({
      condition: {
        ...prevState.condition,
        isSignIn: statement,
      },
    }));
  };

  handleInputData = ({ target: { name, value } }) => {
    const { isLoggedIn, isShipping } = this.state.condition;
    let group = isLoggedIn ? "person" : isShipping ? "shipping" : "cardInfo";
    let setChange = (value) => {
      this.setState((prevState) => ({
        [group]: {
          ...prevState[group],
          [name]: value,
        },
      }));
    };
    if (name === "card") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        setChange(mask);
      } else {
        setChange("");
      }
    } else {
      setChange(value);
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      cartInfo: {
        ...prevState.cartInfo,
        [name]: value,
      },
    }));
  };

  checkErrorBeforeSave = () => {
    const { error, person, shipping, cardInfo } = this.state;
    let errorValue = {};
    let group = this.state.condition.isLoggedIn
      ? person
      : this.state.condition.isShipping
      ? shipping
      : cardInfo;
    let isError = false;
	 Object.keys(group).forEach((val) => {
      if (!group[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      } else if (error[`${val}Error`] != null) {
        isError = true;
      }
    });
	
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        ...errorValue,
      },
    }));
    return isError;
  };

  handleAddCard = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.changePage("up");
		this.setState((prevState) => ({
			condition: {
				...prevState.condition,
				isSignIn: false
			}
		}))
    }
  };

  handleCartAdd = ({ target: { value, name } }) => {
    if (!this.state.cartInfo.cart.includes(name)) {
      this.setState(
        (prevState) => ({
          cartInfo: {
            ...prevState.cartInfo,
            cart: [...prevState.cartInfo.cart, name],
            purchased: {
              ...prevState.cartInfo.purchased,
              [name]: { price: value, qty: 1 },
            },
          },
        }),
        () => this.handleQty(name, 1)
      );
    }
  };

  handleRemoveCart = ({ target: { name } }) => {
    let { cart, purchased } = this.state.cartInfo;
    let arr = [...cart];
    let ind = arr.indexOf(name);
    arr.splice(ind, 1);
    //  delete purchased[name];  WE SHOULDN'T DO THIS, RIGHT?
    let arrPur = purchased;
    delete arrPur[name];
    this.setState(
      (prevState) => ({
        cartInfo: {
          ...prevState.cartInfo,
          cart: [...arr],
          purchased: {
            ...arrPur,
          },
        },
      }),
      () => {
			this.checkAmount();
			this.emptyCart();
		},
    );
  };

emptyCart = () => {
	console.log(this.state.cartInfo.cart.length);
			if (!this.state.cartInfo.cart.length) {
			Object.keys(this.state.condition).forEach((val) => {
				if(this.state.condition[val]) {
					this.setState((prevState) => ({
						condition : {
							...prevState.condition,
							[val] : false,
							isCart : true
						}
					}))
				}
			})
		}
}

  handleTargetQty = ({ target: { name, value } }) => {
    this.handleQty(name, value);
  };

  handleQty = (name, value) => {
    const { purchased } = this.state.cartInfo;
    const { price } = purchased[name];
    let totalPrice = price * value;
    this.setState(
      (prevState) => ({
        cartInfo: {
          ...prevState.cartInfo,
          total: {
            ...prevState.cartInfo.total,
            [name]: totalPrice,
          },
          purchased: {
            ...prevState.cartInfo.purchased,
            [name]: {
              ...prevState.cartInfo.purchased[name],
              qty: value,
            },
          },
        },
      }),
      () => this.checkAmount()
    );
  };

  checkAmount = () => {
    const { cart, total, discount } = this.state.cartInfo;
    const { shipStyle } = this.state.shipping;
    const percentageDis = 1 - discount;
    let checkOut = cart.reduce((acc, el) => {
      return acc + total[el];
    }, 0);
    const cartTotal = checkOut;
    if (shipStyle === "express") {
      checkOut = checkOut * percentageDis + 10;
    } else {
      if (cartTotal >= 50) {
        checkOut = checkOut * percentageDis;
      } else {
        checkOut = checkOut * percentageDis + 5;
      }
    }
    this.setState((prevState) => ({
      cartInfo: {
        ...prevState.cartInfo,
        cartTotal: cartTotal,
        checkoutTotal: checkOut,
      },
    }));
  };

  checkPromo = () => {
    const { userPromo } = this.state.cartInfo;
    const valid = promo.filter((el) => {
      console.log(el);
      return el.name === userPromo.toLowerCase();
    });
    console.log(valid[0].percentage);
    this.setState(
      (prevState) => ({
        cartInfo: {
          ...prevState.cartInfo,
          discount: valid[0].percentage,
        },
      }),
      () => this.checkAmount()
    );
  };

  changePage = (operator) => {
    const { condition } = this.state;
    Object.keys(condition).forEach((val, ind) => {
      if (condition[val]) {
        let increment;
        operator === "up" ? (increment = 1) : (increment = -1);
        let newIndex = ind + increment;
        newIndex = newIndex === 6 ? 1 : newIndex;
        const nextPage = Object.keys(condition)[newIndex];
        console.log(nextPage, val);
        this.setState((prevState) => ({
          condition: {
            ...prevState.condition,
            [val]: false,
            [nextPage]: true,
          },
        }));
      }
    });
  };

  handleCheckout = (e) => {
    const empty = {};
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (this.state.condition.isCart) {
      if (this.state.cartInfo.cart.length) {
        this.setState((prevState) => ({
          condition: {
            ...prevState.condition,
            isCart: false,
            isShipping: true,
          },
          error: empty,
        }));
      }
    } else {
      if (!errorCheck) {
        this.changePage("up");
      }
    }
  };

  handleShipMethod = ({ target: { id } }) => {
    console.log(id);
    this.setState(
      (prevState) => ({
        shipping: {
          ...prevState.shipping,
          shipStyle: id,
        },
      }),
      () => this.checkAmount()
    );
  };

  handlePrevious = () => {
    this.changePage();
  };

  render() {
    const { person, error, condition, cartInfo, cardInfo, cardType } =
      this.state;

    const inputData = [
      {
        label: "Your E-Mail address*",
        name: "email",
        type: "text",
        error: "emailError",
      },
      {
        label: condition.isSignIn ? "Password*" : "Create Password*",
        name: "password",
        type: "password",
        error: "passwordError",
      },
      {
        label: "Confirm Password",
        name: "confirmPass",
        type: "password",
        error: "confirmPassError",
      },
      {
        label: "First Name*",
        name: "firstName",
        type: "text",
        error: "firstNameError",
      },
      {
        label: "Surname",
        name: "surName",
        type: "text",
        error: "surNameError",
      },
      {
        label: "Postcode",
        name: "postcode",
        type: "number",
        error: "postcodeError",
      },
    ];

    const cartData = [
      {
        label: "Html",
        name: "html",
        price: "10",
        image:
          "https://www.shareicon.net/data/256x256/2015/10/07/113773_tags_512x512.png",
      },
      {
        label: "Css",
        name: "css",
        price: "15",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCBJ8fz6KNK6Ut3df5khikEAXIkhoquFuFgw&usqp=CAU",
      },
      {
        label: "SaaS",
        name: "saas",
        price: "20",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31wCdwn0j_uwPKON-zMLB7bhUt4pZ9ZCTmQ&usqp=CAU",
      },
      {
        label: "JavaScript",
        name: "javascript",
        price: "35",
        image: "https://cdn.mos.cms.futurecdn.net/EzgdmaCQuT84bgDL4fhXZS.jpg",
      },
      {
        label: "React",
        name: "react",
        price: "50",
        image:
          "data:image/png;base64,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",
      },
      {
        label: "Lboe",
        name: "everything",
        price: "200",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuISWOuic3Pd7dmDSxqnKGjjjZOWLk9juZpQ&usqp=CAU",
      },
    ];

    const shippingData = [
      {
        label: "Address Title",
        name: "title",
        id: "title",
        type: "text",
        error: "titleError",
      },
      {
        label: "Name-Surname",
        name: "fullName",
        id: "fullName",
        type: "text",
        error: "fullNameError",
      },
      {
        label: "Your address",
        name: "address",
        id: "address",
        type: "text",
        error: "addressError",
      },
      {
        label: "Zip Code",
        name: "zip",
        id: "zip",
        type: "number",
        error: "zipError",
      },
      {
        label: "Country",
        name: "country",
        id: "country",
        error: "countryError",
      },
      {
        label: "City",
        name: "city",
        id: "city",
        type: "text",
        error: "cityError",
      },
      {
        label: "State",
        name: "state",
        id: "state",
        type: "text",
        error: "stateError",
      },
      {
        label: "Phone",
        name: "phone",
        id: "phone",
        type: "number",
        error: "phoneError",
      },
    ];

    const cardData = [
      { label: "Card Number", name: "card", type: "text", error: "cardError" },
      {
        label: "CardHolder's Name",
        name: "cardHolder",
        type: "text",
        error: "cardHolderError",
      },
      {
        label: "Expiry Date (MM/YY)",
        name: "expiry",
        type: "text",
        error: "expiryError",
      },
      {
        label: "Security Code",
        name: "securityCode",
        type: "text",
        error: "securityCodeError",
      },
    ];

    return (
      <div className={s.container}>
        {condition.isLoggedIn && (
          <form className={s.flexBox} onSubmit={this.handleAddCard}>
            <div className={s.checkBox}>
              <div>
                <input
                  type="radio"
                  name="radio"
                  id="signin"
                  onChange={this.handleRadio}
                  defaultChecked={condition.isSignIn}
                />
                <label> SIGN IN</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="radio"
                  id="create"
                  onChange={this.handleRadio}
						defaultChecked={!condition.isSignIn}

                />
                <label> CREATE ACCOUNT</label>
              </div>
            </div>
            {inputData.length
              ? inputData.map((item, ind) => (
                  <>
                    {(!condition.isSignIn || ind < 2) && (
                      <>
                        <label className={s.headLabel}>{item.label}</label>
                        <InputBase
                          autoComplete="off"
                          name={item.name}
                          id={item.name}
                          type={item.type}
                          label={item.label}
                          value={person && person[item.name]}
                          error={error}
                          onChange={this.handleInputData}
                          onBlur={this.handleBlur}
                          errorM={
                            error &&
                            error[item.error] &&
                            error[item.error].length > 1
                              ? error[item.error]
                              : null
                          }
                        />
                      </>
                    )}
                  </>
                ))
              : null}
            <div className={s.btnWrapper}>
              <InputBase
                type="submit"
                value={this.state.condition.isSignIn ? "Sign in" : "Save"}
              />
            </div>

            <div className={s.or}>
              <div className={s.line}></div>
              <div>Or</div>
              <div className={s.line}></div>
            </div>

            <div className="blue-wrap">
              <InputBase type="submit" value="SIGH WITH FACEBOOK" />
            </div>
            <p style={{ fontSize: "12px", color: "#a0a3a6" }}>
              <u>Cancel</u>
            </p>
            <div className={s.policy}>
              <a href="#">
                <u>Privacy Policy and Cookies</u>
              </a>
              <p> | </p>
              <a href="#">
                <u>Terms of Sale and Use</u>
              </a>
            </div>
          </form>
        )}
        {/* cart // second screen */}
        {condition.isCart && (
          <>
            <div className={s.storeWrap}>
              {cartData.length
                ? cartData.map((item) => (
                    <CartBase
                      label={item.label}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      add={this.handleCartAdd}
							 cart={cartInfo.cart}
                    />
                  ))
                : null}
            </div>
            <div className={s.myCart}>
              <div className={s.shopCart}>
                {cartData.length
                  ? cartData.map((item) => (
                      // Length yapmamizin sebebi mappingten once datanin olusmasindan emin olmak

                      <>
                        {cartInfo.cart.includes(item.name) && (
                          <MyShop
                            label={item.label}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            remove={this.handleRemoveCart}
                            qtyFunc={this.handleTargetQty}
                            qty={cartInfo.purchased[item.name].qty}
                            total={cartInfo.total[item.name]}
                          />
                        )}
                      </>
                    ))
                  : null}
              </div>
              <Summary
                className={s.total}
                total={cartInfo.checkoutTotal}
                promoValid={this.checkPromo}
                promo={cartInfo.userPromo}
                change={this.handleChange}
                discount={cartInfo.discount}
                submit={this.handleCheckout}
                condition={condition}
                cartData={cartData}
                state={this.state}
                remove={this.handleRemoveCart}
              />
            </div>
          </>
        )}
        {/* shipping */}
        {condition.isShipping && (
          <div className={s.shippingPage}>
            <div className={s.shipping}>
              <div className={s.shippingInfo}>
                <h2>Shipping Information</h2>
                {shippingData.length
                  ? shippingData.map((item) => (
                      <ShipInfo
                        autoComplete="off"
                        name={item.name}
                        id={item.name}
                        type={item.type}
                        label={item.label}
                        value={person && person[item.name]}
                        error={error}
                        onChange={this.handleInputData}
                        onBlur={this.handleBlur}
                        errorM={
                          error &&
                          error[item.error] &&
                          error[item.error].length > 1
                            ? error[item.error]
                            : null
                        }
                      />
                    ))
                  : null}
              </div>
              <ShippingMethod
                onChange={this.handleShipMethod}
                previousFunc={this.handlePrevious}
              />
            </div>
            <Summary
              className={s.total}
              total={cartInfo.checkoutTotal}
              promoValid={this.checkPromo}
              promo={cartInfo.userPromo}
              change={this.handleChange}
              discount={cartInfo.discount}
              submit={this.handleCheckout}
              condition={condition}
              cartData={cartData}
              state={this.state}
              remove={this.handleRemoveCart}
            />
          </div>
        )}
        {/* PAYMENT */}
        {condition.isPayment && (
          <div className={s.paymentPage}>
            <div className={s.payment}>
              <div className={s.paymentInfo}>
                <h2>payment information</h2>
                {cardData.length
                  ? cardData.map((item) => (
                      <Payment
                        autoComplete="off"
                        name={item.name}
                        id={item.name}
                        type={item.type}
                        label={item.label}
                        value={cardInfo && cardInfo[item.name]}
                        error={error}
                        onChange={this.handleInputData}
                        onBlur={this.handleBlur}
                        cardType={cardType}
                        isCard={item.name === "card"}
                        errorM={
                          error &&
                          error[item.error] &&
                          error[item.error].length > 1
                            ? error[item.error]
                            : null
                        }
                      />
                    ))
                  : null}
              </div>
            </div>
            <Summary
              className={s.total}
              total={cartInfo.checkoutTotal}
              promoValid={this.checkPromo}
              promo={cartInfo.userPromo}
              change={this.handleChange}
              discount={cartInfo.discount}
              submit={this.handleCheckout}
              condition={condition}
              cartData={cartData}
              state={this.state}
              remove={this.handleRemoveCart}
            />
            <GoBack previousFunc={this.handlePrevious} />
          </div>
        )}
        {condition.isConfirmation && (
          <div className={s.confirmationPage}>
            <Confirmation previousFunc={this.changePage} />
            <Summary
              className={s.total}
              total={cartInfo.checkoutTotal}
              promoValid={this.checkPromo}
              promo={cartInfo.userPromo}
              change={this.handleChange}
              discount={cartInfo.discount}
              submit={this.handleCheckout}
              condition={condition}
              cartData={cartData}
              state={this.state}
              remove={this.handleRemoveCart}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Form;

/* {inputData.length
	? inputData.map((item) => (
		<><label>{item.label}</label>
			<InputBase
				name={item.name}
				type={item.type} />
		</>
	))
	: null} */
