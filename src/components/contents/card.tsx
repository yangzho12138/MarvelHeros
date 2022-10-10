import React from "react";
import { Link } from 'react-router-dom';

interface stateType {
    id: number;
}

class Card extends React.Component <any, stateType>{
    imgUrl: string;
    newTo: { pathname: string; state: any; };

    constructor(props: any){
        super(props);
        console.log(props);
        // console.log(props.value);
        // console.log(props.value.thumbnail.path);
        this.imgUrl = this.props.value.thumbnail.path + "/portrait_fantastic." + this.props.value.thumbnail.extension
        // console.log(this.imgUrl);
        this.newTo = {
            pathname: "/detail",
            state: this.props.value,
        }
    }
    render(){
        return(
            <div className="card">
                <img className="cardPic" src={this.imgUrl} alt="Hero Pic" />
                {/* <Link className="cardName" to={`/detail?${this.props.value.id}`}>{this.props.value.name}</Link> */}
                <Link className="cardName" to={this.newTo} >{this.props.value.name}</Link>
            </div>
        );
    }
}

export default Card