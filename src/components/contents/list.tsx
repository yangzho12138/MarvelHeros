import md5 from "js-md5";
import axios from "axios";
import Card from "./card";
import React from "react";

interface isState{
    value: string,
    sort: string,
    order: string,
    results: [],
}

class List extends React.Component <any, isState>{
    pubkey: string;
    pvtkey: string;
    // ts: number;
    // hash: string;
    
    constructor(props:any){
        super(props);
        this.state = {
            value: " ",
            sort: "Name",
            order: "Ascending",
            results:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);

        this.pubkey = "d43633cf8e6f0a66c5df36d617ef73f0";
        this.pvtkey = "9a7abac2d407acfb5836ab928825b515f3e87d5b";
        // this.ts = new Date().getTime();

        // var message = this.ts+this.pvtkey+this.pubkey;
        // this.hash = md5(message).toString();
    }

    handleChange(event: { target: { value: any; }; }){
        this.setState({ value: event.target.value });
    }

    handleSort(event: { target: { value: any; }; }){
        this.setState({ sort: event.target.value });
    }

    handleOrder(event: { target: { value: any; }; }){
        this.setState({ order: event.target.value });
    }

    changeSort(){
        console.log(this.state.sort);
        if(this.state.sort === "ID"){
            if(this.state.order === "Ascending"){
                this.setState({results: this.state.results.sort((a, b) => {
                    return a['id'] - b['id'];
                })})
            }else if(this.state.order === "Descending"){
                this.setState({results: this.state.results.sort((a, b) => {
                    return b['id'] - a['id'];
                })})
            }
            // console.log(this.state.results);
        }else if(this.state.sort === "Name"){
            if(this.state.order === "Ascending"){
                this.setState({results: this.state.results.sort((a, b) => {
                    if(a['name'] < b['name'])
                        return -1;
                    else
                        return 1;
                })});
            }else{
                this.setState({results: this.state.results.sort((a, b) => {
                    if(a['name'] < b['name'])
                        return 1;
                    else
                        return -1;
                })});
            }
            // console.log(this.state.results);
        }
    }

    handleClick1(){
        let ts = new Date().getTime();
        axios({
            url:'https://gateway.marvel.com:443/v1/public/characters',
            method: 'get',
            params:{
                "name": this.state.value.trim(),
                "apikey": this.pubkey,
                "ts": ts,
                "hash": md5(ts+this.pvtkey+this.pubkey).toString(),
            }
        }).then(
            res => {
                // console.log(res);
                // console.log(res.data.data.results);
                this.setState({results: res.data.data.results});
                results = res.data.data.results;
            }
        ).catch(
            err => console.log(err)
        )
    }

    handleClick2(){
        let ts = new Date().getTime();
        axios({
            url:'https://gateway.marvel.com:443/v1/public/characters',
            method: 'get',
            params:{
                "nameStartsWith": this.state.value.trim(),
                "apikey": this.pubkey,
                "ts": ts,
                "hash": md5(ts+this.pvtkey+this.pubkey).toString(),
            }
        }).then(
            res => {
                // console.log(res);
                // console.log(res.data.data.results);
                this.setState({results: res.data.data.results});
                results = res.data.data.results;
            }
        ).catch(
            err => console.log(err)
        )
    }

    render(){
        return(
            <div>
                <div className="searchBar">
                    <div className="search">Search Your Heros</div>
                    <input className="search_input" type="text" value={this.state.value} onChange={this.handleChange}/>
                    <div className="buttons">
                        <button className="search_submit" onClick={this.handleClick1}>Precise Search</button>
                        <button className="search_submit" onClick={this.handleClick2}>Fuzzy Search</button>
                    </div>
                    <div className="note">Note: You can enter the beginning of the hero's name for fuzzy search! (e.g. Captain)</div>
                </div>
                <br/>
                <div className="sortHint">Sort By:</div>
                <select name="sortBy" id="sortBy" value={this.state.sort} onChange={this.handleSort}>
                    <option value="Name">Name</option>
                    <option value="ID">ID</option>
                </select>
                <select name="sortOrder" id="sortOrder" value={this.state.order} onChange={this.handleOrder}>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
                <button className="submitSort" onClick={this.changeSort}>Submit</button>
                <div className="note">Click the name to see detail! (If there is no result, please change your key words or use fuzzy search)</div>
                <div className="searchRes">
                    {this.state.results.map(el => <Card key={el['id']} value={el}/>)}
                </div>
            </div>
        );
    }
}

export default List;