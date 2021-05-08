// userChrome.js
userChrome.import("/userChrome/win10_scrollbars.uc.js", "UChrm");

if (location == "chrome://browser/content/browser.xhtml") {
  (() => {
    let sbox = document.getElementById("sidebar-box");
    sbox.addEventListener("mouseenter", () => {sbox.classList.add("open");open_with_ctrl=false;})
    sbox.addEventListener("mouseleave", () => {if(!open_with_ctrl) sbox.classList.remove("open")})

    let ctrl_down = false;
    let timeoutId = null;
    let open_with_ctrl = false;
    document.body.addEventListener('keydown', function(e) {
      ctrl_down = e.ctrlKey;
      
      if (ctrl_down && e.key === "Tab") {
        sbox.classList.add("open");
      } else if (e.key === "Control") {
        timeoutId = setTimeout(function() {
          if (ctrl_down){
            sbox.classList.add("open");
            open_with_ctrl=true;
          }
        }, 1000);
      }
    })
    document.body.addEventListener('keyup', function(e) {
      if (e.key === "Control") {
        clearTimeout(timeoutId);
        ctrl_down = e.ctrlKey;
        if(open_with_ctrl)
            sbox.classList.remove("open");
      }
    })
  })()
}
