# Impressive 
## Presentations from the Future

> IMPORTANT: Current branch in development is `GoldenLayout`.

# Why impressive ? 

I see a lot of presentations. Mainly scientific. The most used tool for it is Microsoft Powerpoint. It's very powerful in reality, but there are a few ideas that do not sit quite well with me:

- it's proprietary software,
- the file is stored in proprietary format,
- it doesn't really work on Linux, 
- there is no almost backward compatibility,
- animations are quite restrictive.

These reasons led me away from it. At the beginning I was using Google Slides, but similar problems arose. 
One day I found out about impress.js and I fell in love with it.
The space-arrangement of the steps and the browser capabilities were a no-brainer to me. 
Dang, we are in 2025! I want to put stylish interactive graphs in my presentations and I love the 3D capabilites. 

Unfortunately, no such a tool exists. I mean, impress.js works very well and, in principle, you can do all of these things.
But there is a problem: editing the presentation requires to edit a text file.
It wouldn't be a big problem, if it wasn't for the fact that arranging elements in space is quite difficult via _mental-math_.

So, in essence: this project aims at being a viable alternative to all the current software and offer a simple gui to interact with the elements.


# Installation 

There is really nothing to install, it's just a simple web page. Although you might want to take a look at the following section, just in case.

# Usage 

Since the whole project is just a web page, chance is you can download the repo as is and just open the file `index.html`. 
If that doesn't work, then you need a simple http server, but fare not, my child!

![Fear not, mlady - simpsons scene](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWRmcmVwOXllbHd1Ym9scWp0Y2pna25xZGN6ZjJxMWR4N2owbGJxNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT5LMSJ5V7WTXl4iWs/giphy.gif)

You can use php like this:

```bash 
php -t . -p 4000
```

and open [this link](http://localhost:4000) in the browser.

# Credits 
