import * as ko from 'knockout';
import 'knockout.validation';
import 'isomorphic-fetch';
import { Base } from '../../base';
const base = new Base;

class WeatherForecast {
    public dateFormatted: KnockoutObservable<string>;
    public temperatureC: KnockoutObservable<number>;
    public temperatureF: KnockoutObservable<number>;
    public summary: KnockoutObservable<string>;
    public editing: KnockoutObservable<boolean>;
    public test: KnockoutComputed<string>;
    private refs: any;
    private original: any;
    public erros: any;
    constructor(obj: any, editflag: boolean = false, refs: object) {
        this.original = obj;
        this.dateFormatted = ko.observable(obj.dateFormatted);
        this.temperatureC = ko.observable(obj.temperatureC);
        this.temperatureF = ko.observable(obj.temperatureF);
        this.summary = ko.observable(obj.summary);
        this.editing = ko.observable(editflag);
        this.refs = refs;
        this.test = ko.computed({
            owner: this,
            read: () => {
                return this.dateFormatted() + ' ' + this.temperatureC();
            }
        });
        this.erros = ko.validation.group(this);
    }

    public save() {
        let data = {
            "data": "data",
            "laza": "rento"
        };
        let self = this;
        console.log(data);
        base.post('api/SampleData/Store', data, function (resp: any) {
            console.log(resp);
            self.editing(false);
            self.update();
        });
    }
    public edit() {
        this.editing(true);
    }
    public cancel() {
        this.reverse();
        this.editing(false);
    }
    public remove() {
        this.refs.list.remove(this);
    }
    private reverse() {
        this.dateFormatted(this.original.dateFormatted);
        this.temperatureC(this.original.temperatureC);
        this.temperatureF(this.original.temperatureF);
        this.summary(this.original.summary);
    }
    private update() {
        this.original.dateFormatted = ko.unwrap(this.dateFormatted);
        this.original.temperatureC = ko.unwrap(this.temperatureC);
        this.original.temperatureF = ko.unwrap(this.temperatureF);
        this.original.summary = ko.unwrap(this.summary);
    }
}
class FetchDataViewModel {
    public forecasts = ko.observableArray<WeatherForecast>();
    constructor() {
        var self = this;
        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                self.forecasts(ko.utils.arrayMap(data, function (i) {
                    return self.make(i, false);
                }));
            });
            
    }
    private make(i: any, flag: boolean) {
        return new WeatherForecast(i, flag, { list: this.forecasts });
    }
    public add() {
        this.forecasts.unshift(this.make({}, true));
    }
}
export default { viewModel: FetchDataViewModel, template: require('./fetch-data.html') };
