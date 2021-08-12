({
	initPokemonNames : function(component, event, helper) {
		let pokemon = component.get("c.initialize");
        pokemon.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                let respMap = response.getReturnValue();
                let names = [];
                for (let i=0; i<10; i++) {
                    names.push(respMap.results[i].name);
                }
                component.set("v.names", names);
                component.set("v.nextPage", respMap.next);
                component.set("v.previousPage", respMap.previous);
            }
        })
        $A.enqueueAction(pokemon);
	},
    getPokemonNames : function(component, event, helper) {
		let pokemon = component.get("c.getPage");
        pokemon.setParam("url", event.getSource().get("v.value"));
        pokemon.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                let respMap = response.getReturnValue();
                let names = [];
                for (let i=0; i<10; i++) {
                    names.push(respMap.results[i].name);
                }
                component.set("v.names", names);
                component.set("v.nextPage", respMap.next);
                component.set("v.previousPage", respMap.previous);
            }
        })
        $A.enqueueAction(pokemon);
	},
    showPokemon : function(component, event, helper) {
        component.set("v.show", true);
        component.set("v.showDex", false);
		let pokemon = component.get("c.getPokemon");
        pokemon.setParam("name", event.getSource().get("v.value"));
        pokemon.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                let respMap = response.getReturnValue();
                component.set("v.pokemonName", respMap.name);
                component.set("v.sprite", respMap.sprites.front_default);
                let types = [];
                for (let t in respMap.types) {
                    types.push(respMap.types[t].type.name);
                }
                component.set("v.types", types);
                component.set("v.height", respMap.height);
                component.set("v.weight", respMap.weight);
            }
        })
        $A.enqueueAction(pokemon);
	},
    showList : function(component, event, helper) {
        component.set("v.show", false);
        component.set("v.showDex", true);
    },
    submitSearch : function(component, event, helper) {
		let pokemon = component.get("c.getPokemon");
        pokemon.setParam("name", component.get("v.searchValue"));
        pokemon.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                let respMap = response.getReturnValue();
                if (respMap != null) {
                    component.set("v.show", true);
                    component.set("v.showDex", false);
                    component.set("v.pokemonName", respMap.name);
                    component.set("v.sprite", respMap.sprites.front_default);
                    let types = [];
                    for (let t in respMap.types) {
                        types.push(respMap.types[t].type.name);
                    }
                    component.set("v.types", types);
                    component.set("v.height", respMap.height);
                    component.set("v.weight", respMap.weight);
                }
            }
        })
        $A.enqueueAction(pokemon);
    }
})
