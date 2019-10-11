<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="csrf-token" content="{{ csrf_token() }}">

		<link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,500&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Spectral:300&display=swap" rel="stylesheet">

		<link href="{{ mix('/css/app.css' ) }}" rel="stylesheet" type="text/css"/>
		<link href="https://cdn.datatables.net/v/zf/dt-1.10.20/datatables.min.css" rel="stylesheet" type="text/css"/>

		<link rel="icon" type="image/png" href="/favicon.png">

		<title>Astrolab</title>
		<meta name="description" content="Astrolab"/>
		<link rel="canonical" href="https://astrolab-parma2020.azurewebsites.net/" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="Astrolab" />
		<meta property="og:url" content="https://astrolab-parma2020.azurewebsites.net/" />
		<meta property="og:site_name" content="Astrolab" />

		<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.0.0/fabric.min.js"></script>
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

		<script type="text/javascript" src="{{ mix('js/admin/app.js') }}"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/v/zf/dt-1.10.20/datatables.min.js"></script>

	</body>
</html>
