import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

// Create context
export const AppContext = createContext();

// Context provider
export const AppContextProvider = ({ children }) => {

  const currency=import.meta.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null    );
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState ({});



//fetch all product
  const fetchproducts =async()=>{
    setProducts(dummyProducts);
  }

  //add produxt ot cart
  const addtoCart=(itemid)=>{
    let cartdata=structuredClone(cartItems);
    if(cartdata[itemid]){
      cartdata[itemid]+=1;

    }
    else{
      cartdata[itemid]=1;
    }
    setCartItems(cartdata);
    toast.success("Added to cart");
  }


//update cart item quantity

const updatecartitem=(itemid,quantity)=>{
  let cartdata=structuredClone(cartItems);
  cartdata[itemid]=quantity;
  setCartItems(cartdata);
  toast.success("Cart Updated");
}


//remove from cart

const removefromcart=(itemid)=>{
  let cartdata=structuredClone(cartItems);
  if(cartdata[itemid]){
    cartdata[itemid]=-1;
    if(cartdata[itemid]===0){
      delete cartdata[itemid];
    }
  }
  toast.success("Removed from cart");
  setCartItems(cartdata);
}


  useEffect(()=>{
    fetchproducts();
  },[])


  const value = { navigate, user, setUser, setIsSeller,isSeller ,showUserLogin,
    setShowUserLogin , products, currency,addtoCart,updatecartitem,removefromcart,cartItems};

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
