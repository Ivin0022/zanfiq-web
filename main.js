const BASE_URL = 'https://zanfiq.herokuapp.com/api/';


$(function () {

    $.get(BASE_URL + "recharge/operaters/", function (data, status) {
        console.log(data);
        $.each(data, (key, val) => {
            let o = $('<option>');
            o.html(val)
            o.val(key)
            $('#dropbox').append(o);
        });

    });

});




let func = () => {
    let form = document.getElementById('recharge');

    let data = {
        "number": "+91" + form.number.value,
        "operator": form.opcode.value,
        "amount": form.amount.value,
    };

    console.log(data);

    $.post(BASE_URL + 'recharge/', data, (data, status) => {

        console.log(data);
        console.log(status);

        let options = {
            "key": "rzp_test_rQ4uWtBwVPDKOs",
            "amount": data['amount'],
            "currency": "INR",
            "name": "Zanfiq",
            "description": "A mobile recharge platform",
            "image": "https://example.com/your_logo",
            "order_id": data['order_id'],
            "handler": function (response) {
                alert(response.razorpay_payment_id);
            },
            // "prefill": {
            //     "name": "Gaurav Kumar",
            //     "email": "gaurav.kumar@example.com",
            //     "contact": "9999999999"
            // },
            // "notes": {
            //     "address": "note value"
            // },
            "theme": {
                "color": "#000000"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();

    });
}