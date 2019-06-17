import React, { Component } from 'react';

class Fib extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seenIndexes: [],
            values: {},
            index: '',
        };
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    fetchValues = async () => {
        const values = await fetch('/api/values/current').then(res => res.json());
        this.setState({ values: values });
    }

    fetchIndexes = async () => {
        const seenIndexes = await fetch('/api/values/all').then(res => res.json());
        this.setState({ seenIndexes: seenIndexes });
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();

        await fetch('/api/values', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',    
            },
            body: JSON.stringify({ index: this.state.index }),
        });

        this.setState({
            index: '',
        });
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key}, I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        type="text"
                        value={this.state.index}
                        onChange={evt => this.setState({ index: evt.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;
