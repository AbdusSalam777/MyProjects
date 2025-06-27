import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

// service_yr5d92g
// template_szrpc55
//UBgttDNUV7h4AJf-_

function Cart({ setcartCount, cartCount, loginemail }) {
  const [data, setdata] = useState([]);
  const [orderConfirmed, setorderConfirmed] = useState(false);

  function removefromcart(id) {
    fetch(`http://localhost:3000/delete-item/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Item deleted!");
        setdata((d) => d.filter((item) => item._id !== id));
        setcartCount((prev) => prev - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let price = 0;
  for (let i = 0; i < data.length; i++) {
    price = price + data[i].price;
  }

  const length = data.length;
  const tax = length * 0.15;
  const total = price + tax;

  useEffect(() => {
    async function getdata() {
      const response = await fetch("http://localhost:3000/get-data");
      const data = await response.json();
      setdata(data);
    }

    getdata();
  }, []);

  function saveOrder() {
    // console.log(data);
    fetch("http://localhost:3000/save-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData.message); // ✅ confirmation message
      });

    setdata([]);
    setcartCount(0);
    setorderConfirmed(true);
  }

  //making array of ids

  const ids_array = data.map((item) => item._id);
  console.log(ids_array);

  function clearCart() {
    fetch("http://localhost:3000/clear-cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: ids_array }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  }

  function sendMail() {
    const parameters = {
      items: data.length,
      price: total,
      email: loginemail,
    };
    emailjs
      .send(
        "service_yr5d92g",
        "template_szrpc55",
        parameters,
        "UBgttDNUV7h4AJf-_"
      )
      .then(() => {
        console.log("Email sent !");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log("mail", loginemail);

  return (
    <div className="min-h-screen bg-gray-950 pb-10">
      {orderConfirmed ? (
        <div>
          <p className="text-center pt-20 text-white text-3xl font-bold">
            ✅ Your Order Has Been Confirmed !
          </p>
          <div> 
             <p className="text-center pt-20 text-white text-3xl font-bold">
             Verification Email sent to <span className="text-green-600 underline">{loginemail}</span>
          </p> 
          </div>
        </div>
      ) : (
        <>
          {/* 🛒 Cart Grid */}
          <div className="flex flex-wrap justify-center gap-6 p-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-slate-800 rounded-3xl w-[90%] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] p-4"
              >
                <img
                  className="w-full max-w-[200px] bg-slate-900 rounded-full mt-3 mb-2 hover:brightness-125"
                  src={item.src}
                  alt={item.title}
                />
                <p className="text-green-500 mb-5 font-semibold text-2xl text-center">
                  {item.title}
                </p>
                <button
                  onClick={() => removefromcart(item._id)}
                  className="bg-red-500 text-white active:scale-95 transition-transform ease-in active:bg-amber-400 p-2 rounded-xl px-7 mb-5"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 💰 Price Box */}
          <div className="bg-slate-900 w-[90%] max-w-[500px] mx-auto my-8 rounded-3xl px-6 py-4 flex flex-col justify-evenly gap-4">
            <div className="flex justify-between text-white">
              <p className="font-semibold text-2xl">Items Price :</p>
              <p className="text-xl text-green-500">${price.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-white">
              <p className="font-semibold text-2xl">Tax :</p>
              <p className="text-xl text-green-500">${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-white">
              <p className="font-semibold text-2xl">Total Price :</p>
              <p className="text-xl text-red-500">${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                saveOrder();
                clearCart();
                sendMail();
              }}
              className="bg-amber-300 p-3 rounded-2xl px-8 py-4 hover:bg-amber-500 active:scale-95 transition-all duration-200 ease-in"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
