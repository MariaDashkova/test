
function statement(invoice, plays) {
	return resultSet(dataSet(invoice, plays));
	
}

function dataSet(invoice, plays){
	let totalAmount = 0;
	let volumeCredits = 0;
	let data = {};
	data.customer = invoice.customer;

	data.performances = {}

	for (let perf of invoice.performances) {
			 volumeCredits += bonuses(perf.audience, (plays[perf.playId]).type);
			
			 data.performances[plays[perf.playId].name]=` ${format1(switchByTupe(perf, plays[perf.playId] ))} (${perf.audience} мест)`;
			
			 totalAmount += switchByTupe(perf, plays[perf.playId] );

	}
		 
	data.totalAmount = format1(totalAmount);
	data.volumeCredits = volumeCredits;

	return data;
}

function resultSet(dataSet){
 	
 	let result = `Счет для ${dataSet.customer}\n`;

 	for (let perf in dataSet.performances) {
	 result += `${perf}: ${dataSet.performances[perf]}\n`;
	}

	 result += `Итого с вас ${dataSet.totalAmount}\n`;
	 result += `Вы заработали ${dataSet.volumeCredits} бонусов\n`;
	 return result;
}


function bonuses(audience, type) {
	let result = 0;

	// Добавление бонусов
	result += Math.max(audience - 30, 0);

	// Дополнительный бонус за каждые 10 комедий
	if ("comedy" === type) result += Math.floor(audience / 5);

	return result;
}

function format1(num) {
	return new Intl.NumberFormat("ru-RU",{ style: "currency", currency: "RUB",
	minimumFractionDigits: 2 }).format(num/100);
}

function switchByTupe(perf, play){
	let amount = 0;

	switch (play.type) {
		 case "tragedy":
			 amount = 40000;

			 if (perf.audience > 30) {
			 		amount += 1000 * (perf.audience - 30);
			 }
			 break;

		 case "comedy":
			 amount = 30000;

			 if (perf.audience > 20) {
			 amount += 10000 + 500 * (perf.audience - 20);
			 }
			 amount += 300 * perf.audience;
			 break;

		 default:
		 		throw new Error(`неизвестный тип: ${play.type}`);
	 }

	 return amount;
}


