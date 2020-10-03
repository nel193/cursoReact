import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";
import Footer from "../components/Footer";
import '../assets/styles/App.scss';
import useInitialState from "../hooks/useInitialState"

const elAPI = "http://localhost:3000/initialState";

const App = () => {
    const initialState = useInitialState(elAPI)
    return initialState.length === 0 ? <h1>Cargando...</h1> : (
        <div className='app'>
            <Header />
            <Search />
            <Categories title="Mi lista" >
                <Carousel>
                {initialState.mylist?.map(item =>
                    <CarouselItem key={item.id} {...item}/>
                )}
                </Carousel>
            </Categories>

            <Categories title="Tendencias">
                <Carousel>
                    {initialState.trends?.map(item => 
                        <CarouselItem key={item.id} {...item}/>
                    )}
                </Carousel>
            </Categories>
            <Categories title="Estrenos">
                <Carousel>
                {initialState.originals?.map(item =>
                    <CarouselItem key={item.id} {...item}/>
                )}
                </Carousel>
            </Categories>
            <Footer />
        </div>
)};

export default App;
