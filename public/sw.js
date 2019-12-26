addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

addEventListener('fetch', event => {
	if (event.request.mode === 'navigate') {
		event.respondWith((async () => {
			try {
				let preloadResponse = await event.preloadResponse;
				if (preloadResponse) {
					return preloadResponse;
				}
				let networkResponse = await fetch(event.request);
				return networkResponse;
			} catch (error) {
				let modifiedHeaders = new Headers()
				modifiedHeaders.set('Content-Type', 'text/html')
				modifiedHeaders.append('Pragma', 'no-cache')
				return new Response(page, {
					headers: modifiedHeaders
				})
			}
		})());
	}
});

let page = `
<!doctype html>
<title>Site Maintenance</title>
<style>
	body { 
		text-align: center; 
		padding: 150px; 
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
	}
	.content {
		background-color: rgba(255, 255, 255, 0.75); 
		background-size: 100%;      
		color: inherit;
		padding-top: 1px;
		padding-bottom: 10px;
		padding-left: 100px;
		padding-right: 100px;
		border-radius: 15px;        
	}
	h1 { font-size: 40pt;}
	body { font: 20px Helvetica, sans-serif; color: #333; }
	article { display: block; text-align: left; width: 75%; margin: 0 auto; }
</style>
<article>
	<div class="background">
		<div class="content">
			<h1>AstroLab is currently offline!</h1>        
		</div>
	</div>
</article>
`;