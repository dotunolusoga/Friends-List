'use strict';

function hello() {
  return 'world';
}

var url = 'https://friends-list.firebaseio.com/.json';

$(document).ready(init);

function init(){
  hideForm();

}

$('#contactForm').click(revealForm);

$('#submitButton').click(submitForm);



function submitForm(event){
  event.preventDefault();

  var $name      = $('#contactName').val();
  var $phone     = $('#contactPhone').val();
  var $twitter   = $('#twitterHandle').val();
  var $instagram = $('#instagram').val();
  var $photo     = $('#photoUrl').val();

  var $tr          = $('<tr></tr>');
  var $tdPhoto     = $('<td class="image"><img src="' + $photo + '"</td>');
  $tr.append($tdPhoto);
  var $tdName      = $('<td>' + $name + '</td>');
  $tr.append($tdName);
  var $tdPhone     = $('<td>' + $phone + '</td>');
  $tr.append($tdPhone);
  var $tdTwitter   = $('<td>' + $twitter + '</td>');
  $tr.append($tdTwitter);
  var $tdInstagram = $('<td>' + $instagram + '</td>');
  $tr.append($tdInstagram);

  $('.target').append($tr);


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
