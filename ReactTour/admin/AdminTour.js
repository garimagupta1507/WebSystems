import React from "react";
import ReactDOM from "react-dom";
import AdminTourTable from "./AdminTourTable.js";
import tours from "../tours.json";

class AdminTour extends React.Component {

     constructor(props){
     super(props);
	 this.state = {addNewDate :  null,
                  addNewName: null,
                  tours :  []}
	}

    // Renders component based on current state and props
    render()
    {
        return (<AdminTourTable />)
    }
}

export default AdminTour;
