//Setup Cash Register Object
var CashRegister = {

    //Declare Variables
    Subtotal: 0,
    Total: 0,
    Currency: undefined,
    Tax: undefined,

    //Declare Functions
    Start: function () {
        //Hides main application and other overlays
        $('#Overlay3').hide();
        $('#Overlay2').hide();
        $('#UsrOwe').hide();
        $('#UsrPaid').hide();
        $('#Reset').hide();
        //Setup Event Handlers
        $('#OverlayButton').click(CashRegister.Overlayer);
        $('#SetupSubmit').on('click', CashRegister.Setup);
        $('#Submit').on("click", CashRegister.Submit);
        $('#Checkout').on("click", CashRegister.Checkout);
        $('#Reset').on("click", CashRegister.Reset);
    },

    //The 'start' button
    Overlayer: function () {
        $('#Overlay1').fadeOut('slow');
        $('#Overlay3').fadeIn('slow');
    },

    //Setup Page 
    Setup: function () {
        //Update Variables
        CashRegister.Currency = $('select[name=currency]').val();
        CashRegister.Tax = $('input[name=Tax]').val();
        //Make sure input is valid
        if (CashRegister.Currency == null || CashRegister.Currency == "") {
            alert("Please select a Currency");
        }
        else {
            console.log(CashRegister.Currency);
        }
        if (CashRegister.Tax == null || CashRegister.Tax == "") {
            alert("Please fill in the tax");
            return false;
        }
        else if (isNaN(CashRegister.Tax)) {
            alert("Please insert the tax in a numerical form.");
        }
        else {
            console.log(CashRegister.Tax); //For debug purposes
        }
        //Update GUI
        $('#Overlay3').hide();
        $('#Overlay2').show();
        $('input').keyup(CashRegister.SubmitEnter);
    },

    //Repurpose use of 'enter' key
    SubmitEnter: function (event) {
        if (event.keyCode == 13) {
            $("#Submit").click();
        }
    },

    //Code for item submission
    Submit: function () {
        //Declare Variables
        CashRegister.ItemName = $('input[name=ItemName]').val();
        CashRegister.PriceVal = $('input[name=PriceVal]').val();
        //Verifies that the value in the 'Price Box' is valid
        if (CashRegister.PriceVal == "" || CashRegister.PriceVal == null) {
            alert("Please Enter in a Price");
        }
        else if (isNaN(CashRegister.PriceVal)) {
            alert("The value in the Price Box is Not a Number");
        }
        else {
            $('#Price').append('<p class="item">' + CashRegister.PriceVal + '</p>');
            //Calculates and shows current subtotal
            CashRegister.Subtotal += Number(CashRegister.PriceVal);
            $('#LogSubtotal').html('Subtotal: ' + CashRegister.Currency + CashRegister.Subtotal);
            //Calculates and shows current tax
            Tax = Number(CashRegister.Tax) / 100
            $('#LogTax').html('Tax: ' + CashRegister.Currency + (Tax * CashRegister.Subtotal))
            //Calculates and shows current total
            CashRegister.Total = Tax * CashRegister.Subtotal + CashRegister.Subtotal;
            $('#LogTotal').html('Total: ' + CashRegister.Currency + CashRegister.Total)
            //Checks items name then appends it
            if (CashRegister.ItemName == "" || CashRegister.ItemName == null) {
                $('#Item').append('<p class="item"> Unidentified Item </p>');
            }
            else {
                $('#Item').append('<p class="item">' + CashRegister.ItemName + '</p>');
            }
        }
    },

    //Code for checkout
    Checkout: function () {
        //Hide and Show some GUI for Checkout
        $('#Submit').off();
        $('#UsrItem').hide();
        $('#UsrPrice').hide();
        $('#Checkout').hide();
        $('#UsrOwe').show();
        $('#UsrPaid').show();
        $('#Reset').show();
        //Checks the Amount paid and shows AmtLeft or Change
        $('#Submit').on("click", function () {
            var AmtPaid = $('input[name=UsrPaid]').val();
            var Change = AmtPaid - CashRegister.Total;
            if (AmtPaid == null || AmtPaid == "") {
                alert("Please insert the amount paid.");
            }
            else if (isNaN(AmtPaid)) {
                alert("Please insert the amount paid in a numerical form.");
            }
            else if (Change < 0) {
                $('#Change').html('Amount Left: ' + Math.abs(Change));
            }
            else {
                $('#Change').html('Change: ' + Change);
            }
        })
    },

    //Code for reset
    Reset: function () {
        //Configure Event Handlers
        $('#Submit').off();
        $('#Submit').on("click", CashRegister.Submit);
        //Configure GUI for application reset
        $('#UsrOwe').hide();
        $('#UsrPaid').hide();
        $('#Reset').hide();
        $('#UsrItem').show();
        $('#UsrPrice').show();
        $('#Checkout').show();
        //Reset previous entries and changes
        $('.item').remove();
        CashRegister.Total = 0;
        CashRegister.Subtotal = 0;
        $('#LogSubtotal').html("Subtotal: ");
        $('#LogTax').html("Tax: ");
        $('#LogTotal').html("Total: ")
    }
}

//Start code
$(document).ready(CashRegister.Start);
