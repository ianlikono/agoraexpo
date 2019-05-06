import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


export interface CheckoutProps {
  totalPrice: any;
  numberOfItems: any;
  userEmail: any;
  children: any;
}

function Checkout(props: CheckoutProps) {
  const { totalPrice, numberOfItems, userEmail, children } = props;

  function onToken(res) {
    console.log(res);
  }
  return (
    <>
      <StripeCheckout
        amount={totalPrice}
        name="AgoraExpo"
        description={`Order of ${numberOfItems} items!`}
        image="https://res.cloudinary.com/doelo01na/image/upload/v1555677455/static/logos/ms-icon-310x310.png"
        stripeKey="pk_test_o03eDtvHXBuNif0W59HviUPp00ifjE1PPI"
        currency="USD"
        email={userEmail}
        token={res => onToken(res)}
      >
        {children}
      </StripeCheckout>
    </>
  );
}

export default Checkout;
