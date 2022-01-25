import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext()
 
  const searchValue = useRef('');

  useEffect(()=>{
    // useRef is basically use to get focus on input
    searchValue.current.focus()
  },[]) 

  // because of the useRef, handlesubmit is created to prevent submitting the form
const handleSubmit=(e)=>{
  e.preventDefault()
  
}
  const searchCocktail =()=>{
    // useRef can be use to get and update a mutable Object
    // update the value
    // searchValue.current.value='add me to the state',
    // get the value
    // const raps = searchValue.current.value
    // useRef is use to get the value of input node
    setSearchTerm(searchValue.current.value)
  }

  return <section className='section search'>
    <form   className='search-form' onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">search your favorite cocktail</label>
        <input type="text" id='name' ref={searchValue} onChange={searchCocktail}/>
      </div>
    </form>
  </section>;
};

export default SearchForm;
