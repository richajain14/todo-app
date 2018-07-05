import React, { Component } from 'react';
import Todos from './Todos';
import PageHeader from './PageHeader';

class TodoPage extends Component {
    render() {
        return (
            <div className="app">
                <PageHeader />
                <main role="main" className="container">
                    <Todos/>
                </main>
            </div>
        );
    }
}

export default TodoPage;
