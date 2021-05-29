import React from 'react';

import StartScene from './page/StartScene';
import Lobby from './page/Lobby';
import GeneralSelector from './page/GeneralSelector';
import Room from './page/Room';

import Page from './Page';
import PageLoader from './PageLoader';

import './global.scss';

export default class App extends React.Component<{}, PageLoader> {
	constructor(props: {}) {
		super(props);

		this.state = {
			page: Page.StartScene,
		};
	}

	handlePageLoad = (loader: PageLoader): void => {
		this.setState(loader);
	}

	render(): JSX.Element {
		const {
			page,
			client,
			userId,
			roomId,
			room,
		} = this.state;

		switch (page) {
		case Page.StartScene:
			return <StartScene onPageLoad={this.handlePageLoad} />;

		case Page.Lobby:
			if (client) {
				return <Lobby onPageLoad={this.handlePageLoad} client={client} />;
			}
			break;

		case Page.GeneralSelector:
			if (roomId && userId && client) {
				return (
					<GeneralSelector
						onPageLoad={this.handlePageLoad}
						roomId={roomId}
						userId={userId}
						client={client}
					/>
				);
			}
			break;

		case Page.Room:
			if (room) {
				return <Room room={room} />;
			}
			break;

		default:
			break;
		}

		return <div>Invalid app state.</div>;
	}
}
