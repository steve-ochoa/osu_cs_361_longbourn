import React, { useState, useEffect } from "react";
import Card from "../components/ExpertCard";
import { Container, Row, Col } from "react-bootstrap";
// import { customFetch } from "../components/Helper";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { customFetch } from "../components/Helpers";


function ExpertResultsPage() {
  const history = useHistory();
  const searchInput = history.location.state;
  const name = searchInput.input;
  const category = searchInput.radio;
  const URL = "http://flip3.engr.oregonstate.edu:6997/" + category;
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [expertsData, setExpertsData] = useState({
    expertId: "",
    firstName: "",
    description: "",
    photoUrl: null,
  });

  // fetch(URL).then(function(response) {    // get array of skills/courses/companies
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     return Promise.reject(response);
  //   }
  // }).then(function (data) {     // get the matching id
  //   data.forEach(obj => {
  //     if (obj['name'].toLowerCase() === name) {
  //       if (category === 'skills') {
  //         setCategoryId(obj['skillId']);
  //       } else if (category === 'courses') {
  //         setCategoryId(obj['courseId']);
  //       } else {
  //         setCategoryId(obj['companyId']);
  //       }
  //     }
  //   })
  // }).then(function (response) {
  //   fetch("http://flip3.engr.oregonstate.edu:6997/findExperts/skill/:" + categoryId).then(function (data) {
  //     setExpertsData(data);
  //   });
  // });

  // console.log(categoryId);
  // console.log(expertsData);



  // // get data for user-specified category
  // useEffect(() => {
  //   async function getCategories() {
  //     const categories = await axios.get(URL);

  //     // for (let i = 0; i < categories.length(); i++) {
  //     //   if (categories[i].name === searchInput.input) {
  //     //     if (searchInput.radio === 'skills') {
  //     //       setCategoryId(categories[i]['skillId']);
  //     //     } else if (searchInput.radio === 'courses') {
  //     //       setCategoryId(categories[i]['courseId']);
  //     //     }
  //     //     if (searchInput.radio === 'companies') {
  //     //       setCategoryId(categories[i]['companyId']);
  //     //     }
  //     //   }

  //       console.log(`Your requested category id is ${categories}`);


  //       setCategoryData(categories);


  //   }
  //   getCategories();
  // }, []);

  // console.log(categoryData.data);

  // categoryData.data.map(category => {
  //   // return matching id
  //   if (category.name.toLowerCase() === searchInput.userInput) {
  //     // search for appropriate id name
  //     const idType = '';
  //     if (searchInput.radio === 'skills') {
  //       idType = 'skillId';
  //     } else if (searchInput.radio === 'courses') {
  //       idType = 'courseId';
  //     } else {
  //       idType = 'companyId';
  //     }
  //     setCategoryId(category[idType]);
  //   }
  // });

  // async function getCategories() {
  //   const route = "http://flip3.engr.oregonstate.edu:6997/" + searchInput.radio;
  //   const categories = await axios.get(route);
  //   console.log(categories);

  //   return categories;
  // }

  // useEffect(() => {
  //   async function getCategories() {
  //     const categoryData = await axios("http://flip3.engr.oregonstate.edu:6997/" + searchInput.radio);
  //     console.log(`Requested data is: ${categoryData}`);
  //     setCategoryData(categoryData);
  //   }
  //   getCategories();
  // }, []);

  // console.log(searchInput.radio);

  useEffect(() => {
    async function fetchData() {
      const expertsData = await customFetch(
        "http://flip3.engr.oregonstate.edu:6997/experts/"
      );
      console.log("Your experts are are: ", expertsData);
      setExpertsData(expertsData);
    }
    fetchData();
  }, []);

  // async function getCategoryData(route) {
  //   return (
  //     await axios.get(route).then(
  //       response => {
  //         findCategoryId(response);
  //       }).catch(function (error) {
  //         console.log(error);
  //       }));
  // }

  // function findCategoryId(category) {
  //   category.forEach(obj => {
  //     if (obj.name === input.toLowerCase()) {
  //       return obj.skillId;
  //     }
  //   });
  // }

  // get skill/course/company ids and select the one that matches input
  // query skill/course/company with id for experts with matching profiles



  let rows = [];
  for (let i = 0; i < (expertsData.length - 2); i += 3) {
    rows.push(
      <Row style={{ marginTop: ".5em", marginBottom: ".5em" }}>
        <Col>
          <Card
            key={expertsData[i].expertId}
            expertId={expertsData[i].expertId}
            firstName={expertsData[i].firstName}
            description={expertsData[i].description}
            photoUrl={expertsData[i].photoUrl}
          />
        </Col>
        <Col>
          <Card
            key={expertsData[i + 1].expertId}
            expertId={expertsData[i + 1].expertId}
            firstName={expertsData[i + 1].firstName}
            description={expertsData[i + 1].description}
            photoUrl={expertsData[i + 1].photoUrl}
          />
        </Col>
        <Col>
          <Card
            key={expertsData[i + 2].expertId}
            expertId={expertsData[i + 2].expertId}
            firstName={expertsData[i + 2].firstName}
            description={expertsData[i + 2].description}
            photoUrl={expertsData[i + 2].photoUrl}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
      {rows}
    </Container>
  );
}

export default ExpertResultsPage;