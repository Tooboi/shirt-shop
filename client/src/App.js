import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { clearIdbData } from './utils/helpers';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import NewItem from './components/Admin/NewItem';
import RemoveItem from './components/Admin/RemoveItem';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // useEffect(() => {
  //   clearIdbData();
  // }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="m-0 p-0 bg-primary-500 text-primary-200 h-full bg-cover">
          <StoreProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/create" element={<NewItem />} />
              <Route path="/admin/remove" element={<RemoveItem />} />
              <Route path="/products/:id" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
