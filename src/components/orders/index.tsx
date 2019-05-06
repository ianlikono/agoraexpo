import Link from 'next/link';
import React from 'react';
import OrderItemStyles, { OrderUl } from './styles';

export interface OrdersProps { }


const orders = [{
  length: 3,
  id: 4004,
  total: 1000,
  createdAt: '2019-04-30T23:36:33.580Z',
  items: [
    {
      id: 2323,
      title: 'waddup',
      description: "jdsjsdjsdajdlad",
      price: 344,
      image: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 4
    },
    {
      id: 1103,
      title: 'Another Awesome Order',
      description: "Best thing i never had",
      price: 500,
      image: "https://images.unsplash.com/photo-1461218779480-bb61b6be1924?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 2
    },
    {
      id: 1103,
      title: 'Last order',
      description: "Last but not done",
      price: 4090,
      image: "https://images.unsplash.com/photo-1495745190033-64f95ea0d02f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 2
    }
  ]
},
{
  length: 3,
  id: 34343,
  total: 1000,
  createdAt: '2019-04-30T23:36:33.580Z',
  items: [
    {
      id: 2323,
      title: 'waddup',
      description: "jdsjsdjsdajdlad",
      price: 344,
      image: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 4
    },
    {
      id: 1103,
      title: 'Another Awesome Order',
      description: "Best thing i never had",
      price: 500,
      image: "https://images.unsplash.com/photo-1461218779480-bb61b6be1924?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 2
    },
    {
      id: 1103,
      title: 'Last order',
      description: "Last but not done",
      price: 4090,
      image: "https://images.unsplash.com/photo-1495745190033-64f95ea0d02f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 2
    }
  ]
}]

function Order(props: OrdersProps) {
  return (
    <>
      <div>
        <h2 style={{fontSize: '2rem'}}>You have {orders.length} orders</h2>
        <OrderUl>
          {orders.map(order => {
            return (
                <OrderItemStyles key={order.id}>
                  <Link
                    href={`/order/${order.id}`}>
                    <a>
                      <>
                        <p>5 Items</p>
                        <p>6 Products</p>
                        <p>2 days ago</p>
                        <p>500</p>
                      </>
                      <div className="images">
                        {order.items.map(item => (
                          <img key={item.id} src={item.image} alt={item.title} />
                        ))}
                      </div>
                    </a>
                  </Link>
                </OrderItemStyles>
            )
          })}
        </OrderUl>
      </div>
    </>
  );
}

export default Order;
