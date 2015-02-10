'use strict';

function hello() {
  return 'world';
}

var url = 'https://friends-list.firebaseio.com/.json';

$(document).ready(init);

function init(){
  hideForm();

$('#contactForm').click(revealForm);

$('#submitButton').click(submitForm);
}

function submitForm(event){
  event.preventDefault();

  var $name      = $('#contactName').val();
  var $phone     = $('#contactPhone').val();
  var $twitter   = $('#twitterHandle').val();
  var $instagram = $('#instagram').val();
  var $photo     = $('#photoUrl').val();

  var contacts = { name: $name, phone: $phone, twitter: $twitter, instagram: $instagram, photo: $photo };
  var contactList = JSON.stringify(contacts);
  $.post(url, contactList, function(res){
  });

};

function hideForm() {
  var $friendsForm = $('#friendsForm').hide();
  return $friendsForm;
};

function revealForm(){
  var $friendsForm = $('#friendsForm').show();
  return $friendsForm;
}
