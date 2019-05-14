import React, { useEffect, useState } from 'react';
import scriptLoader from "react-async-script-loader";
import ReactDOM from 'react-dom';



export interface PayPalProps {
  isScriptLoaded: Boolean;
  isScriptLoadSucceed: Boolean;
  total: any;
  currency: any;
  env: any;
  commit: any;
  client: any;
  onSuccess: any;
  onError: any;
  onCancel: any;
}

function PayPal(props: PayPalProps) {
  if (typeof window === 'object') {
    window.React = React;
    window.ReactDOM = ReactDOM;
  }
  const {
    total,
    currency,
    env,
    commit,
    client,
    onSuccess,
    onError,
    onCancel,
  } = props;

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      setShowButton(true);
    }
  }, [props.isScriptLoaded]);

  const payment = () =>
    paypal.rest.payment.create(env, client, {
      transactions: [
        {
          amount: {
            total,
            currency,
          }
        },
      ],
    });

  const onAuthorize = (data, actions) =>
    actions.payment.execute()
      .then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };

        onSuccess(payment);
      });

  return (
    <>
      <div>
        {showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
      </div>
    </>
  );
}
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PayPal);
