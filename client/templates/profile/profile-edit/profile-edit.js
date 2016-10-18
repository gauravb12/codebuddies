// Set max character count for bio
var bioCharCount = 140;

Template.profileEdit.helpers({
  bioCharCount: bioCharCount
});

Template.profileEdit.events({
  // Track text for character counting
  'keyup #bio-text': function(event) {
    var currentLength = $("#bio-text").val().length;
    bioCharCount = 140 - currentLength;
    $('.bioCharLeft').text(bioCharCount + ' characters left');

    if (currentLength >= 130) {
      $('.bioCharLeft').css("color", "#ff9980");
    } else {
      $('.bioCharLeft').css("color", "white");
    }
  },

  'click #updateProfile': function() {
    var profileInfo = {
      location: $('input[name="location"]').val(),
      bio: $('#bio-text').val(),
      website: $('input[name="website"]').val(),
      twitter: $('input[name="twitter"]').val(),
      github: $('input[name="github"]').val(),
      facebook: $('input[name="facebook"]').val(),
      linkedin: $('input[name="linkedin"]').val()
    };

    Meteor.call('setUserProfile', profileInfo, function(error, result) {});

    // reset form fields
    $('input[name="location"]').val('');
    $('#bio-text').val('');
    $('input[name="website"]').val();
    $('input[name="twitter"]').val('');
    $('input[name="github"]').val('');
    $('input[name="facebook"]').val('');
    $('input[name="linkedin"]').val('');

    Session.set('editMode',false);
  }
});