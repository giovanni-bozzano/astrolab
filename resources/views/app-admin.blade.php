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

		<link href="{{ mix('css/app.css' ) }}" rel="stylesheet" type="text/css"/>
		<link href="https://cdn.datatables.net/v/zf/dt-1.10.20/datatables.min.css" rel="stylesheet" type="text/css"/>

		<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link rel="apple-touch-icon" sizes="1024x1024" href="/icon-maskable.png">
		<link rel="manifest" href="/manifest.json" />

		<title>Progetto AstroLab 2020</title>
	</head>
	<body>

		<div id="app">
			<router-view></router-view>
		</div>

		<script type="text/javascript">
			window.Laravel = <?php echo json_encode([
				'csrfToken' => csrf_token(),
			]); ?>
		</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.0.0/fabric.min.js"></script>
		<script type="text/javascript" src="{{ mix('js/admin/app.js') }}"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/v/zf/dt-1.10.20/datatables.min.js"></script>
		<script type="text/javascript">
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('/sw.js');
			}
		</script>
		<noscript>AstroLab is not available without javascript.</noscript>

	</body>
</html>