/*-----------------------------------------------------------------------------
  REQUIRE
-----------------------------------------------------------------------------*/
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')

/*-----------------------------------------------------------------------------
  THEME
-----------------------------------------------------------------------------*/
var FONT        = 'Signika, sans-serif'
var BLACK       = 'hsla(0,0%,0%,1)'
var WHITE       = 'hsla(0,0%,100%,1)'
var BLUE        = 'hsla(208,53%,32%,1)'
var PINK        = 'hsla(336,74%,66%,1)'
var YELLOW      = 'hsla(42,100%,70%,1)'
var GREEN       = 'hsla(164,95%,43%,1)'
var DARKGREEN   = 'hsla(161,86%,29%,1)'
var GREY        = 'hsla(30,100%,99%,1)'
var LIGHTGREY   = 'hsla(30,100%,99%,.4)'
var PURPLE			= 'hsla(308,65%,32%,1)'
var COLORS      = [DARKGREEN,PINK, YELLOW, PURPLE]

/*-----------------------------------------------------------------------------
  LOADING FONT
-----------------------------------------------------------------------------*/
var links = ['https://fonts.googleapis.com/css?family=Signika',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css']
var font = yo`<link href=${links[0]} rel='stylesheet'>`
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)
document.head.appendChild(fontAwesome)

/*--------------------------------------------------------------------------------
  LOADING DATA
--------------------------------------------------------------------------------*/
minixhr('https://api.github.com/users/kat005', startPage)
function startPage (data) {
  var data = JSON.parse(data)
  document.body.appendChild(template(data))
	activateScrollEffect(COLORS)
}

/*-----------------------------------------------------------------------------
  WEB PAGE
-----------------------------------------------------------------------------*/
var css = csjs`
  body {
    text-align: center;
    background-color: ${DARKGREEN};
    color: black;
    font-family: ${FONT}
  }
  h1 {
    margin-top: 1em;
    color: ${GREY};
    font-size: 4.5em;
    font-weight: bold;
    text-transform: uppercase;
  }
	h3 {
    color: ${YELLOW};
    font-size: 3.5em;
    margin-bottom: 3em;
  }
  img {
    margin-top: 3em;
    border: 4px solid ${GREY};
    border-radius: 50%;
    width: 10em;
  }
  @-webkit-keyframes bounce {
      0% {
        bottom: 60px;
        opacity: 0.5;
      }
      60% {
        bottom: 100px;
        color: ${GREY};
        opacity: 0.8;
      }
      100% {
        bottom: 60px;
        opacity: 1;
      }
  }
  .arrow {
        position: relative;
        font-size: 5em;
        color: ${GREY};
        animation: bounce 1s infinite
  }
`

function template (data) {
	return yo`
		<div>
    <img src="${data.avatar_url}">
      <h1>${data.name}</h1>
    	<h3>${data.bio}</h3>
      <div>
        <i class="${css.arrow} fa fa-caret-down" aria-hidden="true"></i>
      </div>
      ${portfolioComponent()}
      ${textboxComponent()}
			${footerComponent()}
   	</div>
	`
}


/*--------------------------------------------------------------------------------
  PORTFOLIO COMPONENT
--------------------------------------------------------------------------------*/
function portfolioComponent () {
	var css = csjs`
  	.portfolio {
      margin: 2em 0 2em 0;
      width: 100%;
    }
    .portfolioItem {
      width: 100%;
      padding-bottom: 200px;
    	background-color: ${BLUE};
      color: ${GREY};
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      transition: 2s;
    }
   .portfolioItem_isHover {
      width                : 100%;
      padding-bottom       : 200px;
    	background-color     : ${GREEN};
      color                : ${GREY};
      display              : flex;
      flex-direction       : column;
      align-items          : flex-start;
      cursor               : pointer;
      transition           : 2s;
    }
    .portfolioTitle {
      margin: 1.5em 35% 0em;
      padding: 0.3em;
      font-size: 3em;
      text-align: center;
      color: ${PINK};
      background-color: ${BLUE};
      border-radius: 4px;
      border: 4px solid ${GREY};
      transition: 2s;
    }
   .portfolioTitle_isHover {
      margin                : 2em 37% 2em;
      padding               : 0.5em;
      font-size             : 3em;
      color                 : ${YELLOW};
      background-color      : ${GREEN};
      border-radius         : 4px;
      border                : 8px solid ${GREY};
      transition            : 2s;
    }
    .portfolioBody {
      margin: 0 10em 5em;
      text-align: left;
      line-height: 1.2em;
      font-size: 1.5em;
      color: ${BLUE};
      transition: 2s;
    }
  .portfolioBody_isHover {
      margin               : 0 10em 5em;
      text-align           : left;
      font-size            : 1.5em;
      color                : ${WHITE};
      transition           : 2s;
    }

  `
  function template () {
    return yo`
    <div onmouseover=${hoverPortfolio}>
      <div class="${css.portfolio}">
        <div class="${css.portfolioItem}">
          <div class="${css.portfolioTitle}">
            Portfolio:
               <div>My quiz app </div>
           </div>
          <div class="${css.portfolioBody}">
            My quiz is a quiz app where users can answer
            Likert scale questions and compare their answers
            with others. It stores all the data in the database
            and enables an admin view of all the answers.
          </div>
        </div>
      </div>
    </div>
    `
  }

  var element = template()
  return element

 function hoverPortfolio () {
   	var element = this
    var newElement = yo`
      <div onmouseout=${unhoverPortfolio} onclick=${openNewTab}>
        <div class="${css.portfolio}">
          <div class="${css.portfolioItem_isHover}">
            <div class="${css.portfolioTitle_isHover}">
              Portfolio:
               <div>My quiz app </div>
            </div>
            <div class="${css.portfolioBody_isHover}">
              My quiz is a quiz app where users can answer
              Likert scale questions and compare their answers
              with others. It stores all the data in the database
              and enables an admin view of all the answers.
             </div>
          </div>
        </div>
      </div>
    `
    yo.update(element, newElement)
  }

  function unhoverPortfolio() {
    var element = this
    var newElement = template()
    yo.update(element, newElement)
  }
   function openNewTab() {
    var url = "https://kat005.github.io/quiz/"
    var tab = window.open(url, '_blank')
    tab.focus()
  }
}

/*--------------------------------------------------------------------------------
  TEXTBOX COMPONENT
--------------------------------------------------------------------------------*/

function textboxComponent () {
  var css = csjs`
  .textbox {
    color: ${GREY};
    margin: 6em 30%;
    font-size: 2em;
    line-height: 1.5em;
    text-align: justify;
  }
  `

  function template () {
    return yo`
      <div>
        <div class="${css.textbox}">
          Check out stuff I do and get in touch. We can meet for tea
          and talk about amazing products you want to build. I can
          help you make it work.
        </div>
      </div>
    `
  }

  var element = template()
	return element
}

/*--------------------------------------------------------------------------------
  FOOTER COMPONENT
--------------------------------------------------------------------------------*/
function footerComponent () {
	var css = csjs`
  	.container {
      display: flex;
      justify-content: center;
      margin-bottom: 2em;
    }
    .icon {
      padding: 1em;
      font-size: 35px;
      color: ${GREY};
    }
    .icon:hover {
      opacity: 0.5;
    }
    `

  function template () {
    return yo`
    <div class="${css.container}">
      <a href="https://github.com/kat005">
        <i class="${css.icon} fa fa-github" aria-hidden="true"></i>
      </a>
        <a href="mailto:katarinacalic005@gmail.com ">
        <i class="${css.icon} fa fa-envelope" aria-hidden="true"></i>
      </a>
      <a href=" https://www.facebook.com/people/%C4%86a-Lov/100005980755444">
       <i class="${css.icon} fa fa-facebook-square" aria-hidden="true"></i>
      </a>
    </div>
    `
  }

  var element = template()
  return element
}
/*-----------------------------------------------------------------------------
  HELPERS
-----------------------------------------------------------------------------*/
function activateScrollEffect (COLORS) {
  var docHeight = document.body.offsetHeight
  var colorAreaHeight = docHeight/COLORS.length
  window.addEventListener("scroll", function(event) {
    var position = document.body.scrollTop * 1.3
    var i = Math.floor(position/colorAreaHeight)
    var color    = COLORS[i]
    document.body.style.backgroundColor = color
    document.body.style.transition = "background-color 2s"
  })
}
