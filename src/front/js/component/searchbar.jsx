import React, { useState } from "react";
import "../../styles/searchbar.css";
import { FaSearch, FaHeart, FaRegTimesCircle,  } from "react-icons/fa";
import Sidebar from "../component/sidebar.jsx";
import { Card, Button, CardGroup, Container, Image, Row, Col } from "react-bootstrap";

const fetchFoodData = async (key) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=64c7278dfdd7444cb9348aa2866a9ca2&query=${key}&number=100`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((fetchResponse) => {
      return fetchResponse.json();
    })
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
      console.log(error);
    });
};

const addFavorite = async (title) => {
  const userToken = localStorage.getItem("user_id");
  const url = `${process.env.BACKEND_URL}/api/meal/add/${title}/${userToken}`;

  try {
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await fetchResponse.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
};

function SearchBar({ placeholder, data }) {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [tered, settered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    settered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    settered("");
  };

  const handleFetchData = async () => {
    setLoading(true);
    const data = await fetchFoodData(tered);
    setFilteredData(data?.results);
    setLoading(false);
  };

  return (
    <Sidebar>
      <div className="container" id="containerSearch">
      <div className="search" id="searchComplex">
        <div className="searchInputs">
          <input
            className="form-control input-lg"
            type="text"
            placeholder={placeholder}
            value={tered}
            onChange={handleFilter}
            id="inputF4v"
            
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <button disabled={loading} onClick={handleFetchData} id="buttonSearch">
                <FaSearch />
              </button>
            ) : (
              <button id="clearBtn" onClick={clearInput}>
                <FaRegTimesCircle  />
                </button>
            )}
          </div>
        </div >
        {filteredData.length != 0 && (
          /**<div className="card-group" id="searchCardGroup">*/
          <div className="col" id="cardsCols">
            {filteredData.slice(0, 15).map((value, key) => {
              ;
              return (  
                <div className="card" id="searchCards">
                  <img className="card-img-top" src={value?.image} />

                  <div className="card-body" id="resultBody"> 
                  <div className="card-title">{value.title}</div>
                  </div>

                  
                  <div className="card-footer" id="resultfooter">
                  <button className="btn btn-success "onClick={() => addFavorite(value.title)}>
                    <FaHeart />
                  </button>
                  </div>
                </div>
              );
            })
          // return (
          //   <>
          //   <Row className="justify-content-between bg-white align-items-center my-4">
          //     <Col lg={2}>
          //       <Image fluid src={value?.image}></Image>
          //     </Col>
          //     <Col lg={9}><h1>{value.title}</h1></Col>
          //     <Col lg={1}>
          //       <button className="btn btn-success "onClick={() => addFavorite(value.title)}>
          //           <FaHeart />
          //         </button>
          //       </Col>
          //   </Row></>)})

          }
          </div>/*</div>*/
        )}
      </div>
      </div>
      
    </Sidebar>
  );
}

export default SearchBar;


// <Button onClick={() => addFavorite(value.id, value.title)}><FaHeart /></Button> Line 105