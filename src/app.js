import React from 'react';
import { connect } from 'react-redux';
import 'style/index.css';


class App extends React.Component {
    componentWillMount() {
        this.props.dispatch({
            type: 'TEST_API',
            path: 'todo.api',
        });
    }
    render() {
        return (
            <div className="App">
                <h1>Have a nice day!</h1>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.todo.api,
    };
}

export default connect(mapStateToProps)(App);
