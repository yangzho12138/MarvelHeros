import axios from "axios";
import md5 from "js-md5";
import React from "react";
import { Link } from 'react-router-dom';

interface isState{
    info: any,
}

class Detail extends React.Component <any, isState>{
    preId: string;
    nextId: string;
    id: number;

    constructor(props: any){
        super(props);

        this.state = {
            info: undefined,
        }

        let url = window.location.href;
        this.id = Number(url.slice(url.lastIndexOf("/") + 1));
        // console.log(id);

        this.getInfo(this.id);

        let index = -1;
        for(let i = 0; i < results.length; i++){
            // console.log(results[i].id)
            if(results[i].id === this.id){
                index = i;
                break;
            }
        }
        
        // console.log(results[index - 1]);
        if(index === 0)
            this.preId = results[results.length - 1].id;
        else
            this.preId = results[index - 1].id;
        
        if(index === results.length - 1)
            this.nextId = results[0].id;
        else
            this.nextId = results[index + 1].id;

        // console.log(this.id, this.preId, this.nextId);
    }

    getInfo(id: number){
        let pubkey = "d43633cf8e6f0a66c5df36d617ef73f0";
        let pvtkey = "9a7abac2d407acfb5836ab928825b515f3e87d5b";
        let ts = new Date().getTime();
        
        axios({
            url:`https://gateway.marvel.com:443/v1/public/characters/${id}`,
            method: 'get',
            params:{
                // "id": id.trim(), 
                "apikey": pubkey,
                "ts": ts,
                "hash": md5(ts+pvtkey+pubkey).toString(),
            }
        }).then(
            res => {
                this.setState({info: res.data.data.results[0]})
            }
        ).catch(
            err => console.log(err)
        )
    }

    componentDidUpdate(){
        // console.log(this.state.info);
        let p = document.querySelector(".profile");
        let imgUrl = this.state.info.thumbnail.path + "/portrait_fantastic." + this.state.info.thumbnail.extension;
        if(p != null){
            p.innerHTML = `
                <img class="profile-pic" src=${imgUrl} alt="Hero Pic" />
                <div class="profile-text profile-id"> ID: ${this.state.info.id} </div>
                <div class="profile-text profile-name"> Name: ${this.state.info.name} </div>
                <p class="profile-text profile-description"> Description: ${this.state.info.description} </p>
                <a href="${this.state.info.urls[0].url}" class="profile-text profile-detail"> Official Link </a>
            `;
        }
    }

    changeInfo(id: number){
        this.getInfo(id);

        this.id = id;
        let index = -1;
        for(let i = 0; i < results.length; i++){
            if(results[i].id === this.id){
                index = i;
                break;
            }
        }
        
        if(index === 0)
            this.preId = results[results.length - 1].id;
        else
            this.preId = results[index - 1].id;
        
        if(index === results.length - 1)
            this.nextId = results[0].id;
        else
            this.nextId = results[index + 1].id;
        // console.log(this.id, this.preId, this.nextId);
    }

    render(){
        return(
            <div>
                <div className="profile-title">Hero Profile</div>
                <div className="profile"></div>
                <div className="profile-button">
                    <Link className="profile-left-button" to={`/detail/${this.preId}`} onClick={() => {this.changeInfo(Number(this.preId))}}>Prev</Link>
                    <Link className="profile-right-button" to={`/detail/${this.nextId}`} onClick={() => {this.changeInfo(Number(this.nextId))}}>Next</Link>
                </div>
            </div>
        );
    }
}

export default Detail;