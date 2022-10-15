import axios from "axios";
import md5 from "js-md5";
import React from "react";

interface isState{
    info: any,
}

class Detail extends React.Component <any, isState>{
    name: any;

    constructor(props: any){
        super(props);

        this.state = {
            info: undefined,
        }

        let url = window.location.href;
        let id = url.slice(url.lastIndexOf("/") + 1);
        console.log(id);

        this.getInfo(id);
    }

    getInfo(id: string){
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

    render(){
        return(
            <div>
                <div className="profile-title">Hero Profile</div>
                <div className="profile"></div>
            </div>
        );
    }
}

export default Detail;