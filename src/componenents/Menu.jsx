import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

// Import the font
import THSarabunNew from "./fonts/THSarabunNew.ttf";

// Register the font
Font.register({ family: "THSarabunNew", src: THSarabunNew });

const Menu = ({ items }) => {
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phoneNumber: "",
  });

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Cart Summary</Text>
          <Text style={styles.customerInfo}>
            Customer Name: {customerInfo.name} <br />
          </Text>
          <Text style={styles.customerInfo}>
            Phone Number: {customerInfo.phoneNumber}
          </Text>
          <View style={styles.cartItems}>
            {cartItems.map((item) => (
              <Text key={item.id}>
                {item.title} - {item.price} BATH <br />
              </Text>
            ))}
          </View>
          <Text style={styles.total}>Total: {totalAmount.toFixed(2)} BATH</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="section-center">
      {items.map((item) => {
        const { id, title, price, img, desc } = item;
        return (
          <article className="menu-item" key={id}>
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">{price} BATH</h4>
              </header>
              <p className="item-text">{desc}</p>
              <button onClick={() => addToCart(item)} style={styles.addButton}>
                Add to Cart
              </button>
              <button
                onClick={() => removeFromCart(id)}
                style={styles.removeButton}
              >
                Remove from Cart
              </button>
            </div>
          </article>
        );
      })}
      <div style={styles.cartSummary} className="cart-summary">
        <h2 style={styles.cartSummaryHeading}>Cart Summary</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={customerInfo.name}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter your phone number"
          value={customerInfo.phoneNumber}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })
          }
        />
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price} BATH
            </li>
          ))}
        </ul>
        <p>Total: {totalAmount.toFixed(2)} BATH</p>
        <PDFDownloadLink
          document={<MyDocument />}
          fileName="invoice.pdf"
          style={styles.downloadButton}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Check Out"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  // เพิ่มสไตล์สำหรับปุ่มเพิ่มสินค้า
  addButton: {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "8px",
  },
  // เพิ่มสไตล์สำหรับปุ่มลบสินค้า
  removeButton: {
    backgroundColor: "#f44336",
    border: "none",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "8px",
  },
  downloadButton: {
    backgroundColor: "#c59d5f",
    border: "none",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "15px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "8px",
  },
  // เพิ่มสไตล์สำหรับข้อความ "Cart Summary"
  cartSummaryHeading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cartSummary: {
    position: "fixed",
    bottom: "15px",
    right: "15px",
    borderRadius: "0.75rem",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 9999, // Ensure it's above other content
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  cartItems: {
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Menu;
