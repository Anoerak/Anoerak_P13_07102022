import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { update } from '../../features/Users/usersApi.slice';

import Api from '../../api/Api';

import Error from '../../components/Error/Error';

import './UserAccount.css';

const UserAccount = () => {
	const dispatch = useDispatch();
	const callAPI = new Api('http://localhost:8080');

	const updateUser = (token) => {
		const firstNameValue = document.getElementById('firstName').value;
		const lastNameValue = document.getElementById('lastName').value;
		let user = {
			firstName: !firstNameValue ? userProfile.firstName : firstNameValue,
			lastName: !lastNameValue ? userProfile.lastName : lastNameValue,
		};
		callAPI.updateUserProfile(user, token).then((res) => {
			dispatch(update(res));
			window.location.reload();
		});
	};

	const [editMode, setEditMode] = useState(false);
	const handleEditMode = () => setEditMode(!editMode);
	const userProfile = useSelector((state) => state.users.userProfile);

	return (
		<>
			{userProfile.status === 200 ? (
				<main className="main bg-dark">
					<div className="header">
						{editMode ? (
							<div className="edit-wrapper">
								<h1>Welcome</h1>
								<div className="edit-input">
									<label htmlFor="firstName"></label>
									<input name="firstName" id="firstName" placeholder={userProfile.firstName}></input>
									<label htmlFor="lastName"></label>
									<input name="lastName" id="lastName" placeholder={userProfile.lastName}></input>
								</div>
								<div className="edit-buttons">
									<button
										className="valid-button"
										onClick={() => {
											updateUser(localStorage.getItem('token'));
										}}
									>
										Valider
									</button>
									<button
										className="cancel-button"
										onClick={() => {
											handleEditMode();
										}}
									>
										Annuler
									</button>
								</div>
							</div>
						) : (
							<>
								<h1>
									Welcome back
									<br />
									{userProfile.firstName} {userProfile.lastName}
								</h1>
								<button
									className="edit-button"
									onClick={() => {
										handleEditMode();
									}}
								>
									Edit Name
								</button>
							</>
						)}
					</div>
					<h2 className="sr-only">Accounts</h2>
					<section className="account">
						<div className="account-content-wrapper">
							<h3 className="account-title">Argent Bank Checking (x8349)</h3>
							<p className="account-amount">$2,082.79</p>
							<p className="account-amount-description">Available Balance</p>
						</div>
						<div className="account-content-wrapper cta">
							<button className="transaction-button">View transactions</button>
						</div>
					</section>
					<section className="account">
						<div className="account-content-wrapper">
							<h3 className="account-title">Argent Bank Savings (x6712)</h3>
							<p className="account-amount">$10,928.42</p>
							<p className="account-amount-description">Available Balance</p>
						</div>
						<div className="account-content-wrapper cta">
							<button className="transaction-button">View transactions</button>
						</div>
					</section>
					<section className="account">
						<div className="account-content-wrapper">
							<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
							<p className="account-amount">$184.30</p>
							<p className="account-amount-description">Current Balance</p>
						</div>
						<div className="account-content-wrapper cta">
							<button className="transaction-button">View transactions</button>
						</div>
					</section>
				</main>
			) : (
				<Error />
			)}
		</>
	);
};

export default UserAccount;
