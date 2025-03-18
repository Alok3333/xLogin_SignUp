import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = "https://x-login-sign-up.vercel.app/products";
        let res = await fetch(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        let result = await res.json();
        setProducts(result);
        // console.log(result, "result");
      } catch (err) {
        console.log(err, "err from fetchApi Data");
      }
    }

    fetchData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    alert("Logout Successfully.");
    navigate("/login");
  };

  return (
    <>
      {/* <center> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 20px",
          borderBottom: "3px solid maroon",
          backgroundColor: "black",
          color: "#ccc",
        }}
      >
        <h1>
          Welcome <span style={{ color: "maroon" }}>{loggedInUser}</span>
        </h1>
        <button className="signup-btn" onClick={handleLogOut}>
          Logout
        </button>
      </div>
      {products.map((item, i) => (
        <ul key={i}>
          <li>
            name: {item.name}, price: {item.price}
          </li>
        </ul>
      ))}
      {/* </center> */}
    </>
  );
};

export default Home;
