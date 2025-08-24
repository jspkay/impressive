Impressive is a presentation tools with two main objectives:
- replace the awkwardness of PowerPoint (and all the ugly presentation tools we have),
- exploit the power of the browser while doing so. 

The idea is inspired by `impress.js`, which is wonderful. 
Unfortunately, impress is not really viable: the _programmatic_ api makes it hard to use, for the average user. Also experienced users might have hard time with centering elements and make the presentation coherent to the style. 

For this reasons, we want something that is, in spirit, equal to impress, but more easily accessible. 

> NOTE: an alternative (albeit not space-oriented) exists, and it's reveal.js (they have a nice tool called `slides.js`).

This document defines the requirements for the present software, and make a development guideline.

# UI 

The UI must be simple and intuitive.
Many programs already available shaped the idea of such a tool: 
- infinite canvas to put things on,
- toolbar to interact with the canvas and its elements,
- a _step_ list window, which shows the progression of time. 

That said, here are the specs: 
- a menu bar, for stuff like saving and showing windows (so classic!)
  - It should include standard menus:
  - File -> Three functions: **save**, **download**, **upload**. I think `save` can make use of `localstorage`.
  - Tools -> to access the available tools. For now we have: **contaner**, **panAndZoom**, **Select**.
  - Windows -> to open the windows. Windows are described later.
  - Layout -> to save and restore layouts.
- a toolbar with the main tools. Kind of repetitive, but just in case...
- an infinite canvas, which is the main presentation area.

By default, we want to have open 


On top of that, we need a presentation mode. 
We'll talk later of export and such, but for now we just need to give the user the power of presenting! 

## Modes 

#TODO: Question: how do you implement modes? And what's the difference between the two? What should the presentation mode have?

- *presentation*,
- *editing*.


## Windows
- **Propreties** - it's probably the main interaction with every object, it shows stuff like background, border, size, position etc... I'd like a **CustomHtml** button to replace the interior with anything customized (for plugins and shit like that)
- **StepList** - it contains the `views` that are showed at every step. The steps are ordered numerically: 0, 1, 2, etc... Ideally, it shows a little preview of the view.
- **Transitions** - this window has very much importance as well, as it regulates the transition between two views. It should have a list of transitions, indicated by two consecutive views: 0>1, 1>2, 2>3, etc... It is possible to select a transition and modify its behavior (duration, timing function, etc...)

## Tools 

- **container**
- **panAndZoom**
- **Select**
