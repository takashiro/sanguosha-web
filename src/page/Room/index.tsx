import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';
import DrawPile from './DrawPile';
import DiscardPile from './DiscardPile';
import WuguArea from './WuguArea';
import AnimationCanvas from './AnimationCanvas';

import GameRoom from '../../game/Room';

interface RoomProps {
	room: GameRoom;
}

function Room(props: RoomProps): JSX.Element {
	const { room } = props;
	return (
		<div className="room">
			<MainArea room={room} />
			<Dashboard dashboard={room.getDashboard()} />
			<DrawPile area={room.getDrawPile()} />
			<DiscardPile area={room.getDiscardPile()} />
			<WuguArea area={room.getWuguArea()} />
			<AnimationCanvas room={room} />
		</div>
	);
}

export default Room;
