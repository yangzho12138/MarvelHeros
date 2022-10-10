import React from "react";
import { Routes, Route} from 'react-router-dom';
import NavBar from "./navbar";
import Home from "./contents/home";
import List from "./contents/list";
import Gallery from "./contents/gallery";
import Detail from "./contents/detail";

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <NavBar/>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/list' element={<List/>}></Route>
                        <Route path='/gallery' element={<Gallery/>}></Route>
                        <Route path='/detail' element={<Detail/>}></Route>
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;