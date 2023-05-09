import React from 'react';
import Card from 'react-bootstrap/Card';

function CurrentMealCard () {
    return (
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://via.placeholder.com/286x180"/>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
         API data here 
        </Card.Text>
      </Card.Body>
    </Card>
    );
};

export default CurrentMealCard;