import React from 'react';
import { connect } from 'react-redux';
import '../assets/styles/App.scss';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
// import useInitialState from "../hooks/useInitialState"
import Header from '../components/Header';
import Search from '../components/Search';

// const elAPI = "http://localhost:3000/initialState";

const Home = ({ search, myList, trends, originals }) => {
  // const initialState = useInitialState(elAPI)
  // para poder pasar del cargando se debe activar la fakeApi
  //con el comando json-server initialState.json (nombre del archivo fakeAPI)
  // initialState.length === 0 ? <h1>Cargando...</h1> :
  return (
    <>
      <Header />
      <Search isHome />
      {search.length > 0 && (
        <Categories title='Mi busqueda'>
          <Carousel>
            {search?.map((item) => (
              <CarouselItem
                key={item.id}
                {...item}
                isMyList
              />
            ))}
          </Carousel>
        </Categories>
      )}
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {myList?.map((item) => (
              <CarouselItem
                key={item.id}
                {...item}
                isMyList
              />
            ))}
          </Carousel>
        </Categories>
      )}

      <Categories title='Tendencias'>
        <Carousel>
          {trends?.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
      <Categories title='Estrenos'>
        <Carousel>
          {originals?.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
    </>
  );
};

// export default Home;

const mapStateToProps = (state) => {
  return {
    search: state.search,
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};
// export default connect(props, actions)(Componente)
export default connect(mapStateToProps, null)(Home);
