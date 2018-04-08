function Contact(first, last, phone, primary, secondary) {
    this.firstName = first;
    this.lastName = last;
    this.phone = phone;
    this.primary = primary;
    this.secondary = secondary;
} // object constructor for each contact


Contact.prototype.fullName = function() {
        return this.firstName + " " + this.lastName;
    } //fullName method for object

Contact.prototype.Addresses = function() {
        return "<li>" + this.primary + "</li>" + "<li>" + this.secondary + "</li>";
    } // Addresses method

function contactForm() {
    $("#new-contact").prepend('<div class="names">' + '<div class="form-group">' + '<label for="new-first-name">First name</label>' +
        '<input type="text" class="form-control" id="new-first-name" contenteditable="true">' + '<div class="form-group">' + '<label for="new-last-name">Last name</label>' + '<input type="text" class="form-control" id="new-last-name" contenteditable="true">' + '</div>' + '<div class="form-group">' + '<label for="contact">Phone Number</label>' + '<input type="number" class="form-control" id="new-phone" contenteditable="true">' + '</div>' + '</div>' + '<div class="address" id="new-addresses">' +
        '<div class="form-group">' +
        '<label for="new-primary">Primary Address</label>' +
        '<input type="text" class="form-control" id="new-primary" contenteditable="true">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="new-secondary">Secondary Address</label>' +
        '<input type="text" class="form-control" id="new-secondary" contenteditable="true">' +
        '</div>' + '</div>');
    $("#add-new").addClass("hidden");
};

$(document).ready(function() {

    $("#add-new").click(function() {
        // on clicking new contact button, a new address form appears above the input elements
        $(".address, .names").remove(); //to avoid any duplication
        contactForm();
    });

    // form is filled...and submitted using the add button or enter key

    $("form#new-contact").submit(function(event) {
        // prevents the default form submitting action
        event.preventDefault();
        // instead of the default action, it takes below data
        var inputtedFirstName = $("input#new-first-name").val(); //value of any first name inputted
        var inputtedLastName = $("input#new-last-name").val(); //value of any last name inputted
        var inputtedPhone = $("input#new-phone").val(); //value of any phone number inputted
        var inputtedPrimary = $("input#new-primary").val(); //value of any primary address inputted
        var inputtedSecondary = $("input#new-secondary").val(); //value of any secondary address inputted

        var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhone, inputtedPrimary, inputtedSecondary); //new instance of object

        $("#contacts").append("<li><span class='contact'>" + newContact.fullName() + "   " + "<button class='btn btn-info' id='edit-address'>Edit</button>" + "  " + "<button class='btn btn-danger' id='delete-address'>X</button></span></li>"); // shows a list of first and last names of each contact (taken from their respective values in newContact object)
        $("#add-new").removeClass("hidden"); //new contact button reappears
        $(".address, .names").remove(); // the form inputs disappear and only the contacts list show and only re-appear when 'New Contact' button is clicked

        $(".contact").last().click(function() {
            // when an entry in the contact list is clicked, the details show
            $("#show-contact").show();
            $("#show-contact h2").text(newContact.fullName());
            $(".first-name").text(newContact.firstName);
            $(".last-name").text(newContact.lastName);
            $(".phone").text(newContact.phone);
            $("ul#addresses").text("");
            $("ul#addresses").append(newContact.Addresses()); // shows list of addresses of the contact
        });

        $(".btn-info").click(function(event) { //when edit button is clicked, contact form of the particular contact appears, user edits and the data are overwritten

            $(this).closest("li").each(function() {
                $(".address, .names").remove();
                $(this).closest("li").remove();
                contactForm();

                /*$("#new-first-name").val(newContact.firstName);
                $("#new-last-name").val(newContact.lastName);
                $("#new-phone").val(newContact.phone);
                $("#new-primary").val(newContact.primary);
                $("#new-secondary").val(newContact.secondary);*/
            });
        });

        $(".btn-danger").click(function(event) { //when delete button is clicked, the contact details on that line is deleted

            $(this).closest("li").remove();

        });
    });
});