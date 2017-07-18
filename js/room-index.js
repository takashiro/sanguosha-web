
var server = null;
var room = {
	'id' : 0,
	'uid' : 0,
	'owner_id' : 0,
	'users' : {}
};

$(()=>{
	require('lib/server', ()=>{
		server = new Server;

		server.on('open', ()=>{
			if($_GET['uid']){
				let uid = parseInt($_GET['uid'], 10);
				if(!isNaN(uid) && uid > 0){
					server.request(net.Login, {
						'uid' : uid
					});
				}
			}
		});

		server.on('close', (e)=>{
			switch(e.code){
			case 1006:
				alert('Failed to connect the server ' + server.url);
			}
		});

		require('protocol', ()=>{
			server.onmessage = BasicActions();
			if($_GET['server']){
				server.connect($_GET['server']);
			}
		});
	});

	require('gui/hp-bar');
	require('gui/photo');
	require('gui/dashboard');
	require('gui/card-list');
	require('gui/card');
	require('gui/animation');
	require('gui/dialog');

	$('#chat-send').click(()=>{
		var input = $('#chat-input');
		var message = input.val();
		input.val('');
		if(server){
			server.request(net.Speak, message);
		}
	});
});
