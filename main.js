const BASE_URL = 'https://zanfiq.herokuapp.com/api/';


$(function () {
    $.get(BASE_URL + "recharge/operaters/", function (data, status) {
        console.log(data);
        let mobile = data['mobile'];
        $.each(mobile, (key, val) => {
            let o = $('<option>');
            o.html(val)
            o.val(key)
            $('#dropbox').append(o);
        });

    });

});


function payment_success_handler(response) {
    let razorpay_data = {
        'razorpay_order_id': response.razorpay_order_id,
        'razorpay_payment_id': response.razorpay_payment_id,
        'razorpay_signature': response.razorpay_signature,
    }

    let recharge_data = { ...recharge_from_data, ...razorpay_data };

    $.post(BASE_URL + 'recharge/payment/success/', recharge_data, (data, status) => {
        console.log(data);
    });
}


let func = () => {

    if ($('#recharge')[0].checkValidity() === false) {
        $('#recharge').addClass('was-validated');
        return
    }

    // disable button
    $('#button').prop("disabled", true);
    // add spinner to button
    $('#loading').show();

    let form = document.getElementById('recharge');

    let recharge_from_data = {
        "number": "+91" + form.number.value,
        "operator": form.opcode.value,
        "amount": form.amount.value,
    };

    console.log(recharge_from_data);

    $.post(BASE_URL + 'recharge/', recharge_from_data, (data, status) => {

        console.log(data);
        console.log('got the order ID');
        console.log(status);

        let options = {
            "key": "rzp_live_2MyxgoePGGlbP8",
            "amount": data['amount'],
            "currency": "INR",
            "name": "Zanfiq",
            "description": "A mobile recharge platform",
            "order_id": data['order_id'],
            "handler": payment_success_handler,
            "prefill": {
                "contact": form.number.value,
                "email": '1@da.com'
            },
            "modal": {
                "ondismiss": function () {
                    // Enable button
                    $('#button').prop("disabled", false);
                    // remove spinner to button
                    $('#loading').hide();
                }
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();

    });
}