/* jshint browser: true, jquery: true */

'use strict';

//var $        = require('jquery'),
    //_        = require('lodash'),
    //Firebase = require('firebase');

function hello() {
  return 'world';
}

var FIREBASE_URL = 'https://friends-list.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL),
    token        = fb.getAuth().token,
    usersFbUrl;

if (fb.getAuth()) {
  $('.login').remove();
  $('.app').toggleClass('hidden');
  $('.tableContacts').toggleClass('hidden');

  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';

  $.get(usersFbUrl + '.json?auth' + token, function (res) {
    Object.keys(res).forEach(function (uuid) {
      addContactsToTable(uuid, res[uuid]);
    });
  });
}

$('.login input[type="button"]').click(function (event) {
  var $loginForm = $(event.target.closest('form')),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};

  registerAndLogin(data, function (err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      location.reload(true);
    }
  });
});

$('.login form').submit(function(event){
  var $loginForm = $(event.target),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};

  event.preventDefault();

  fb.authWithPassword(data, function(err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      location.reload(true);
    }
  });
});

$('.logout').click(function omghaha(){
  fb.unauth();
  location.reload(true);
})

function registerAndLogin(obj, cb) {
  fb.createUser(obj, function(err) {
    if (!err) {
      fb.authWithPassword(obj, function (err, auth){
        if (!err) {
          cb(null, auth);
        } else {
          cb(err);
        }
      });
    } else {
      cb(err);
    }
  });
}
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
  var $tdRemove    = $('<button class="button">Remove</button>');
  $tr.append($tdRemove);

  $('.target').append($tr);


  var contacts = { name: $name, phone: $phone, twitter: $twitter, instagram: $instagram, photo: $photo };
  var url = usersFbUrl + '.json?auth' + token;
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
    var fbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data/' + uuid + '.json?auth' + token;
    $.ajax(fbUrl, {type: "DELETE"});
  });
}
