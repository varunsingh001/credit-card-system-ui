import React, { Component } from 'react';
import './display.css';

class DisplayCards extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cards: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:5555/api/v1/getAll')
		.then(response => response.json())
		.then(data => this.setState({
			cards: data
		}))
	}


  render() {
    return (
      <div className="display-cards">
        <header className="card-header">
          Existing Cards
        </header>

				{this.state.cards.length > 0 ?
					<table className="card-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Card Number</th>
								<th>Balance</th>
								<th>Limit</th>
							</tr>
						</thead>

						<tbody>
							{this.state.cards.map(entry => (
								<tr key={entry.id}>
									<td>{entry.name}</td>
									<td>{entry.cardNumber}</td>
									<td
										className={entry.amount > 0 ? '' : 'negative-balance'}
									>£{entry.amount}</td>
									<td>£{entry.accountLimit}</td>
								</tr>
							))}
						</tbody>
					</table> :
					null
				}
      </div>
    );
  }
}

export default DisplayCards;
