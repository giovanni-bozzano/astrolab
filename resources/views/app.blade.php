<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="Progetto AstroLab 2020" />
		<meta property="og:url" content="https://www.astrolabparma.com/" />
		<meta property="og:site_name" content="Progetto AstroLab 2020" />
		<meta name="description" content="Progetto AstroLab 2020"/>
		<meta name="theme-color" content="#000000" />
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="viewport" content="width=device-width, user-scalable=no" />

		<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,500&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Spectral:300&display=swap" rel="stylesheet">

		<link href="{{ mix('/css/app.css' ) }}" rel="stylesheet" type="text/css"/>

		<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
		<link rel="apple-touch-icon" sizes="1024x1024" href="assets/icon-maskable-7a2eb399.png">
		<link rel="manifest" href="/manifest.json" />

		<title>Progetto AstroLab 2020</title>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.0.0/fabric.min.js"></script>
		<script type="text/javascript" src="/js/sweep.min.js"></script>
		<script type='text/javascript'>
			window.Laravel = <?php echo json_encode([
				'csrfToken' => csrf_token(),
			]); ?>
		</script>
	</head>
	<body>

		<div id="app">
			<router-view></router-view>
		</div>

		<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>

	</body>
</html>
