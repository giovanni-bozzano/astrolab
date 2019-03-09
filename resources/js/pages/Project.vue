<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	div#project-page {
		overflow: auto;
		.content-container {
		    margin-left: 40px;
		    width: 88%;
		    max-width: 700px;
		    height: auto;
		    box-sizing: border-box;
		}
		.content-description {
		    font-family: 'Spectral', serif;
		    font-size: 1.3em;
		    margin-bottom: 0.6em;
		    line-height: 140%;
		    color: #fff;
		}
		.shadow-box-bottom {
		    position: absolute;
		    background: linear-gradient(to bottom, transparent, #000 90%);
		    background-blend-mode: multiply;
		    z-index: 2;
		    width: 100%;
		    height: 140px;
		    pointer-events: none;
		    bottom: 0;
		    margin-bottom: 50px;
		}
		.shadow-box-top {
		    position: fixed;
		    background: linear-gradient(to top, transparent, #000 90%);
		    background-blend-mode: multiply;
		    z-index: 2;
		    width: 100%;
		    height: 30px;
		    pointer-events: none;
		    top: 0;
			margin-top: 0px;
		}
		.break-text {
			height: 100px;
		}
		.hidden {
			display: none;
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
	<div id="project-page" class="right-container">
	    <div class="shadow-box-top"></div>
	    <div class="shadow-box-bottom"></div>
	    <article id="content-progetto" class="content-container">
	       		<header class="content-title"><h1>Il progetto AstroLab</h1></header>
	        	<div class="content-description"><p>Il progetto AstroLab nasce dall’impegno e dalla volontà di creare una connessione viva tra la cittadinanza e quelle realtà che, attraverso la loro virtuosa attività sul territorio, rendono Parma una città attenta alla bellezza, alla cultura, alla vulnerabilità, alla diversità come fonte di ricchezza e non di paura.
	                Siamo un gruppo di studenti universitari che, nati e cresciuti a Parma, hanno ricevuto qui la loro formazione e che, pur avendo intrapreso percorsi diversi, si sono sentiti chiamati a restituire quello che la città ha dato loro. Come gruppo abbiamo deciso, per radicarci in modo concreto nel tessuto sociale della città, di presentare il progetto in collaborazione con l’Associazione di Promozione Sociale Vita Activa.<br>
	                Il progetto AstroLab nasce dall’impegno e dalla volontà di creare una connessione viva tra la cittadinanza e quelle realtà che, attraverso la loro virtuosa attività sul territorio, rendono Parma una città attenta alla bellezza, alla cultura, alla vulnerabilità, alla diversità come fonte di ricchezza e non di paura.<br>
	                Siamo un gruppo di studenti universitari che, nati e cresciuti a Parma, hanno ricevuto qui la loro formazione e che, pur avendo intrapreso percorsi diversi, si sono sentiti chiamati a restituire quello che la città ha dato loro. Come gruppo abbiamo deciso, per radicarci in modo concreto nel tessuto sociale della città, di presentare il progetto in collaborazione con l’Associazione di Promozione Sociale Vita Activa.<br>
	                Il progetto AstroLab nasce dall’impegno e dalla volontà di creare una connessione viva tra la cittadinanza e quelle realtà che, attraverso la loro virtuosa attività sul territorio, rendono Parma una città attenta alla bellezza, alla cultura, alla vulnerabilità, alla diversità come fonte di ricchezza e non di paura.<br>
	                Siamo un gruppo di studenti universitari che, nati e cresciuti a Parma, hanno ricevuto qui la loro formazione e che, pur avendo intrapreso percorsi diversi, si sono sentiti chiamati a restituire quello che la città ha dato loro. Come gruppo abbiamo deciso, per radicarci in modo concreto nel tessuto sociale della città, di presentare il progetto in collaborazione con l’Associazione di Promozione Sociale Vita Activa.</p><p class="break-text"></p></div>
	    </article>
	</div>
</template>
