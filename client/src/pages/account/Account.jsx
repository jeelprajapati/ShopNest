import React, { useEffect, useState } from "react";
import "./account.css";
import Navbar from "../../components/navbar/Navbar";
import Topbar from "../../components/topbar/Topbar";
import { accountList } from "../../assets/data";
import Orders from "../../components/orders/Orders";
import ChangePassword from "../../components/changePassword/ChangePassword";
import Favorites from "../../components/favorites/Favorites";
import { useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  const location=useLocation();
  const [change,setChange]=useState(0);

  const [selectedItem, setSelectedItem] = useState(1);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    if(location?.search?.split("=")[1]){
      setSelectedItem(parseInt(location?.search?.split("=")[1]));
    }else{
      
    }
  },[location])

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleClick=(i)=>{
    if (i === 5) {
      localStorage.removeItem("user");
      navigate("/");
    }
    else{
      setSelectedItem(i);
    }
  }

  return (
    <div className="account">
      <Topbar />
      <div className="accountNav">
        <Navbar id={0} change={change} />
      </div>
      <div className="accountContainer">
        <div className="accountWrapper">
          <div className="accountPosition">
            <div className="accountLeft">
              <h3>Welcome, {user?.username}</h3>
              <div className="accountList">
                {accountList.map((item) => (
                  <div
                    className={`${
                      selectedItem === item.id
                        ? "accountSelect"
                        : "accountListItem"
                    }`}
                    key={item?.id}
                    onClick={()=>handleClick(item.id)}
                  >
                    <span className="accountListIcon">
                      <img src={item.icon} alt="" />
                    </span>
                    <span className="accountListName">{item?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="accountRight">
            {selectedItem === 1 && <Orders token={user?.token} />}
            {selectedItem === 2 && <Favorites token={user?.token} setChange={setChange} />}
            {selectedItem === 4 && <ChangePassword token={user?.token} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
