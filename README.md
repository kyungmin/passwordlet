#Paswordlet Proposal#
This is my first final project proposal. Passwordlet is a clone of [OnePassword](https://agilebits.com/onepassword/mac). OnePassword lets users securely generate and manage their passwords without having to memorizing them.

##Homepage##
- lets users download the bookmarklet from homepage
- lets users sign up and sign in
- if logged in, the user can securely view, edit, and delete their passwords

##Setting up the bookmarklet##
- lets the user add credentials for the current website

##Using passwords the bookmarklet##
- clicking on the bookmarklet starts looking up for cookies for the current domain
- it gives appropriate feedback to the user while it communicates with the server looking up for the cookie
- it lets users cancel the process during the password lookup
- if it finds the password, it fills up the login form and shows the success message
- if it doesn't find the password, it allows the user to add credential
- if not logged in yet, clicking on the bookmarklet opens a popup dialog that lets users log in

##V2##
- lets the user change master login credential
- lets the user share accounts with other users
- if the user has multiple accounts within the same domain, it lets the user choose from a list