Signups = new Meteor.Collection("signups");
Meteor.subscribe("signups")

defaultToastrOptions = {fadeIn: 250, fadeOut: 250, timeOut: 3000, extendedTimeOut: 250};
lengthyToastrOptions = {fadeIn: 250, fadeOut: 250, timeOut: 10000, extendedTimeOut: 250};
confirmToastrOptions = {fadeIn: 250, fadeOut: 250, timeOut: 0, extendedTimeOut: 0, onclick: null, tapToDismiss: false};

function adminUser(userId) {
  var adminUser = Meteor.users.findOne();
  return (userId && adminUser && adminUser.emails[0].address === 'haribabut@yahoo.com');
}

Template.main.rendered = function() {
}
Template.main.admin = function(userId) {
 if (userId && adminUser(userId) && window.location.href === "http://localhost:3000/admin") {
    return true;
  }
}

Template.main.adminurl = function() {
 if (window.location.href === "http://localhost:3000/admin") {
    return true;
  }
}

Template.main.signups = function(){
  return Signups.find({},{sort: {date: -1}});
}

Template.form.rendered = function() {
  $("#overviewTabs a[href=\"#overview\"]").tab("show");
}

Template.form.events({ 
  'submit #newSignup': function(e,t) {
    e.preventDefault()

    Signups.insert({name: t.find('#p-name').value, email: t.find('#p-email').value, city: t.find('#p-city').value, availability: t.find('#p-availability').value, date: new Date().toString()});
    toastr.success("", "Thank you for signing up", defaultToastrOptions);
  },
  'click #overview': function(e,t) {
    e.preventDefault()
    $("#overviewTabs a[href=\"#overview\"]").tab("show");
  },
  'click #about': function(e,t) {
    e.preventDefault()
    $("#overviewTabs a[href=\"#about\"]").tab("show");
    }
});
    
