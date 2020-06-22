import React from "react";
import {UserContext} from "../context/user";
import {CartContext} from "../context/cart";
import {useHistory} from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
//react-stripe-element
import submitOrder from "../strapi/submitOrder"

export default function Checkout(props) {
  const {cart,total,clearCart} = React.useContext(CartContext);
  const {user,showAlert,hideAlert,alert} = React.useContext(UserContext);
  const history = useHistory();

  const [name,setName] = React.useState('');
  const [error,setError] = React.useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e){
    e.preventDedault();

  }
  if(cart.length < 1){
    return <EmptyCart />
  }

  return <section className="section form">
    <h2 className="section-title">Checkout</h2>
    <form className="checkout-form">
      <h3>order total : <span>${total}</span></h3>
      <div className="form-control">
        <label htmlFor="name">name</label>
        <input type="text" id="name" value={name} onChange={e => {
          setName(e.target.value)
        }}></input>
      </div>
      <div className="stripe-input">
        <label htmlFor="card-element">Credit or Debit Card</label>
        <p className="stripe-info">
          Test using this credit card : <span>4242 4242 4242 4242</span>
          <br>
          </br>
          Enter any 5 digit for the zip code
          <br />
          enter ant 3 digtis for the cvc
        </p>

      </div>
        {error && <p className="form-empty">{error}</p>}
        {isEmpty ? <p className="form-empty">please fill out name field</p> : <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">submit</button>}
        
        

    </form>
  </section>;
}
