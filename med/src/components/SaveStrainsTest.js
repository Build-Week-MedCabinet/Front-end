import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { fetchData, dsData } from '../redux/actions';
import { axiosWithAuth } from '../utils/AxiosWithAuth';

import { removeStrain } from '../../redux/actions/index';

import AddNewStrain from '../AddNewStrain';
import SavedStrains from '../SavedStrains';

const SavedStrains = ({ fetchData, dsData, data }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    // dsData()
    dsData()
 
  }, [dsData, fetchData])

  // Not sure on data to delete
  const deleteStrain = strain => {
    axiosWithAuth()
    .delete(`https://medcabinet.herokuapp.com/strains/strain`, { data: {'strain': strain.strain}})
    .then(res => {
      console.log(res)
      fetchData();
      // fetchData([...data.filter(s => s.id !== strain.strainid)])
    })
    .catch(err => {
      console.log('delete error', err)
    })
  }

  // Save strain to user
  
  const saveStrain = strain => {
    axiosWithAuth()
    .post(`https://medcabinet.herokuapp.com/strains/strain`, strain)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log('delete error', err)
    })
  }
  

  
  const addStrain = (strain) => {
    console.log('ADD STRAIN', strain)
      const newStrain = {
        strain: strain.strain,
        strainid: strain.strainid,
        effects: strain.effects,
        flavors: strain.flavors
      }
      setFavorites([...favorites, newStrain]);
  }
  
  
  // Save without axios
  const removeStrain = strain => {
    setFavorites([...favorites.filter(c => c.strainid !== strain.strainid)])
  }

  return (
    <div>
      <h1>SavedStrains info</h1>
      <AddNewStrain />
      {
        data.map(strain => (
          <div key={strain.strainid}>
            {console.log(strain)}
            <h2>{strain.strain}</h2>
            <button onClick={() => deleteStrain(strain)}>Delete</button>
            <button onClick={() => saveStrain(strain)}>Save</button>
            <p>Rating: {strain.rating}</p>
            <p>TYPE: {strain.type}</p>
            <p>{strain.description}</p>
          </div>
        ))
      }
      <h2>Favoites</h2>
      <Route path='/favorites' component={SavedStrains} {...data} />
      <Link to="/favorites">Favorites</Link>
      {/*<SavedStrains />*/}
      { /*
        data.map(strain => (
          <div key={strain.strainid}>
            <h2>{console.log(strain)}</h2>
            <span onClick={() => deleteStrain(strain)}>&#9734; {strain.strain}</span>
            <p>Effects: {strain.effects}</p>
            <p>Flavors: {strain.flavors}</p>
          </div>
        ))
        */}
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return {
    data: state.data,
    saved: state.saved
  }
}

export default connect(mapStateToProps, { fetchData, dsData })(SavedStrains);
