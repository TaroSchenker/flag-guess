import logo from './logo.svg';
import {useState, useEffect} from 'react'
import {Button, Container, Row, Col, Card, Alert} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

const [flag, setFlag] = useState(null)
const [flagCountry, setFlagCountry] = useState(null)
const [randomCountry, setRandomCountry] = useState(null)
const [randomCountry2, setRandomCountry2] = useState(null)
const [countScore, setCountScore] = useState(0) 
const [isLoading, setIsLoading] = useState(false)
const [wrongGuess, setWrongGuess] = useState(false)
const [checkingScore, setCheckingScore] = useState(false)
const [capital, setCapital] = useState(null)
const [reveal, setReveal] = useState(false)
const [highScore, setHighScore] = useState(0)
const answerArray = [flagCountry, randomCountry, randomCountry2]


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}




async function getCountryData(){
  console.log('orig', answerArray)
  shuffle(answerArray)
  console.log('shuffle', answerArray)
  if(!isLoading){
  setWrongGuess(false)
  setIsLoading(true)
  const response = await fetch('https://restcountries.com/v3.1/all')
  const countries = await response.json()
  let randomNumber = Math.floor(Math.random() * 200)
  let randomNumber2 = Math.floor(Math.random() * 200)
  let randomNumber3 = Math.floor(Math.random() * 200)

  setFlag(countries[randomNumber].flags.png)
  setFlagCountry(countries[randomNumber].name.common)
  setRandomCountry(countries[randomNumber2].name.common)
  setRandomCountry2(countries[randomNumber3].name.common)
  setCapital(countries[randomNumber].capital)
  console.log('capital',capital)
  setIsLoading(false)
  setCheckingScore(false)
  setReveal(false)
  }
} 

const checkAnswer = (guess) => {
  setCheckingScore(true)
  
    if( guess === flagCountry && setCheckingScore) {
      setCountScore(countScore + 1)

      getCountryData()
    } else {
      if(highScore < countScore) {
        setHighScore(countScore)
      }
      setCountScore(0)
      setWrongGuess(true)
      setCheckingScore(false)
    }
  }

  useEffect(() => {
getCountryData()
shuffle(answerArray)
  },[]) 


  return (
    <Container style=
    {{
      margin:0, padding:0
    }}>
      
  {/* <Container style={{    

   }} >   */}
  <Row>
  <Col>
  <Card border="dark" style={{ width: '20rem' }}>
  <Card.Header className="text-center" ><h4>Country Flag Guesser</h4></Card.Header>
  <Card.Text className="text-center"> <h9>High-Score: {highScore} </h9></Card.Text>
  <Card.Img style={{border: '5px solid'}} variant="top" src={flag} />
  <Card.Body>
    <Card.Title className="text-center">How many  flags can you  guess in a row?</Card.Title>
    <div class="text-center">

    {wrongGuess &&
    <Button variant="primary" onClick={getCountryData}> Start Again</Button>
    } 
    </div>


    {!checkingScore && !wrongGuess &&
    <div className="text-center">
      { answerArray.map(answer =>{
        if(answer === flagCountry){
          return  <Button style={{margin: '3px'}}  variant="primary" onClick={ () => checkAnswer(answer)} >{answer} </Button>
        } else {
          return  <Button style={{margin: '3px'}}  variant="primary" onClick={ () => checkAnswer(answer)} >{answer} </Button>
    
        }
        })
    }
    </div>
    }

    {wrongGuess && answerArray.map(answer =>{
        if(answer === flagCountry){
          return  <Button style={{margin: '2px'}}  variant="warning" onClick={ () => checkAnswer(answer)} >{answer} </Button>
        } else {
          return  <Button style={{margin: '2px'}}  variant="primary" onClick={ () => checkAnswer(answer)} >{answer} </Button>
    
        }
        }) && <Alert className='text-center' key={'warning'} variant={'warning'}>
      Wrong! Correct answer is {flagCountry}!
    </Alert>} 

    <Card.Body className='text-center'>
    <Button  style={{margin: '2px'}}  variant="secondary"  onClick={() => setReveal(!reveal)}> Reveal a clue (capital city)</Button>
        { reveal && !isLoading && <Card.Text style={{padding: '3px'}}  className="col-md-12 text-center">  Capital city is {capital} </Card.Text>}
    </Card.Body>

    <Card.Text className="text-center"><h7> Your Current score is {countScore} </h7> </Card.Text>     
  </Card.Body>
</Card>
 </Col>

 
  </Row>

  </Container>
  // </Container>
  );
}

export default App;
