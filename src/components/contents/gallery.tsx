import React from "react";
import Card from "./card";
import axios from "axios";
import md5 from "js-md5";

interface isState{
    results: [],
}

class Gallery extends React.Component  <any, isState>{
    
    constructor(props: any){
        super(props);

        this.state = {
            results:[],
        }

        this.handleClick("A");
    }

    handleClick(start: any){
        // console.log(start);
        let pubkey = "d43633cf8e6f0a66c5df36d617ef73f0";
        let pvtkey = "9a7abac2d407acfb5836ab928825b515f3e87d5b";
        let ts = new Date().getTime();
        axios({
            url:'https://gateway.marvel.com:443/v1/public/characters',
            method: 'get',
            params:{
                "nameStartsWith": start,
                "apikey": pubkey,
                "ts": ts,
                "hash": md5(ts+pvtkey+pubkey).toString(),
            }
        }).then(
            res => {
                this.setState({results: res.data.data.results});
                results = res.data.data.results;
            }
        ).catch(
            err => console.log(err)
        )
    }

    render(){
        return(
            <React.Fragment>
                <div className="galleryHint">You can click the button below to browse the heroes whose names begin with *</div>
                <div className="filter">
                    <div onClick={() => {this.handleClick("A")}} className="alphabet">A</div>
                    <div onClick={() => {this.handleClick("B")}} className="alphabet">B</div>
                    <div onClick={() => {this.handleClick("C")}} className="alphabet">C</div>
                    <div onClick={() => {this.handleClick("D")}} className="alphabet">D</div>
                    <div onClick={() => {this.handleClick("E")}} className="alphabet">E</div>
                    <div onClick={() => {this.handleClick("F")}} className="alphabet">F</div>
                    <div onClick={() => {this.handleClick("G")}} className="alphabet">G</div>
                    <div onClick={() => {this.handleClick("H")}} className="alphabet">H</div>
                    <div onClick={() => {this.handleClick("I")}} className="alphabet">I</div>
                    <div onClick={() => {this.handleClick("J")}} className="alphabet">J</div>
                    <div onClick={() => {this.handleClick("K")}} className="alphabet">K</div>
                    <div onClick={() => {this.handleClick("L")}} className="alphabet">L</div>
                    <div onClick={() => {this.handleClick("M")}} className="alphabet">M</div>
                    <div onClick={() => {this.handleClick("N")}} className="alphabet">N</div>
                    <div onClick={() => {this.handleClick("O")}} className="alphabet">O</div>
                    <div onClick={() => {this.handleClick("P")}} className="alphabet">P</div>
                    <div onClick={() => {this.handleClick("Q")}} className="alphabet">Q</div>
                    <div onClick={() => {this.handleClick("R")}} className="alphabet">R</div>
                    <div onClick={() => {this.handleClick("S")}} className="alphabet">S</div>
                    <div onClick={() => {this.handleClick("T")}} className="alphabet">T</div>
                    <div onClick={() => {this.handleClick("U")}} className="alphabet">U</div>
                    <div onClick={() => {this.handleClick("V")}} className="alphabet">V</div>
                    <div onClick={() => {this.handleClick("W")}} className="alphabet">W</div>
                    <div onClick={() => {this.handleClick("X")}} className="alphabet">X</div>
                    <div onClick={() => {this.handleClick("Y")}} className="alphabet">Y</div>
                    <div onClick={() => {this.handleClick("Z")}} className="alphabet">Z</div>
                </div>
                {/* find the heros by first letter of their name */}
                <div className="searchRes">
                    {this.state.results.map(el => <Card key={el['id']} value={el}/>)}
                </div>
            </React.Fragment>
        );
    }
}

export default Gallery