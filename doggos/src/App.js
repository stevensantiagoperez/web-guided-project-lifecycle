import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';

const fetchDogs = (breed) => {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(res => res).catch(err => console.error('NOOOOO'));
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            doggos: [],
            breed: 'husky',
        }
    }

    componentDidMount() {
        console.log('component did mount');
        fetchDogs(this.state.breed)
        .then(resp => {
            this.setState({
                doggos: resp.data.message
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component Did Update running');
        console.log(prevState);
        if(prevState.doggos !== this.state.doggos){
            console.log('doggos have changed');
            if(this.state.breed === 'chihuahua'){
                console.log('awe soooo cute');
                fetchDogs('dachshund')
                .then(resp => {
                    this.setState({
                        doggos: resp.data.message,
                        breed: "dachshund",
                    })
                })
            }
        }
    }

    searchDogs = dogName => {
        console.log("search dogs")
        fetchDogs(dogName)
        .then(resp => {
            this.setState({doggos: resp.data.message, breed: dogName});
        })
    }

    render() {
        return (
            <>
                <h1>My App</h1>
                <SearchForm searchDogs={this.searchDogs} />
                {this.state.doggos.map((dog, index) => (
                <img width={"200"} src={dog} key={index} alt={dog} >

                </img>))}
            </>
        )
    }
}

export default App;