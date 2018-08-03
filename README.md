# Модуль расчета доставки с помощью "Яндекс Доставка" и Geo-Модуль для InSales
Модуль состоит из вдух частей:
1. Geo-Модуль - выбор пользователем города, с которым в дальнейшем можна работать внути магазина
![Гео-модуль для InSales (Preview #1)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%231.jpg)
![Гео-модуль для InSales (Preview #2)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%232.jpg)

2. Модуль расчета доставки для карточки товара на основе приложения "Яндекс Доставка"
![Модуль расчета доставки с помощью "Яндекс Доставка" для InSales (Preview #3)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%233.jpg)
![Модуль расчета доставки с помощью "Яндекс Доставка" для InSales (Preview #4)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%236.jpg)

## Инструкция по установке
1. Добавляем в настройки темы
```
	<fieldset>
		<legend>ГЕО модуль</legend>
		<table>
			<tr>
				<td><label for="geo_active">Включить</label></td>
				<td><input name="geo_active" id="geo_active" type="checkbox"></td>
			</tr>
			<tr>
				<td><label for="header_geo">Показывать в шапке</label></td>
				<td><input name="header_geo" id="header_geo" type="checkbox"></td>
			</tr>
			<tr>
				<td><label for="header_geo_popup">Спрашивать при первом заходе правильно ли определен город</label></td>
				<td><input name="header_geo_popup" id="header_geo_popup" type="checkbox"></td>
			</tr>
			<tr>
				<td><label for="product_geo">Показывать в карточке товара</label></td>
				<td><input name="product_geo" id="product_geo" type="checkbox"></td>
			</tr>
			<tr>
				<td><label for="geo_url">URL страницы доставки</label></td>
				<td><input name="geo_url" id="geo_url"></td>
			</tr>
		</table>
	</fieldset>
  ```

  2. Добавляем в шапку
  ```
    {% if settings.geo_active and settings.header_geo %}
      <script>
        var geo_active = {% if settings.geo_active %}true{% else %}false{% endif %};
      </script>
      <div class="geo-city-header pull-left">
	    <div class="geo-city js-geo-city">Ваш город: </div>
		{% if settings.header_geo_popup %}
	      <div id="minigeo" class="minigeo header-icons-item-popup js-minigeo">
			<div class="header-icons-item-popup-content">
			  <p><span class="js-geo-city-popup">Город доставки ваших покупок<br><strong>&hellip;</strong>?</span></p>
			  <div class="minigeo_buttons">
				  <button class="button button-block button-accept js-minigeo-toggle">Да, все верно</button>
				  <button class="button button-block button-bordered winbox" data-window="geo|geoCity">Нет, сменить город</button>
			  </div>
			</div>
		  </div>
		{% endif %}
	  </div>
	{% endif %}
```
2.1 Подключаем 
```
	<script>
		var geo_url = '{{ settings.geo_url }}';
		var account_phone = "{{ account.phone }}";
	</script>
```
2.2 Добавить в карточку товара
```
	{% if settings.product_geo == '1' %}
	  <script>ProductJSON = {{ product | json }};</script>
	  <div class="prod_properties">
		<div class="geo-mini-title js-geo-city"></div>
		<div class="geo-search" style="">
		  <input type="text" placeholder="Укажите населенный пункт" class="js-geo-search input-medium" value="Тюмень">
		  <ul class="geo-search-results js-geo-search-results" style="display: none;"></ul>
		</div>
		<ul class="geo-mini-table"></ul>
	  </div>
	  <div class="js-product-dimensions" data-product-dimensions="{{ product.dimensions.width }}x{{ product.dimensions.depth }}x{{ product.dimensions.height }}"></div>
	{% endif %}
```
3. Подключаем modul-geo.js
4. Подключаем modul-geo.css
5. Подключаем стили из файла styles.css
6. Подключаем скрипт из файла script.js
7. Устанавливаем модуль "Яндекс Доставка" https://www.insales.ru/collection/apps/product/yandex-dostavka
8. Настраиваем аккаунт в личном кабинете "Яндекс Доставка" и получаем ключи доступа
9. Настраиваем модуль, указывая ключи, полученные в личном кабинете "Яндекс Доставка"
![Модуль расчета доставки с помощью "Яндекс Доставка" для InSales (Preview #5)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%235.jpg)
![Модуль расчета доставки с помощью "Яндекс Доставка" для InSales (Preview #6)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%236.jpg)
10. В скрипте *"modul-geo.js"* меняем *insales_id* в массиве *SiteDelivery => ydelivery => pickup => url*. Получить значение можно в настройках способов доставки, "Яндекс Доставка".
![Модуль расчета доставки с помощью "Яндекс Доставка" для InSales (Preview #7)](https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/blob/master/preview%20%237.jpg)

## Дополнительные настройки
1. Модуль учитывает вес и габариты товара. Если они не настроены, то исользуются значения по умолчанию, указанные в модуле "Яндекс Доставка"
2. Вызываем функцию "updPrices();" при смене количества товара 

## Сам скрипт и пример на GitHub
https://github.com/eZ4hUNt/insales-delivery-price-and-geo-module/

Пример: http://storeforhome.ru/
