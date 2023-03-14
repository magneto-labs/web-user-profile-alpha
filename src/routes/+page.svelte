<script>
	export let data;
	import { browser } from '$app/environment';

	let userAgent;
	let osPlatform;
	let location;
	let graphic;

	const retrieveUserAgent = () => {
		return window.navigator.userAgent ?? window.navigator.vendor ?? window.opera;
	};

	const findOSPlatform = (ua) => {
		var ret;
		const ua2 = ua.toLowerCase();
		if (/iphone|ipad|ipod/i.test(ua2)) {
			ret = 'iOS';
		} else if (/android/i.test(ua2)) {
			ret = 'Android';
		} else {
			ret = 'Else';
		}
		return ret;
	};

	const retrieveGraphicInfo = () => {
		// chrome://gpu
		var canvas = document.createElement('canvas');
		var gl = canvas.getContext('webgl');
		var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
		var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
		return renderer;
	};

	const getLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				location = { latitude, longitude };
				drawKakaoMap(latitude, longitude);

				fetch('/atlas', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						...data,
						...location,
						userAgent,
						graphic
					})
				});
			});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};

	const drawKakaoMap = (latitude, longitude) => {
		const kakao_map_container = document.querySelector('.kakao-map');
		var kakao_map = new kakao.maps.Map(kakao_map_container, {
			center: new kakao.maps.LatLng(latitude, longitude),
			level: 3 //지도의 레벨(확대, 축소 정도)
		});
		var markerPosition = new kakao.maps.LatLng(latitude, longitude);
		var marker = new kakao.maps.Marker({ position: markerPosition });
		marker.setMap(kakao_map);
	};

	if (browser) {
		userAgent = retrieveUserAgent();
		osPlatform = findOSPlatform(userAgent);
		graphic = retrieveGraphicInfo();
		location = getLocation();
	}
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=301ebd5dd959f1581c22a470771d4c77"
	></script>
	<script
		type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=301ebd5dd959f1581c22a470771d4c77&libraries=clusterer,drawing"
	></script>
</svelte:head>

<h1 class="text-4xl p-6 font-bold">웹 사용자 프로필 정보확인</h1>

<section>
	<table class="table-auto rounded-2xl border border-slate-100 mx-6 my-8">
		<thead>
			<tr class="border-b">
				<th />
				<th />
			</tr>
		</thead>
		<tbody>
			<tr class="row">
				<td>IP</td>
				<td>{data.ip}</td>
			</tr>
			<tr class="row">
				<td>IP Provider</td>
				<td>{`${data.org} (${data.postal})`}</td>
			</tr>
			<tr class="row">
				<td>User Agent</td>
				<td>{userAgent}</td>
			</tr>
			<tr class="row">
				<td>OS/Platform</td>
				<td>{osPlatform}</td>
			</tr>
			<tr class="row">
				<td>Graphic</td>
				<td>{graphic}</td>
			</tr>
			<tr class="row">
				<td>Location</td>
				<td>{JSON.stringify(location)}</td>
			</tr>
		</tbody>
	</table>
</section>

<section>
	<div class="flex px-6 justify-content">
		<div class="kakao-map w-full min-h-[500px]" />
	</div>
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.50);
	}
</style>
