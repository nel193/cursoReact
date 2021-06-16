import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { searchVideo } from '../actions';
import '../assets/styles/components/Search.scss';

const Search = (props) => {
  const { isHome, searchVideo } = props;

  const inputStyle = classNames('input', {
    isHome,
  });

  const handleInput = (e) => {
    searchVideo(e.target.value);
  };
  return (
    <section className='main'>
      <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
      <input
        onChange={handleInput}
        type='text'
        className={inputStyle}
        placeholder='Buscar...'
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = {
  searchVideo,
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
