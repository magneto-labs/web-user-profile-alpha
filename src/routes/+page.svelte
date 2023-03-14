<script>
	export let data;
	import { browser } from '$app/environment';

	let userAgent;
	let location;
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				location = { latitude, longitude };
				drawKakaoMap(latitude, longitude);
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
		userAgent = navigator.userAgent;
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
			<tr class="border-b border-slate-100 p-4">
				<td>IP</td>
				<td>{data.ip}</td>
			</tr>
			<tr class="border-b border-slate-100 p-4">
				<td>User Agent</td>
				<td>{userAgent}</td>
			</tr>
			<tr>
				<td>Location</td>
				<td>{JSON.stringify(location)}</td>
			</tr>
		</tbody>
	</table>
</section>

<section>
	<div class="kakao-map w-5/6 min-h-[500px]" />
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.50);
	}
</style>
