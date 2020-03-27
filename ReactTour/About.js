import React from "react";
import ReactDOM from "react-dom";
import Whale from "./whale.jpg";

function About()
 {
        return (
          <main>
          <img src = {Whale} width={600} height={400} />
          <p>Since 1996 we’ve been providing charters out of Santa Cruz and exploring the Monterey Bay. It’s been
          our honor and our passion, it’s what we do best and why we feel so fortunate to do what we do every day.
          For this reason our customers realize pretty quickly that here in the Monterey Bay, our waters offer the
          nature viewer one of the widest ranges of marine life viewing of anywhere in the world.</p>

          <p>Our underwater canyons rival the height of the Grand Canyon in depth and is the largest such submarine
           canyon along the West Coast of the North American continent. It is the largest feeding ground between
            the tip of Baja California up to the Alaskan panhandle. Because of this beautiful anomaly, our area is
            known to be “the playground” for a vast and diverse group of marine animals.</p>
          </main>
        );
    }


export default About;
