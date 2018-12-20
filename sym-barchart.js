(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "barchart",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Table', /*last value from multiple tags*/
				Height: 150,
				Width: 150 
			} 
		}
	}
	
	
	/*function getConfig(){

			return 
			{
				
			}
	}*/
	symbolVis.prototype.init = function(scope, elem) { 
		
		var container = elem.find('#container')[0];
		container.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(container.id, {
				"theme": "none",
				"type": "serial",
				"dataProvider": [{
					"year": "Analysis in Error",
					"income": 23.5
				}],
				"valueAxes": [{
					"title": "Income in millions, USD"
				}],
				"graphs": [{
					"balloonText": "Income in [[category]]:[[value]]",
					"fillAlphas": 1,
					"lineAlpha": 0.2,
					"title": "Income",
					"type": "column",
					"valueField": "income"
				}],
				"depth3D": 20,
				"angle": 30,
				"rotate": true,
				"categoryField": "year",
				"categoryAxis": {
					"gridPosition": "start",
					"fillAlpha": 0.05,
					"position": "left"
				},
				"export": {
					"enabled": true
				 }
		});
		
		/*convert data to chart value*/
		
		function convertToChart(data){
			return data.Rows.map(function(item){
				return {
					/*
					year: item.Value,
					income: item.Label*/
						
					//year: item.Label,
					year: "Analysis in Error",
					income: item.Value	
						
						
				}
			})
			
		}
		
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){
			//console.log(data);/*console log is working*/
			var dataprovider = convertToChart(data);
			chart.dataProvider = dataprovider;
			chart.validateData();
		}
		
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
