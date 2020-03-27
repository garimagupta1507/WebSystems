import React from "react";
import ReactDOM from "react-dom";
class TourTable extends React.Component {


	  constructor(props) {
    super(props); // Must call
    this.state = {
			  fetchData : [],
				hasErrors : false,
        Date: "",
        Name: "",
	}
	 // this.TableHeader = this.TableHeader.bind(this);
	 this.TableData = this.TableData.bind(this);
	 this.addNewName = this.addNewName.bind(this);
	 this.addNewDate = this.addNewDate.bind(this);

  }



 addNewName(element){
        this.setState({
            Name: element.target.value
        })
    }

 addNewDate(element){
        this.setState({
            Date: element.target.value
        })
    }

		componentDidMount() {
	    fetch("/tours")
	      .then(res => res.json())
	      .then(resData => {
	        this.setState({ fetchData: resData });
	      })
	  }

		// componentDidMount() {
		// 	let that = this;
		// 	fetch("/tours")
		// 		.then(function(response){
		// 					if(response.ok){
		// 							return response.json();
		// 					} else{
		// 							let info =`Status Code: ${response.status}, ${response.statusText}`;
		// 							console.log('response ',response);
		// 							return Promise.reject(info);
		// 					}
		// 			})
		// 			.then(function(tours){
		// 					that.setState({
		// 							isLoaded:true,
		// 							tours:tours
		// 					});
		// 					console.log('tours ',tours);
		// 			})
		// 			.catch(function(msg){
		// 					console.log("Something bad "+msg);
		// 			})
		// }
		// addData() {
	  // const copyTours = Object.assign([],this.state.tours);
	  // console.log('copyTours ',copyTours);
	 	//  copyTours.push({
	  //      Name: this.state.Name,
	  //      Date: this.state.Date
	  //        })
	  //   this.setState({tours: copyTours});
	  // }
		addData() {
			fetch('/tours/add', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"Name": this.state.Name,
					"Date": this.state.Date
				})
			}).then((response) => {
				console.log("response: ", response);
			}).then((data) => {
				console.log(data);
			}).catch(function (error) {
				console.log("Error while adding tour...", error);
			});
}

// delChoice(i) {
//   let upChoices = this.state.dates.filter(function(place, index){
//     if(index === i)
//       return false;
//     else
//       return true;
//   })
//   this.setState({dates: upChoices});
// }

  deleteData(i) {
    const updatedToursdata = this.state.fetchData;
    let deleteTour;
    deleteTour = updatedToursdata[i];
    fetch("/tours/delete/" + deleteTour._id, {
      method: 'DELETE'
    }).then((response) => {
      console.log("response:", response);
    }).then((data) => {
      updatedToursdata.splice(i, 1);
    })

    // updatedToursdata.splice(index, 1);
    this.setState({
      toursData: updatedToursdata,
    })

  }



 TableData() {
	  let that = this;
      return this.state.fetchData.map((place, index) => {
         return (
            <tr>
               <td><button className = "b" onClick={that.deleteData.bind(that, index)}>Delete</button></td>
               <td>{place.Name}</td>
			   <td>{place.Date}</td>
            </tr>
         )
      })
   }




  render(){
  return (
	  <div className = "TableHead">
	  <div >
	  <p> Add Tour </p>
	  <label>Name</label>
	  &nbsp;&nbsp;&nbsp;<input type="text" name="name" onChange= {this.addNewName.bind(this)}/><br/>
	  <label>Date</label>
	  &nbsp;&nbsp;&nbsp;<input type="text" name="date" onChange= {this.addNewDate.bind(this)}/><br/>
	  <button className = "btn" onClick={this.addData.bind(this)}>Add</button>

	  </div>
	   	<h3>Whale Watching Tours :</h3>
      	<table>
     <thead>

		<th>  </th>
		 <th>NAME </th>
			 <th>DATE</th>
      </thead>
	  <tbody>
      {this.TableData()}
      </tbody>
      </table>
	  </div>
  );
}

}
export default TourTable;
