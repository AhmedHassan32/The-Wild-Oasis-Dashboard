import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  // don't listen to these events on the bubbling phase(up) but on the capturing phase(down)
  // so basically as the event moves down the DOM Tree Not up the DOM Tree
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}

// The main problem is that the "click" event listener is attached to the root DOM element that closes our Modal so wherever we click on the page it will always execute and execute as LAST due to event bubbling!
// event handling phase : bubbling is default
// bubbling : from target dom element to root
// capturing: from root to target dom element
// PROPLEM : When we click on the button, the "click" event gets created and it travels towards the root.Since we have two "click" listeners attached 1 on button and 1 on html both will execute when we open the modal, first the open() on the button then second the close() on the html element therefore it looks like it remained closed.
// FIX: How Jonas fixed it is by changing the root element's (html's) event handling phase from bubbling to capturing. So when we click on the button element close() executes first and open() second.
