import React, { lazy, Suspense } from "react";
import "./scss/app.scss";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Pages/Home";
import MainLayout from "./components/Layouts/MainLayout";

const FullPizza = lazy(() => import(/* webpackChunkName: "fullpizza" */ "./components/Pages/FullPizza/FullPizza"))
const Cart = lazy(() => import(/* webpackChunkName: "cart" */ "./components/Pages/Cart/Cart"))
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */ "./components/Pages/NotFound/NotFound"))

function App() {

  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path = '/' element= {<MainLayout/>}>
            <Route path = '' element = {<Home />}/>
            <Route path = 'pizza/:id' element = {<FullPizza/>}/>
            <Route path = 'cart' element = {<Cart/>}/>
            <Route path = '*' element = {<NotFound/>}/>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
