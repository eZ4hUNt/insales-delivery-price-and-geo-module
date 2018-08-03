/****************************************/
/*				Гео модуль 				*/
/****************************************/
   
/* Другие скрипты для гео-модуля */
  // Склонение слов по падежам
  function declOfNum(number, titles) {
      cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }
   
  // Обновление цен
  	function updPrices(){
      if($('.js-geo-main').data('geo-main')){
 		$geoPopularMain = $('.js-geo-main').data('geo-main').split('|');
  		checkDelivery($geoPopularMain[0], $geoPopularMain[1], $geoPopularMain[2]);
      }
    }
   
/* Модальное окно авторизации */
		$(document).ready(function() {
          	$(".js-modal-auth").click(function(e){
              	e.preventDefault();
				$(".js-modal-auth").fancybox();
            });
		});
   
/* Модальное окно Гео-привязки */
	$(document).ready(function() {
      var winboxShow = false;
      var winboxObject;
      var winboxType;
      var winboxIsQuickview = false;
      var cart_type;
      if(cart_type == 'extended'){
          var winboxTriggers = '.winbox, .cart-add';
      }else{
          var winboxTriggers = '.winbox';
      }
      
      $('body').on('click', '.winbox', function(e){
          e.preventDefault();
          winboxObject = $(this);
          winboxObjectProductTitle = winboxObject.data('product-title');
          winboxObjectVariantId = winboxObject.data('variant-id');
          winboxObjectVariantPrice = winboxObject.data('variant-price');
          winboxObjectVariantImage = winboxObject.data('variant-image');
          winboxObjectProductId = winboxObject.data('product-id');
          if(winboxObject.hasClass('cart-add')){
              winboxType = 'cart';
          }else{
              winboxType = winboxObject.data('window').split('|')[0];
          }
          if(winboxShow){
              if(quickviewCurrent != '' && (winboxObject.data('window') == 'request' || winboxObject.data('window') == 'quickorder')){
                  winboxIsQuickview = true;
              }
              if($('.window').hasClass('window-type-menu')){
                  $('.window').addClass('window-tohide-menu');
              }
              $('.window').addClass('window-tohide').animate({left: 0}, 200, function(){

                  $('.window').attr('class', 'window window-tohide window-type-'+winboxType);
                  $('.window-content').remove();
                  winboxData(winboxObject);
                  if(winboxType != 'quickview' && winboxType != 'cart'){
                      $('.window').animate({left: 0}, 200, function(){
                          $('.window').removeClass('window-tohide');
                      });
                  }
                  winboxShow = true;
              });
          }else{
              $('body').append('<div class="window window-tohide window-type-'+winboxType+'"><div class="window-height"></div><div class="window-data"><span class="window-close js-window-close"><i class="fancybox-item fancybox-close"></i></span></div><div class="window-fake-shade window-close js-window-close"></div></div><div class="window-shade"></div>');
              $('body').css('padding-right',window.innerWidth-document.body.clientWidth).css('overflow','hidden');
              winboxData(winboxObject);
              $('.window-shade').fadeIn(200);
              if(winboxType != 'quickview' && winboxType != 'cart'){
                  $('.window').animate({left: 0}, 200, function(){
                      $('.window').removeClass('window-tohide');
                  });
              }
              winboxShow = true;
          }
      });
      $('body').on('click', '.js-window-close', function(e){
          e.preventDefault();
          if(winboxIsQuickview){
              quickviewCurrent.trigger('click');
              winboxIsQuickview = false;
              quickviewCurrent = '';
          }else{
              $('.window').addClass('window-tohide');
              $('.window-shade').fadeOut(200,function(){
                  $('body').css('padding-right',0).css('overflow','auto');
                  $('.window-shade').remove();
                  $('.window').remove();
                  winboxShow = false;
              });
          }
          geoIsUpdate = true;
      });
      var windowContent;
      var wbWindow;
      var wbLogin;
      var wbQuickorder;
      var wbTextTitle = '';
      var wbTextContent = '';
      var quickviewProductsId = new Array();
      var quickviewCurrent = '';
      function winboxData(obj){
          $geoType = '';
        	
          if(obj.hasClass('cart-add')){
              wbWindow = 'cart';
          }else{
              wbWindow = obj.data('window').split('|')[0];
          }
          $('.window-data').append('<div class="window-content window-obj-'+wbWindow+'"></div>');
          switch(wbWindow){
			case 'geo':
				//GEO
				$geoType = obj.data('window').split('|')[1];
				windowContent = '';
				switch($geoType){
					case 'geoTerm':
						windowContent += '<p class="window-title"><span class="geo-city-short js-geo-city-short"></span><a href="'+geoDeliveryPageUrl+'" class="button button-bordered winbox" data-window="geo|geoCity">Изменить</a></p>';
						windowContent += '<p class="window-description">Измените город если он неверный или не определился.</p>';
						windowContent += '<div class="js-geo-data geo-data" data-modules="table"></div>';
						windowContent += '<p><a href="'+geoDeliveryPageUrl+'" class="button">Подробнее о доставке и оплате</a></p>';
						break;
					case 'geoCity':
                    	windowContent += '<p class="window-title"><span class="geo-city-short js-geo-city-short"></span><a href="'+geoDeliveryPageUrl+'" class="button button-bordered winbox" data-window="geo|geoTerm">Способы доставки и оплаты</a></p>';
						windowContent += '<p class="window-description">Измените город если он неверный или не определился.</p>';
						windowContent += '<div class="js-geo-data geo-data" data-modules="countries|search|populars"></div>';
						break;
					default:
						//
				}
				break;
			case 'geoMap':
				//GEO Map
				windowContent = '';
				windowContent += '<p class="window-title">Пункты выдачи</p>';
				windowContent += '<div class="js-geo-map geo-map"></div>';
				break;
          }
          if(wbWindow != 'quickview'){
              $('.window-content').append(windowContent);
          }
          if(wbWindow == 'geo'){
              geoIsUpdate = false;
              checkGeo();
          }
          if(wbWindow == 'geoMap'){
              geoIsUpdate = false;
              checkGeoMap();
          }
      }
  });