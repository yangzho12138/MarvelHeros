import React from "react";


class Detail extends React.Component <any>{
    name: any;
    constructor(props: any){
        super(props);
        
        
        console.log(props.location);

        // let url = window.location.href;
        // let id = url.slice(url.indexOf("?") + 1);
        // let pubkey = "d43633cf8e6f0a66c5df36d617ef73f0";
        // let pvtkey = "9a7abac2d407acfb5836ab928825b515f3e87d5b";
        // let ts = new Date().getTime();
        
        // axios({
        //     url:'https://gateway.marvel.com:443/v1/public/characters',
        //     method: 'get',
        //     params:{
        //         "id": id, 
        //         "apikey": pubkey,
        //         "ts": ts,
        //         "hash": md5(ts+pvtkey+pubkey).toString(),
        //     }
        // }).then(
        //     res => {
        //         this.name = res.data.data.results[0].name;
        //     }
        // ).catch(
        //     err => console.log(err)
        // )
    }

    render(){
        return(
            <div>
                <h1>Welcome</h1>
                <h1>{this.name}</h1>
            </div>
        );
    }
}

export default Detail;