//LLUVIA DE CODIGO

sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/odata/v2/ODataModel",
	"crearavisoZPM_APP_001/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(jQuery,Controller,UIComponent,ODataModel,BaseController,Filter,FilterOperator) {
	"use strict";

	return BaseController.extend("crearavisoZPM_APP_001.controller.CrearAviso", {
		
		onInit: function(){
			 this.selectClase = this.getView().byId("selectClase");
			 
			//this.oModel = this.getOwnerComponent().getModel("oSearchModel");
			this.oModel = this.getOwnerComponent().getModel("oSearchModel");
			this.oPModel = this.getOwnerComponent().getModel("OPModel");
			
			
			/*oModel.metadataLoaded().then(function() {
    		alert("We have the model to our disposal at this point");
    		}.bind(this));*/

		},/*,
		onAfterRendering: function(){
			     var oComponent = this.getOwnerComponent();
			     var oModel = oComponent.getModel("oSearchModel");
			     var oModelData = oModel.getData();
			}*/
		onChangeSelect: function(){
		//	var filtro = [];
		
		var key = this.selectClase.getSelectedKey();
		var that = this;
		/*var sValue1 = key;
		filtro.push(new Filter("LvQmart", FilterOperator.EQ, sValue1));
		var oBinding = this.selectPrioridad.getBinding("items");
		oBinding.filter(filtro);*/
		
			/*this.oModel.read("/ClaseAvisoSet('"+key+"')", {
	    	urlParameters: {
	        "$expand": "ToPrioridad"
	    	},
	    	success: function(oData){*/
	    	//	that.selectPrioridad.setModel(new sap.ui.model.odata.ODataModel().setData(oData));
	    	var selectPrioridad = this.getView().byId("selectPrioridad");
	    	
	    	selectPrioridad.setModel(this.oPModel,"ModelPrioridad");
	    	
	    	//var oItemSelectTemplate = new sap.ui.core.Item({text:"{ModelPrioridad>Qmartx}"});
	    	
	    	selectPrioridad.bindElement({
	    		path: "ModelPrioridad>/ClaseAvisoSet('A1')",
	    		parameters : {
				expand : "ToPrioridad"
				}
	    		/*events : {
					dataRequested: function () {
					//	this.getView().setBusy(true);
					},
					dataReceived: function () {
					//	this.getView().setBusy(false);
					}
				}*/
	    	});
	    	
			
            /*var filterByCountry= new sap.ui.model.Filter({path : 'Qmart',
							            				operator : 'EQ',
							            				value1:'A1'});
							            				
			var oItemSelectTemplate = new sap.ui.core.Item(
				{
					text:"{ModelPrioridad>Priokx}"
					
				}
				);				            				
            				
			selectPrioridad.bindAggregation("items", {
               path:"ModelPrioridad>/ClaseAvisoSet('A1')/ToPrioridad",
               filters : filterByCountry,
               parameters:{
               	expand: 'ToPrioridad',
               	select: 'Priokx'
               },
               template : oItemSelectTemplate
        	});*/
        	
	    	/*}
			});*/
			
		},
		onSearch: function(){
			
		},
		onEquipoDialog: function(){
			
		/*this._oDialog = sap.ui.xmlfragment("crearavisoZPM_APP_001.view.Dialog", this);
			
			this._oDialog.setModel(this.oModel,"ModelDialog");
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();*/
			
			this.buildDialog("EquipoSet");
		},
		buildDialog: function(entitySet){
			var that = this;
			if (!that.pressDialog) {
				that.pressDialog = new sap.m.Dialog({
					/*noDataText:"No Products Found",*/
					title:"Seleccione",
					/*search:"handleSearch",
					confirm:"handleClose",
					close:"handleClose",
					multiSelect:true,*/
					subHeader: new sap.m.Toolbar({
						content: new sap.m.SearchField()
					}),
					content: new sap.m.List({
						width:"auto",
						mode:"SingleSelect",
						growing:"true",
						growingThreshold:10,
						items: {
						path: "{ModelDialog>/"+entitySet+"}",
						template: new sap.m.ObjectListItem({
								title: "Equipo"
								/*intro: "{UbicacionTecnica}",
								number: "{PONumber}",
								infoState: "Success",
								info: "Abierto",
								attributes: [
									new sap.m.ObjectAttribute({
									text: "Descripción"
								}), new sap.m.ObjectAttribute({
									text: "Grupo planificador"
								}), new sap.m.ObjectAttribute({
									text: "30/11/2017"
								})
								],
								firstStatus:[
									new sap.m.ObjectStatus({
										text: "Abierto",
										state: "Success"
									})
									]*/
							})
							}
					}),
					beginButton: new sap.m.Button({
						text: 'Aceptar',
						press: function () {
							that.pressDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cerrar',
						press: function () {
							that.pressDialog.close();
						}
					})
					
					/*title: 'Avisos',
					content: new List({
						items: {
							path: '/WorkflowTasks',
							template: new StandardListItem({
								title: "{PONumber}",
								description: "Descripción de aviso",
								infoState: "Success",
								info: "Abierto"
							})
						}
					}),
					beginButton: new Button({
						text: 'Cerrar',
						press: function () {
							that.pressDialog.close();
						}
					})*/
				});
 
				//to get access to the global model
				that.pressDialog.setModel(this.oModel,"ModelDialog");
				//this.getView().addDependent(that.pressDialog);
			}
 
			that.pressDialog.open();
		}

	});
});
