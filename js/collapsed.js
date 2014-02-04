define(['jquery'], function($) {
	/**
	 * Objet contenant le fonctionnement des groupes de cases a coches
	 * quand il y a plusieurs niveaux
	 * @param el : Element DOM sur lequel agira notre objet
	 * @param isOpen : Booléen, sert à forcer l'ouverture de toutes les fonctions parentes
	 * @constructor
	 */
	function CollapseSearch (el, isOpen) {
		this.el = $(el);
		this.isOpen = isOpen || false;

		this._init();
	}

	CollapseSearch.prototype = {
		//
		constructor: CollapseSearch
		, isShow: false
		, isChecked: false // Etat initial de la checkbox de l'element parent
		/**
		 * Initialise la creation et le gestionaire d'evenement de notre objet
		 */
		, _init: function () {
			var self = this;

			self._create();

			self.el.find('.icon-container-collapse').addClass('icon-collapsed-search');

			var $grandParent = self.el.parents('fieldset');

			if ($grandParent.find('.collapsed-search').length <= 2 ) {
				self.isOpen = true;
			}

			if (self.el.find('input:checkbox:checked').length > 0 || self.isOpen === true) {

				self.show();

				var
						totalEl = self.getNbTotalEl( self.el.children('ul') )
						, totalCheckedEl = self.getNbTotalElChecked( self.el.children('ul') )
						;

				// Si au moins un enfant est coche mais pas tous
				if ( totalCheckedEl > 0 && totalCheckedEl < totalEl ) {

					self.el
							.find('.icon-container-collapse')
							.removeClass('icon-unfolded-search')
							.addClass('icon-unfolded-search-checked');

				} else {
					self.el
							.find('.icon-container-collapse')
							.removeClass('icon-unfolded-search-checked')
							.addClass('icon-unfolded-search');
				}
			}

			if (self.el.find('label:first :checkbox').prop("checked")) {
				self.isChecked = true;
			}

			// Affichage des sous elements
			self.el.children('span').on('click',function(){
				self.toggle();

				var
						totalEl = self.getNbTotalEl( self.el.children('ul') )
						, totalCheckedEl = self.getNbTotalElChecked( self.el.children('ul') )
						;

				if ( !self.isShow ) { // Si le parent est ferme

					// Si au moins un enfant est coche mais pas tous
					if ( totalCheckedEl > 0 && totalCheckedEl < totalEl ) {
						self.el
								.find('.icon-container-collapse')
								.removeClass('icon-unfolded-search')
								.removeClass('icon-collapsed-search')
								.addClass('icon-collapsed-search-checked');
					}
				} else { // Si le parent est ouvert

					// Si au moins un enfant est coche mais pas tous
					if ( totalCheckedEl > 0 && totalCheckedEl < totalEl ) {
						self.el
								.find('.icon-container-collapse')
								.removeClass('icon-collapsed-search-checked')
								.removeClass('icon-unfolded-search')
								.addClass('icon-unfolded-search-checked');
					}
				}

			});
			// Comportement lors du click sur l'element pere
			self.el
					.find('label:first :checkbox')
					.on('click', function(e){

						if ( !self.isShow ) self.show();

						// Si le parent est coche
						if ( !self.isChecked ) {
							$(this).prop('checked',true);
							$(this).closest('li')
									.find(':checkbox')
									.prop('checked',true);
							self.isChecked = true;
						}
						else {
							$(this).prop('checked',false);
							$(this).closest('li')
									.find(':checkbox')
									.prop('checked',false);
							self.isChecked = false;
						}

						var
								totalEl = self.getNbTotalEl( self.el.children('ul') )
								, totalCheckedEl = self.getNbTotalElChecked( self.el.children('ul') )
								;

						// Si tous les enfants sont coches ou aucun
						if (totalEl == totalCheckedEl || totalCheckedEl == 0)	{
							self.el
									.find('.icon-container-collapse')
									.removeClass('icon-collapsed-search-checked')
									.removeClass('icon-unfolded-search-checked')
									.addClass('icon-unfolded-search');
						}
						$('body').trigger('updateNbOffres');

					});
			// Comportement lors du click sur un element fils (on desactive le pere sauf si tous les fils sont coches)
			self.el
					.children('ul')
					.find(':checkbox')
					.on('click', function(e){

						var
								totalEl = self.getNbTotalEl( self.el.children('ul') )
								, totalCheckedEl = self.getNbTotalElChecked( self.el.children('ul') )
								;

						// Si tous les enfants sont coches
						if (totalEl == totalCheckedEl) {
							self.el
									.find('label:first :checkbox')
									.prop('checked', true);
						} else {
							self.el
									.find('label:first :checkbox')
									.prop('checked', false);
						}
						// Si au moins un enfant est coche mais pas tous
						if (totalCheckedEl > 0 && totalCheckedEl < totalEl)	{
							self.el
									.find('.icon-container-collapse')
									.removeClass('icon-unfolded-search')
									.addClass('icon-unfolded-search-checked');
						} else {
							self.el
									.find('.icon-container-collapse')
									.removeClass('icon-unfolded-search-checked')
									.addClass('icon-unfolded-search');
						}
						$('body').trigger('updateNbOffres');
					});

		}
		/**
		 * Creation des prerequis avant initialisation
		 */
		, _create: function () {
			var self = this;

			if (self.el.children('ul').length > 0) {
				self.el.prepend('<span class="icon-container-collapse"></span>');
			}

		}
		/**
		 * Retourne le nombre d'enfant de l'element
		 */
		, getNbTotalEl: function(el) {
			return el.find('input:checkbox').length;
		}
		/**
		 * Retourne le nombre d'enfant coche de l'element
		 */
		, getNbTotalElChecked: function(el) {
			return el.find('input:checkbox:checked').length;
		}
		/**
		 * Ouverture - fermeture de l'element parent
		 */
		, toggle: function () {
			( !this.isShow ) ? this.show() : this.hide();
		}
		/**
		 * Affichage des sous-elements et changement de l'icone
		 */
		, show: function () {
			var self = this;
			self.el.children('ul').show();
			self.el
					.children('.icon-container-collapse')
					.removeClass('icon-collapsed-search')
					.removeClass('icon-unfolded-search-checked')
					.addClass('icon-unfolded-search');
			self.isShow = true;
		}
		/**
		 * masquage des sous-elements et changement de l'icone
		 */
		, hide: function () {
			var self = this;
			self.el.children('ul').hide();
			self.el
					.children('.icon-container-collapse')
					.removeClass('icon-unfolded-search')
					.removeClass('icon-unfolded-search-checked')
					.addClass('icon-collapsed-search');
			self.isShow = false;
		}

	};

	/**
	 * Encapsulation de l'objet CollapseSearch dans un plugin jQuery
	 * pour pouvoir l'appeler comme methode de l'objet jQuery
	 * @returns {*}
	 */
	$.fn.collapseSearch = function(isOpen){
		return this.each(
				function(){
					return new CollapseSearch(this, isOpen);
				}

		);
	};

});