import *  as ko from 'knockout';
class MinhaLista
{
    public nome: KnockoutObservable<any>;
    constructor(){
        this.nome = ko.observable('creisson');
    }
}

export default { viewModel: MinhaLista, template: require('./minha-lista.html') };