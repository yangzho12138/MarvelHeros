import React from "react";
import Card from "./card";

interface isState{
    results: [],
}

class Gallery extends React.Component  <any, isState>{
    constructor(props: any){
        super(props);

        this.state = {
            results:[],
        }
        
    }

    render(){
        return(
            <div className="searchRes">
                <div className="sortHint">Sort By:</div>
                {/* find the heros by first letter of their name */}
                
                {this.state.results.map(el => <Card key={el['id']} value={el}/>)}
            </div>
        );
    }
}

export default Gallery