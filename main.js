$(function () {

    $.get("https://zanfiq.herokuapp.com/api/recharge/operaters/", function (data, status) {
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
    let form = document.getElementById('recharge')
    let number = form.number.value;
    let opcode = form.opcode.value;
    let amount = form.amount.value;

    console.log(number);
    console.log(opcode);
    console.log(amount);

    let data = {
        "number": "+91" + number,
        "operator": opcode,
        "amount": amount
    };
    console.log(data);

    $.post('https://zanfiq.herokuapp.com/api/recharge/', data, (data, status) => {
        // let s = $('#s');
        // s.attr('data-order_id', data['order_id']);
        // s.attr('data-amount', data['amount']);
        console.log(data);
        console.log(status);



        let options = {
            "key": "rzp_test_rQ4uWtBwVPDKOs",
            "amount": data['amount'],
            "currency": "INR",
            "name": "Acme Corp",
            "description": "A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami",
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
                "color": "#F37254"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();

    });
}