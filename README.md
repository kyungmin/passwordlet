#Paswordlet Proposal#
This is my first final project proposal. Passwordlet is a clone of [OnePassword](https://agilebits.com/onepassword/mac). OnePassword lets users securely generate and manage their passwords without having to memorizing them.

##Homepage##
- lets users download the bookmarklet from homepage
- lets users sign up and sign in
- if logged in, the user can securely view, edit, and delete their passwords

##Setting up the bookmarklet##
- lets the user add credentials for the current website
- if the user already has password stored, then ask to override

##Using passwords the bookmarklet##
- clicking on the bookmarklet starts looking up for credentials for the current website
- it gives appropriate feedback to the user while it communicates with the server to lookup the password
- it lets users cancel the process during the password lookup
- if it finds the password, it fills up the login form and shows the success message
- if it doesn't find the password, it allows the user to add credential

_Edge cases:_

- if not logged in yet, clicking on the bookmarklet opens a popup dialog that lets users log in
- if the user clicks on the bookmarklet on a website without a form, it tells the user that it can't find the form to fill in
- if the user has multiple accounts within the same domain, it lets the user choose from a list

##V2##
- lets the user change master login credential
- lets the user share accounts with other users
- after filling up the form, it clicks the login button and logs in for them