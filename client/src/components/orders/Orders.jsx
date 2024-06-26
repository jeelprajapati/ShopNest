import React, { useEffect } from "react";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orderActions";
import toast from "react-hot-toast";
import { CLEAR_ERROR } from "../../assets/constants/orderConstants.js";
import { loadStripe } from "@stripe/stripe-js";

const Orders = ({token}) => {
  const key = process.env.REACT_APP_STRIPE_KEY;
  const { loading, orders, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = (date) => {
    const newDate=new Date(date);
    const day = newDate?.getDate();
    const monthIndex = newDate?.getMonth();
    const year = newDate?.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };

  useEffect(() => {
    if(token){
      dispatch(getOrders(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error]);

  const handlePayment = async (sessionId) => {
    const stripe = await loadStripe(key);
    stripe.redirectToCheckout({
      sessionId,
    });
  };

  return (
    <div className="orders">
      <h3>Orders</h3>
      <div className="ordersContainer">
        <table>
          <tr>
            <th align="start" colSpan={2}>
              Order No.
            </th>
            <th colSpan={1} align="start">
              Shipped Date
            </th>
            <th align="end">Total</th>
            <th align="start">Payment Status</th>
            <th align="start">Shipping Status</th>
            <th colSpan={1}>Actions</th>
          </tr>
          {loading ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Loading
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No Item Yet
              </td>
            </tr>
          ) : (
            orders.map((item) => (
              <tr key={item?._id}>
                <td colSpan={2}>{item?._id}</td>
                <td colSpan={1}>{formattedDate(item?.updatedAt)}</td>
                <td align="end">₹ {item?.total}</td>
                <td
                  align="start"
                  style={
                    item?.payment === "open"
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {item?.payment === "open" ? "Incomplete" : "Complete"}
                </td>
                <td
                  style={
                    item?.status === "Panding"
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {item.status}
                </td>
                <td colSpan={1}>
                  <div className="ordersButton">
                    {item?.payment === "complete" && (
                      <>
                        <button className="ordersView">View Order</button>
                        <button className="ordersCancel">Cancel Order</button>
                      </>
                    )}
                    {item?.payment === "open" && (
                      <button
                        className="payButton"
                        onClick={() => handlePayment(item?.stripeId)}
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default Orders;
