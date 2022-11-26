import {useLocation} from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactWordcloud from 'react-wordcloud';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
import { Card, Row, Col, Container } from "react-bootstrap";


const Dashboard = () => {
  const location = useLocation();
  const [mystatus, setMyStatus] = useState(false);
  const [data, setData] = useState();
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
        // console.log(data["good_word_cloud"][0]);
        // Do some stuff with data dict
        setMyStatus(true ? Object.keys(data).length > 0 : false);
        // console.log(data)
        setData(data)
    } catch (error) {
        console.error(error);
    }

  }
  const response = fetch("http://127.0.0.1:8000/api/dashboard", {
    method: 'POST',
    body: JSON.stringify({
        location
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const options = {
    colors: ["#FFF7E5", "#F9D3AB", "#f4cc72", "#ffbe2d", "#ffb100"],
    enableTooltip: false,
    deterministic: true,
    fontFamily: "impact",
    fontSizes: [5, 10],
    fontStyle: "normal",
    fontWeight: "normal",
    rotations: 1,
    rotationAngles: [0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 10,
  };
  const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
  ]
//   let data = loadData();
  useEffect(() => {
    loadData()
  }, [])
    
  if (mystatus){
    return (
    <div>
        
         <Container>
            <Row>
            <Col xs={12} md={4} lg={3}>
            <Card >
                <Card.Body>
                    <Card.Title>Good Reviews - Common 2 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["good_2_phrase_cloud"]).map(([key, value]) => 
                            <li key={key}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body>
                    <Card.Title>Good Reviews - Common 3 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["good_3_phrase_cloud"]).map(([key, value]) => 
                            <li key={key}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body>
                    <Card.Title>Bad Reviews - Common 2 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["bad_2_phrase_cloud"]).map(([key, value]) => 
                            <li key={key}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body>
                    <Card.Title>Bad Reviews - Common 3 Word Phrases</Card.Title>
                    <Card.Text>
                    <ul>
                        {Object.entries(data["bad_3_phrase_cloud"]).map(([key, value]) => 
                            <li key={key}>{key} : {value} </li>
                        )}
                    </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
        </Container>
        
        <ReactWordcloud options={options} words={data["good_word_cloud"]} />
    </div>
  )}

}
export default Dashboard