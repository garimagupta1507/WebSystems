import React from "react";



class Tour extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            hasErrors: false,
            tours: []
    };
    }

  componentDidMount() {
    let that = this;
    fetch("/tours")
      .then(function(response){
            if(response.ok){
                return response.json();
            } else{
                let info =`Status Code: ${response.status}, ${response.statusText}`;
                console.log('response ',response);
                return Promise.reject(info);
            }
        })
        .then(function(tours){
            that.setState({
                isLoaded:true,
                tours:tours
            });
            console.log('tours ',tours);
        })
        .catch(function(msg){
            console.log("Something bad "+msg);
        })
  }

    body() {
      return this.state.tours.map((tour, index) => {
         return (
            <tr>
               <td>{tour.Name}</td>
               <td>{tour.Date}</td>
            </tr>
         )
      })
}


  render() {
      return( <div>
             <main className ="tour">
                <h3>Virtual Tours:</h3>
             <table>
             <thead>
             <tr>
             <th>Name</th>
             <th>Date</th>
             </tr>
             </thead>
             <tbody>
             {this.body()}
             </tbody>
             </table>

    </main>
    </div>
    );
  }
}

export default Tour;
