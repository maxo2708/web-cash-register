//Setup Cash Register Object
var CashRegister = {

    //Declare Variables
    Subtotal: 0,
    Total: 0,
    Currency: undefined,
    Tax: undefined,
    inventory: [],

    //Declare Functions
    Start: function () {
        //Hides main application and other overlays
        $('#Overlay3').hide();
        $('#Overlay2').hide();
        $('#UsrOwe').hide();
        $('#UsrPaid').hide();
        $('#Reset').hide();
        $('#ManualAuto').hide();
        $('#Auto').hide();
        //Setup Event Handlers
        $('#OverlayButton').click(CashRegister.Overlayer);
        $('#SetupSubmit').on('click', CashRegister.Setup);
        $('#ModifyP').click(CashRegister.InventoryEdit);
        $('#Submit').on("click", CashRegister.Submit);
        $('#Checkout').on("click", CashRegister.Checkout);
        $('#Reset').on("click", CashRegister.Reset);
        $('#InventoryInsert').click(CashRegister.AddInventory);
        $('#Scanner').click(CashRegister.AutoInsertGui);
        $('#Manual').click(CashRegister.ManualInsert);
        $('#GoBack').click(CashRegister.GoBack);
        $('#GoBack2').click(CashRegister.GoBack);
        $('#Settings').click(CashRegister.Overlayer);
        $('#ExitInventory').click(CashRegister.ExitInventory);
        $('#InventoryClear').click(CashRegister.ClearInventory);
    },

    //The 'start' button
    Overlayer: function () {
        $('#Overlay1').fadeOut('slow');
        $('#Overlay2').hide();
        $('#Overlay3').fadeIn('slow');
        $('#Inventory').hide();
    },

    //Setup Page 
    Setup: function () {
        //Update Variables
        CashRegister.Currency = $('select[name=currency]').val();
        CashRegister.Tax = $('input[name=Tax]').val();
        //Make sure input is valid
        if (CashRegister.Currency == null || CashRegister.Currency == "") {
            alert("Please select a Currency");
            return false;
        }

        if (CashRegister.Tax == null || CashRegister.Tax == "") {
            alert("Please fill in the tax");
            return false;
        }
        if (isNaN(CashRegister.Tax)) {
            alert("Please insert the tax in a numerical form.");
            return false;
        }

        //Update GUI
        $('#Overlay3').hide();
        $('#Overlay2').show();
        $('#UsrItem').hide();
        $('#UsrPrice').hide();
        $('#ManualAuto').show()
        $('input').keyup(CashRegister.SubmitEnter);
    },

    InventoryEdit: function () {
        $('#Setup').hide();
        $('#Inventory').show();
    },

    ClearInventory: function () {
        //Find All Objects made outside the array
        for (i = 0; i < CashRegister.inventory.length; i++) {
            var Name = CashRegister.inventory[i].barcode;
            window[Name] = null;
        }
        //Clear GUI and Array
        $('.item').remove();
        CashRegister.inventory = [];
    },

    //Constructor for making new inventory items
    InventoryItem: function (barcode, name, price) {
        this.barcode = barcode;
        this.ItemName = name;
        this.ItemPrice = price;
        CashRegister.inventory.push(this)
    },

    AddInventory: function () {
        //Declare Variables
        Barcode = $('input[name=Barcode]').val();
        ItemName = $('input[name=InventoryItem]').val();
        PriceVal = $('input[name=InventoryPrice]').val();
        //Verifies that the input box values are correct/not already existing
        if (window["b" + Barcode] != null) { alert("This item has already been defined"); return false; }
        if (isNaN(Barcode)) { alert("The barcode is not a number"); return false; }
        if (ItemName == null || ItemName == "") { alert("Please enter an item name"); return false; }
        if (PriceVal == null || PriceVal == "") { alert("Please enter a price"); return false; }
        if (isNaN(PriceVal)) { alert("Please enter a price in a numerical form"); return false; }
        //Shows in GUI and uses constructor to create the new inventory item 
        $('#Placeholder').append('<p class="item">' + 'Barcode: ' + Barcode + '    ' + 'Item: ' + ItemName + '    ' + 'Price: ' + PriceVal + '</p>');
        window["b" + Barcode] = new CashRegister.InventoryItem("b" + Barcode, ItemName, PriceVal);
    },

    ExitInventory: function () {
        $('#Inventory').hide();
        $('#Setup').show();
    },

    //Repurpose use of 'enter' key
    SubmitEnter: function (event) {
        if (event.keyCode == 13) {
            $("#Submit").click();
        }
    },

    AutoInsertGui: function () {
        $('#ManualAuto').hide();
        $('#Auto').show();
        $('#Submit').off();
        $('#Submit').on('click', CashRegister.AutoInsert);
    },

    AutoInsert: function () {
        Barcode = $('input[name="Barcode2"]').val();
       //For statement to find Barcode match in array
        for (i = 0; i < CashRegister.inventory.length; i++) {
            if ("b" + Barcode == CashRegister.inventory[i].barcode) {
                $('#Price').append('<p class="item">' + CashRegister.inventory[i].ItemPrice + '</p>');
                //Calculates and shows current subtotal
                CashRegister.Subtotal += Number(CashRegister.inventory[i].ItemPrice);
                $('#LogSubtotal').html('Subtotal: ' + CashRegister.Currency + CashRegister.Subtotal);
                //Calculates and shows current tax
                Tax = Number(CashRegister.Tax) / 100
                $('#LogTax').html('Tax: ' + CashRegister.Currency + (Tax * CashRegister.Subtotal))
                //Calculates and shows current total
                CashRegister.Total = Tax * CashRegister.Subtotal + CashRegister.Subtotal;
                $('#LogTotal').html('Total: ' + CashRegister.Currency + CashRegister.Total)
                $('#Item').append('<p class="item">' + CashRegister.inventory[i].ItemName + '</p>');
            }
            //If no match is found
            else if (i == CashRegister.inventory.length - 1) {
                alert("The barcode you listed isn't registered");
            }
        }
    },

    ManualInsert: function () {
        $('#ManualAuto').hide();
        $('#UsrItem').show();
        $('#UsrPrice').show();
        $('#Submit').off();
        $('#Submit').on('click', CashRegister.Submit)
    },

    GoBack: function () {
        $('#Auto').hide();
        $('#UsrItem').hide();
        $('#UsrPrice').hide();
        $('#ManualAuto').show();
    },

    //Code for item submission
    Submit: function () {
        //Declare Variables
        CashRegister.ItemName = $('input[name=ItemName]').val();
        CashRegister.PriceVal = $('input[name=PriceVal]').val();
        //Verifies that the value in the 'Price Box' is valid
        if (CashRegister.PriceVal == "" || CashRegister.PriceVal == null) {
            alert("Please Enter in a Price");
            return false;
        }
        if (isNaN(CashRegister.PriceVal)) {
            alert("The value in the Price Box is Not a Number");
            return false;
        }
        $('#Price').append('<p class="item">' + CashRegister.PriceVal + '</p>');
        //Calculates and shows current subtotal
        CashRegister.Subtotal += Number(CashRegister.PriceVal);
        $('#LogSubtotal').html('Subtotal: ' + CashRegister.Currency + CashRegister.Subtotal.toFixed(2));
        //Calculates and shows current tax
        Tax = Number(CashRegister.Tax) / 100
        $('#LogTax').html('Tax: ' + CashRegister.Currency + (Tax * CashRegister.Subtotal).toFixed(2))
        //Calculates and shows current total
        CashRegister.Total = Tax * CashRegister.Subtotal + CashRegister.Subtotal;
        $('#LogTotal').html('Total: ' + CashRegister.Currency + CashRegister.Total.toFixed(2))
        //Checks items name then appends it
        if (CashRegister.ItemName == "" || CashRegister.ItemName == null) {
            $('#Item').append('<p class="item"> Unidentified Item </p>');
        }
        else {
            $('#Item').append('<p class="item">' + CashRegister.ItemName + '</p>');
        }
    },


    //Code for checkout
    Checkout: function () {
        //Hide and Show some GUI for Checkout
        $('#Submit').off();
        $('#UsrItem').hide();
        $('#UsrPrice').hide();
        $('#Checkout').hide();
        $('#ManualAuto').hide();
        $('#Auto').hide();
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
                $('#Change').html('Amount Left: ' +  CashRegister.Currency + Math.abs(Change));
            }
            else {
                $('#Change').html('Change: ' + CashRegister.Currency + Change);
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
        $('#UsrItem').hide();
        $('#UsrPrice').hide();
        $('#Checkout').show();
        $('#ManualAuto').show();
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
