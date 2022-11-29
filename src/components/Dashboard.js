import {useLocation} from 'react-router-dom';
import Navbar from "./Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import backgroundImage from '../images/people_eating.png';
import ReactWordcloud from 'react-wordcloud';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
import { Card, Row, Col, Container } from "react-bootstrap";
import Histogram from 'react-chart-histogram';


const Dashboard = () => {
  const location = useLocation();
  const [mystatus, setMyStatus] = useState(false);
  const [data, setData] = useState();
  const [reviewData, setReviewData] = useState();
  const [myReviewDataStatus, setMyReviewDataStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");


  function checkIfLoaded(data){
    if(data.length > 0){
        return 1;
    }
    else{
        return 0;
    }
  }
  async function loadData() {
    const url = 'http://127.0.0.1:8000/api/dashboard';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                location
            }),
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.json();
        let good_values = []
        let bad_values = []
        for (let i = 0; i < 20; i++) {
            let temp_dict = {"text":data["good_word_cloud"][i], "value":0}
            good_values = good_values.concat(temp_dict)
            temp_dict = {"text":data["bad_word_cloud"][i], "value":0}
            bad_values = bad_values.concat(temp_dict)
            
        } 
        data["good_word_cloud"] = good_values
        data["bad_word_cloud"] = bad_values
        // Do some stuff with data dict
        setMyStatus(true ? Object.keys(data).length > 0 : false);
        // console.log(data)
        setData(data)
    } catch (error) {
        console.error(error);
    }

  }

  async function onClickSearch() {
    const url = 'http://127.0.0.1:8000/api/search_keywords';
    const post_input = {"searchInput" : searchInput, "business_id": location.state.id}
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                post_input
            }),
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const reviewData = await response.json();
        // console.log(data["good_word_cloud"][0]);
        // Do some stuff with data dict
        const element = document.createElement("a");
        const file = new Blob([reviewData], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        setMyReviewDataStatus(true ? Object.keys(reviewData).length > 0 : false);
        setReviewData(reviewData)
    } catch (error) {
        console.error(error);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 30],
    fontStyle: "normal",
    fontWeight: "bold",
    padding: 1,
    rotations: 3,
    rotationAngles: [0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };
//   let data = loadData();
  useEffect(() => {
    loadData()
  }, [])

  if(!mystatus){
    return <h1>loading</h1>
  }
  if (mystatus){
    return (
    <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100%'}}>
        <Navbar />
        <Container>
            <Row xs={1} md={2}>
            <Col>
                <Card>
                <Card.Title style={{fontSize:15, alignItems: 'center', display: 'flex', justifyContent: 'center'}}>Good Reviews</Card.Title>
                <ReactWordcloud className = 'WordCloud' options={options} words={data["good_word_cloud"]} />
                </Card>
                
                
            </Col>
            <Col>
            <Card>
            <Card.Title style={{fontSize:15, alignItems: 'center', display: 'flex', justifyContent: 'center'}}>Bad Reviews</Card.Title>
                <ReactWordcloud className = 'WordCloud' options={options} words={data["bad_word_cloud"]} />
                </Card>
            </Col>
            </Row>
        </Container>
         <Container>
            <Row xs={1} md={4}>
            <Col >
            <Card className="Card">
                <Card.Body>
                    <Card.Title style={{fontSize:13}}>Good Reviews - Common 2 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["good_2_phrase_cloud"]).map(([key, value]) => 
                            <li key={key} style={{fontSize:10}}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="Card">
                <Card.Body>
                    <Card.Title style={{fontSize:13}}>Good Reviews - Common 3 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["good_3_phrase_cloud"]).map(([key, value]) => 
                            <li key={key} style={{fontSize:10}}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="Card">
                <Card.Body>
                    <Card.Title style={{fontSize:13}}>Bad Reviews - Common 2 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["bad_2_phrase_cloud"]).map(([key, value]) => 
                            <li key={key} style={{fontSize:10}}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="Card">
                <Card.Body>
                    <Card.Title style={{fontSize:13}}>Bad Reviews - Common 3 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["bad_3_phrase_cloud"]).map(([key, value]) => 
                            <li key={key} style={{fontSize:10}}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
        </Container>
        <Container>
            <Row>
            <Col>
            <Card className="Card">
                <input
                    type="search"
                    placeholder="Search for reviews based on keyword"
                    onChange={handleChange}
                    value={searchInput}
                    
                    id="review_search"
                    name="s" 
                />
                <button type="submit" onClick={onClickSearch}>Download</button>
                
            </Card>
            </Col>
            <Col>
                <Histogram
                    xLabels={["Positive", "Negative"]}
                    yValues={data["pos_neg_sentiments"]}
                    width='500'
                    height='250'
                    options={{optionfillColor: '#FFFFFF', strokeColor: '#0000FF', }}
                />
            </Col>
            </Row>
        </Container>
            
        
    </div>
  )}

}
export default Dashboard