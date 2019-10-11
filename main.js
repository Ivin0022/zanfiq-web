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

    if ($('#recharge')[0].checkValidity() === false) {
        $('#recharge').addClass('was-validated');
        return
    }

    $("#button").click(function () {
        // disable button
        $(this).prop("disabled", true);
        // add spinner to button
        $(this).html(
            `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Recharge..`
        );
    });

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
            "prefill": {
                "contact": form.number.value
            },
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