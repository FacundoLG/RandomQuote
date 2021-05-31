import React, { useState, useEffect } from 'react';
import { BsArrowRepeat } from "react-icons/bs";
import  {Link} from "react-router-dom"
import Quote from '../components/Quote';
import Card from '../components/Card';
import '../assets/pages/Home.css'
var randomData = {}
const Home = () =>{
    const [data,setData] = useState(randomData)
    
    useEffect(() => {
        getRandomData()        
    },[])
    const getRandomData = () => {
        fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
        .then(res => res.json())
        .then(json => {
            console.log(json)
            randomData = {}
            const {quoteAuthor,quoteGenre,quoteText,_id} = json.data[0]
            randomData.author = quoteAuthor
            randomData.genre = quoteGenre
            randomData.text = quoteText
            randomData.id = _id
            setData(randomData)
        })
    }
    return(
        <div>
            <div className="buttonContainer">
                <button className="randomButton" onClick={getRandomData}>random <BsArrowRepeat className="icon"/></button>
            </div>
            {randomData.text ? 
            <div>
                <div className="container card">
                    <Quote text={data.text}/>
                </div>
                <Link to={`/author/${data.author}`}  className="container">
                    <Card author={data.author} description={data.genre}/>
                </Link>

            </div> : ""}

        </div>
    )
}

export default Home