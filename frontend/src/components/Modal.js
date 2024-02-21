import React, {Component} from "react";
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
 } from "reactstrap";


 export default class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state={
            activeItem : this.props.activeItem,
            plannerList : this.props.plannerList
        };
    }

    handleChange = (e) => {
        let{name, value} = e.target;

        if (e.target.type === 'checkbox'){
            value = e.target.checked;
        }

        const activeItem = {...this.state.activeItem, [name]: value};
        this.setState({activeItem});
    };

    fetchAPI = (api_url) => {
        fetch(api_url)
                        .then(response => {
                            if(!response.ok){
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })

                        .then(data => {
                            const item = {
                                title : this.state.activeItem.title,
                                description : this.state.activeItem.description,
                                completed : this.state.activeItem.completed,
                                loc : this.state.activeItem.loc,
                                weather : data.Headline.Text,
                                date: (data.Headline.EffectiveDate).slice(0,10)

                            }

                            this.setState({
                                activeItem: item
                            });
                        })
                        .catch(error => {
                            console.error("Error:", error)
                        });
    }

    fetchAPIreponse = (location) => {
        console.log("lets see what is this:",location)
        const api_key = ''
        const api_url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=${api_key}&language=en-us&details=false&metric=false`
        

        for(const[, value] of Object.entries(this.state.plannerList)){
            
            for(const[key1,val1] of Object.entries(value)){
                
                if(key1==='loc' && val1===this.state.activeItem.loc){
                    
                    let message = `Weather Update for location ${this.state.activeItem.loc} already present.Do you wish to fetch weather updates again?`
                    if(window.confirm(message)){                                            
                        console.log('to fetch weather updates again')
                        
                        this.fetchAPI(api_url)
                    }
                    else{
                        console.log('Do not fetch fresh data.')
                    }
                }
                else{
                    this.fetchAPI(api_url)
                }
            }
        }
    }


    render() {
        const {toggle, onSave} = this.props;

        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Planner Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for= "todo-title">Title</Label>
                            <Input
                            type="text"
                            id='todo-title'
                            name='title'
                            value={this.state.activeItem.title}
                            onChange={this.handleChange}
                            placeholder="Enter Planner Title">
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Description</Label>
                            <Input
                            type="text"
                            id="todo-description"
                            name="description"
                            value={this.state.activeItem.description}
                            onChange={this.handleChange}
                            placeholder="enter todo-description"></Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                type="checkbox"
                                name="completed"
                                checked={this.state.activeItem.completed}
                                onChange={this.handleChange}></Input>
                                Completed
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input-loc">Input Location</Label>
                            <Input
                            type="text"
                            id="input-loc"
                            name="loc"
                            value={this.state.activeItem.loc}
                            onChange={this.handleChange}
                            placeholder="enter location to retrieve info"></Input>
                        </FormGroup>
                        <Button
                        color="success"
                        onClick={() => this.fetchAPIreponse(this.state.activeItem.loc)}>
                            Fetch Location Weather
                        </Button>

                        <FormGroup>
                            <Label for="json-resp">Weather Pattern</Label>
                            <Input disabled
                            type="textarea"
                            id="weather"
                            name="weather"
                            value={this.state.activeItem.weather}
                            onChange={this.handleChange}
                            placeholder="weather pattern for location is here"></Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                    color="success"
                    onClick={()=> onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
 }