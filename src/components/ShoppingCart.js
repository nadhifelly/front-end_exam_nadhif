import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ShoppingCart extends Component {
  state = {
    cartItem: [],
    checkOut: []
  };
  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios.get("http://localhost:1996/shoppingcart").then(res => {
      this.setState({ cartItem: res.data });
    });
  };
  deleteCart = id => {
    axios.delete(`http://localhost:1996/shoppingcart/${id}`).then(res => {
      this.getProduct();
    });
  };
  sumTotal = () => {

  }
  renderList = () => {
    const { username } = this.props.user;
    return this.state.cartItem.map(product => {
      if (username === product.username) {
        return (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.desc}</td>
            <td>{product.price}</td>
            <td><img className="list" src={product.pict} alt={product.desc}></img></td>
            <td>{product.qty}</td>
            <td>
              <button className="btn btn-danger" onClick={() => { this.deleteCart(product.id) }}>Delete</button>
            </td>
          </tr>
        );
      }
    });
  };
  renderListCheckout = () => {
    const { username } = this.props.user;

    return this.state.cartItem.map(product => {
      var subtotal = product.qty * product.price
      
      if (username === product.username) {
        return (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.qty}</td>
            <td>{subtotal}</td>
          </tr>
          
        )
      }
    })
  }
  render() {
    if (this.props.username !== '') {
      var total = 0
      this.state.cartItem.forEach(items => { total += (items.qty * items.price)} )
      return (
        <div className="container">
          <h1 className="display-4 text-center">Shopping Cart</h1>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">DESC</th>
                <th scope="col">PRICE</th>
                <th scope="col">PICTURE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}  
            </tbody>
          </table>
          <h1 className="display-4 text-center">Checkout</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {this.renderListCheckout()}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}
// render() {
//   if (this.props.user.username !== "") {
//       var total = 0
//       var pengiriman = 9000
//       this.state.cartItem.forEach(items => { total += (items.qty * items.price)} )
//     return (
//       <div className="container">
//         <div className="row">
//           <h1 className="mx-auto display-4">Your Shopping Cart</h1>
//         </div>
//         <div className="row">
//           <div className="col-8">{this.renderList()}</div>
//           <div className="col-4">
//             <div className="card m-2 fixed">
//               <div className="card-header">Tagihan</div>
//               <div className="card-body">
//               {this.renderListCheckout()}
//                 <p className="card-text">Subtotal</p>
//                 <p className="card-text text-right">Rp. {total}</p>
//                 <p className="card-text">Pengiriman</p>
//                 <p className="card-text text-right">Rp. {pengiriman}</p>
//                 <p className="card-text">Total</p>
//                 <p className="card-text text-right">Rp. {total + pengiriman}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return <Redirect to="/" />;
//   }
// }


const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ShoppingCart);
