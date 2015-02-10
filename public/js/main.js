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
  var $tdPhoto     = $('<td class="image"><img src="' + $photo + '"></td>');
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
    $tr.attr('data-uuid', res.name)
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

$.get(url, function(data){
   Object.keys(data).forEach(function(uuid){
   addContactsToTable(uuid, data[uuid]);
   });
});

function addContactsToTable(uuid, data) {
   var $tr = $('<tr><td><img src="' + data.photo + '"></td><td>' + data.name + '</td><td>' + data.phone + '</td><td>' + data.twitter + '</td><td>' + data.instagram + '</td><td><button class="removeButton">Remove</button></td></tr>');
      //addRowToTable(uuid, data[uuid]);
   $('.target').append($tr);
};
