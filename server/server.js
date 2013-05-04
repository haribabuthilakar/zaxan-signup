Signups = new Meteor.Collection("signups");
Visits = new Meteor.Collection("visits");

function adminUser(userId) {
  var adminUser = Meteor.users.findOne();
  return (userId && adminUser && adminUser.emails[0].address === 'haribabut@yahoo.com');
}

Meteor.publish("signups", function() {
  return Signups.find({});
});

Signups.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, docs, fields, modifier){
    return adminUser(userId);
  },
  remove: function (userId, docs){
    return adminUser(userId);
  }
});

Visits.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, docs, fields, modifier){
    return adminUser(userId);
  },
  remove: function (userId, docs){
    return adminUser(userId);
  }
});

