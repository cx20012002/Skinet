import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";

function Home() {
    return (
        <Carousel>
            <div>
                <img alt="" src="https://localhost:5001/images/hero1.jpg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img alt="" src="https://localhost:5001/images/hero2.jpg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img alt="" src="https://localhost:5001/images/hero3.jpg" />
                <p className="legend">Legend 1</p>
            </div>
        </Carousel>
    )
}

export default Home;