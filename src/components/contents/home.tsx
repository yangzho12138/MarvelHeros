import React from "react";

interface isState{
    counter: number,
}

class Home extends React.Component <any, isState>{
    slideNum: number;
    timerID!: NodeJS.Timer;
    
    constructor(props: any){
        super(props);
        this.state = {
            counter: 0,
        }
        this.slideNum = 1;
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentDidUpdate(){
        this.changePic();
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState((state, props) => ({
            counter: state.counter + 1
        }));
    }


    changePic = () => {
        //console.log(this.state.counter);
        let pic1 = document.querySelector(".p1");
        let pic2 = document.querySelector(".p2");
        let pic3 = document.querySelector(".p3");
        const pics = [pic1, pic2, pic3];
        if(this.state.counter % 3 === 0){
            let win = pics[this.slideNum];
            if(win !== null){
                win.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                })
            }
           this.slideNum = (this.slideNum + 1) % 3;
        }

    }
    render(){
        return(
            <div>
                <div className="board">
                    <div className="pic p1"></div>
                    <div className="pic p2"></div>
                    <div className="pic p3"></div>
                </div>
                <div className="footer">@Made By: Yang Zhou (yz96@illinois.edu)</div>
            </div>
        );
    }
}

export default Home