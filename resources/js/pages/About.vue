<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	div#about-page {
		article {
		    margin-left: 40px;
		    width: auto;
		}
		.content {
		    position: relative;
		    display: grid;
		    grid-template-columns: repeat(auto-fit, 180px);
		    grid-template-rows: repeat(auto-fit);
		    grid-column-gap: 10px;
		    grid-row-gap: 30px;
		}
		.team-name {
		    position: relative;
		    float: left;
		    width: 100%;
		}
		.team-role {
		    position: relative;
		    float: left;
		    width: 100%;
		}
		.team-image {
		    width: 120px;
		    height: 120px;
		    margin-bottom: 10px;
		}
		footer {
		    position: relative;
		    display: block;
		    width: 80%;
		    font-family: 'IBM Plex Mono', monospace;
		    color: #fff;
		    font-size: 1.6em;
		    letter-spacing: 0.06em;
		    margin-bottom: 100px;
		    margin-top: 40px;
		}
	}
	/* Small only */
	@media screen and (max-width: 39.9375em) {
	}
	/* Medium only */
	@media screen and (min-width: 40em) and (max-width: 63.9375em) {
	}
	/* Large only */
	@media screen and (min-width: 64em) and (max-width: 74.9375em) {
	}
</style>

<template>
	<div id="about-page" class="right-container">
		<div class="shadow-box-top"></div>
		<div class="shadow-box-bottom"></div>
		<article>
			<h1>Il nostro team</h1>
			<div class="content">
				<div class="team-member">
					<img class="team-image" src="/img/about/valentina_avanzini.jpg">
					<div class="team-name"><h3>Valentina Avanzini</h3></div>
					<div class="team-role"><h4>Coordinatrice</h4></div>
				</div>
				<div class="team-member">
					<img class="team-image" src="/img/about/giulia_di_rienzo.jpg">
					<div class="team-name"><h3>Giulia Di Rienzo</h3></div>
					<div class="team-role"><h4>Public relation manager</h4></div>
				</div>
				<div class="team-member">
					<img class="team-image" src="/img/about/francesca_musiari.jpg">
					<div class="team-name"><h3>Francesca Musiari</h3></div>
					<div class="team-role"><h4>Social media manager</h4></div>
				</div>
				<div class="team-member">
					<img class="team-image" src="/img/about/giulia_grazia_napolitano.jpg">
					<div class="team-name"><h3>Giulia Grazia Napolitano</h3></div>
					<div class="team-role"><h4>Social media manager</h4></div>
				</div>
				<div class="team-member">
					<img class="team-image" src="/img/about/anna_canali.jpg">
					<div class="team-name"><h3>Anna Canali</h3></div>
					<div class="team-role"><h4>Amministrazione</h4></div>
				</div>
				<div class="team-member">
					<img class="team-image" src="/img/about/marta_borrini.jpg">
					<div class="team-name"><h3>Marta Borrini</h3></div>
					<div class="team-role"><h4>Amministrazione</h4></div>
				</div>
				<div class="team-member">
					<img class="team-image" src="/img/about/rocco_punghellini.jpg">
					<div class="team-name"><h3>Rocco Punghellini</h3></div>
					<div class="team-role"><h4>Visual Designer</h4></div>
				</div>
			</div>
			<footer>Grazie ai ragazzi dell'associazione Vita Activa, che hanno reso possibile questo progetto.</footer>
		</article>
	</div>
</template>
