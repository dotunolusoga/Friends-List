'use strict';

function hello() {
  return 'world';
}

var url = 'https://friends-list.firebaseio.com/friends-list.json';

$(document).ready(init);

function init(){
  hideForm();

}

$('#contactForm').click(revealForm);

$('#submitButton').click(submitForm);

removeContact();




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
  var $tdRemove    = $('<button>Remove</button>');
  $tr.append($tdRemove);

  $('.target').append($tr);


  var contacts = { name: $name, phone: $phone, twitter: $twitter, instagram: $instagram, photo: $photo };
  var url = usersFbUrl + '.json';
  var contactList = JSON.stringify(contacts);
  $.post(url, contactList, function(res){
    $tr.attr("data-uuid", res.name)

  $('input').val('');

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


$.get(FIREBASE_URL, function(res){
   Object.keys(res).forEach(function(uuid){
   addContactsToTable(uuid, res[uuid]);
   });
});

function addContactsToTable(uuid, data) {
   var $tr = $('<tr><td><img src="' + data.photo + '"></td><td>' + data.name + '</td><td>' + data.phone + '</td><td>' + data.twitter + '</td><td>' + data.instagram + '</td><td><button class="removeButton">Remove</button></td></tr>');
   $tr.attr("data-uuid", uuid);
   $('.target').append($tr);
};

function removeContact() {
  $('tbody').on('click', '.removeButton', function(evt){
    var $tr = $(evt.target).closest('tr');
    $tr.remove();
    var uuid = $tr.data("uuid");
    var fbUrl = 'https://friends-list.firebaseio.com/friends-list/' + uuid + '.json';
    $.ajax(fbUrl, {type: "DELETE"});
  });
}
