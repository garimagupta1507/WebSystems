import React from "react";
import ReactDOM from "react-dom";
import Whale from "./whale.jpg";

function Home()
 {
        return (
          <main>
          <img src = {Whale} width={600} height={400} />
          <p>These trips last anywhere between 3-4 hours approximately and though our main goal is finding
      			the whales, there is so much more to see and experience during your time on the Bay.  Please
      			keep in mind these safaris take place in the wild with wild animals. For that reason trips are
      			always dependent on weather conditions, seasons and animal activity.</p>
          </main>
        );
    }


export default Home;
