import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import {HashRouter as Router , Route} from 'react-router-dom'
import OrderDetailScreen from './screens/OrderDetailScreen'
import AdminUserListScreen from './screens/AdminUserListScreen'
import AdminUserEditScreen from './screens/AdminUserEditScreen'
import AdminProductListScreen from './screens/AdminProductListScreen'
import AdminProductEditScreen from './screens/AdminProductEditScreen'
import AdminOrderListScreen from './screens/AdminOrderListScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderDetailScreen} />
          <Route path="/admin/users" component={AdminUserListScreen} />
          <Route path="/admin/user/:id/edit" component={AdminUserEditScreen} />
          <Route path="/admin/products" component={AdminProductListScreen} />
          <Route path="/admin/product/:id/edit" component={AdminProductEditScreen} />
          <Route path="/admin/orders" component={AdminOrderListScreen} />
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App