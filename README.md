# Ig Follow Asserter

This project is not affiliated with Instagram, Meta nor any of its parent companies.

This is a Firefox extension capable of comparing a Instagram user's follower and following lists.
Users who are in the longer list\*¹, and not on the shorter one, will be displayed to as Not following you back.

Installation:
- Clone this repository, run ```npm install``` and ```npm run build``` (prefer ```pnpm``` instead of ```npm``` if possible)
- Open Firefox, go to "about:debugging", click the button "This Firefox"
- Click "Load Temporary Extension", choose the file "manifest.json" inside the "dist/" directory
- Repeat this process (from line 2-3) every time you may need it (idk how to install it properly, gl, sorry)

Usage:
- Open instagram.com, go to a public\*² profile\*³\*⁴ 
- Open Following or Followers list, scroll until it shows all Followers(or Following) 
- Click "Run" on the Extension Popup 
- Close the list, open the other one and repeat the process 
- After Pressing "Run" on both lists, Click "Compare" on the Extension Popup 
- It should show a "List of Shame" with users who do not follow back 
- You may need to reload the website to use it again 

\*¹: The longer list is assumed to be the following list.  
\*²: If it's your own profile it can be private.  
\*³: You may need to be Logged in.  
\*⁴: Profiles with too many followers do not show all of its followers (e.g. 1M+ followers).  

Credits:
- icons [iconpacks](https://iconpacks.net)
- icons [pikpng](https://pikpng.com)
