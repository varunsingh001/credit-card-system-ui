import React, { Component } from 'react';
import './card.css';

class AddCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: 0,
			accountLimit: '',
			name: '',
			cardNumber: '',
			emptyFieldError: false,
			updateFailureError: false,
		};

		this.submitForm = this.submitForm.bind(this);
		this.validateFields = this.validateFields.bind(this);
	}

	validateFields() {
    let isValid = true;
		const data = Object.assign({}, this.state);

		delete data.emptyFieldError;
		delete data.updateFailureError;

		isValid = Boolean(isValid && data.accountLimit && !isNaN(Number(data.accountLimit)));
		isValid = Boolean(isValid && data.cardNumber && !isNaN(Number(data.cardNumber)) && data.cardNumber.length <= 19);
		isValid = Boolean(isValid && data.name);

		if (isValid) {
			data.accountLimit = Number(data.accountLimit);
			data.cardNumber = Number(data.cardNumber);
			return data;
		}

		return null;
	}

	submitForm() {
		const data = this.validateFields();

		this.setState({
			emptyFieldError: false,
			updateFailureError: false,
		});

		if (data) {
			fetch('http://localhost:5555/api/v1/add', {
				method: 'PUT',
				body: JSON.stringify(data),
				 headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
			})
			.then(response => {
				if (response.status === 200 || response.status === 201) {
					return {};
				}

				return response.json();
			})
			.then(resp => {
				console.log(resp);
				if (resp.error) {
					this.setState({
						updateFailureError: true,
						error: resp.message
					});
				} else {
					this.setState({
						updateFailureError: false
					});
				}
			});

			this.setState({
				amount: 0,
				accountLimit: '',
				name: '',
				cardNumber: '',
				emptyFieldError: false
			});
		} else {
			this.setState({
				emptyFieldError: true
			});
		}
	}

	updateField(event, name) {
		const value = event.target.value;

		this.setState({
			[name]: value
		});
	}

  render() {
    return (
      <div className="add-card">
        <header className="card-header">
          Add
        </header>

				<div className="form-div">
					{this.state.emptyFieldError ?
						<p className="form-error">Make sure that all fields are filled with correct data</p> :
						null
					}

					<label className="form-label">Name</label>
					<input
						className="form-input"
						onChange={(evt) => this.updateField(evt, 'name')}
						value={this.state.name}
					/>

					<label className="form-label">Card number</label>
					<input
						className="form-input"
						maxLength={19}
						onChange={(evt) => this.updateField(evt, 'cardNumber')}
						type="number"
						value={this.state.cardNumber}
					/>

					<label className="form-label">Limit</label>
					<input
						className="form-input"
						onChange={(evt) => this.updateField(evt, 'accountLimit')}
						type="number"
						value={this.state.accountLimit}
					/>

					<button
						className="form-button"
						onClick={this.submitForm}
					>
						Add
					</button>

					{this.state.updateFailureError ?
						<p className="form-error">Unable to update the details - {this.state.error}</p> :
						null
					}
				</div>
      </div>
    );
  }
}

export default AddCard;
