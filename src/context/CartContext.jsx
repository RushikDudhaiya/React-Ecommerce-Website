import React from "react";
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id)
    if (itemInCart) {
      // Increase quantity if already in cart
      const updatedCart = cartItem.map((item) => {
        return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      });
      setCartItem(updatedCart)
      toast.success("Product quantity increase")
    }
    else {
      //Add new item with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }])
      toast.success("Product is add to cart!")
    }
  }

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(cartItem.map((item) => {
      if (item.id === productId) {
        let newUnit = item.quantity;
        if (action === "increase") {
          newUnit += 1;
          toast.success("Quantity is increase")
        } else if (action === "decrease") {
          newUnit -= 1;
          toast.success("Quantity is decrease")
        }
        return newUnit > 0 ? { ...item, quantity: newUnit } : null
      }
      return item
    }).filter(item => item != null)
    )
  }

  const deleteItem = (productId) => {
    setCartItem(
      cartItem.filter((item) => {
        return (item.id !== productId)
      }),
      toast.success("Product is deleted from cart")
    )
    // setCartItem(cartItem
    // .filter(item =>
    //  item.id !== productId))
  }

  return <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}>
    {children}
  </CartContext.Provider>
}

export const useCart = () => {
  return useContext(CartContext)
}