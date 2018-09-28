import * as $ from 'jquery';

export class Base{
    public post(url:string, payload:object,action:any){
        $.ajax({
            url: url,
            data: JSON.stringify(payload),
            type: "POST",
            contentType: 'application/json; charset=utf-8',
        }).done(function(response) {
            action(response);
        }).fail(function(err) {
            alert(err);
        }).always(function(resp) {
            console.log(resp);
        });
    }
}
