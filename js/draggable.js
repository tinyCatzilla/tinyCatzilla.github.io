function addDragListeners() {
    const dragElems = document.getElementsByClassName("draggable");
    
    for (let i = 0; i < dragElems.length; i++) {
      const dragElem = dragElems[i];
      const dragParent = dragElem.parentElement;
      let lastDragX = dragParent.offsetLeft;
      let lastDragY = dragParent.offsetTop;
    
      dragElem.addEventListener("mousedown", function(e) {
        // get the position of the element being dragged
        let dragX = e.clientX - lastDragX;
        let dragY = e.clientY - lastDragY;
    
        function drag(e) {
          const parentRect = dragParent.getBoundingClientRect();
          const newX = e.clientX - dragX;
          const newY = e.clientY - dragY;
          const maxX = document.body.scrollWidth - parentRect.width;
          const maxY = document.body.scrollHeight - parentRect.height;
          const clampedX = Math.max(0, Math.min(newX, maxX));
          const clampedY = Math.max(0, Math.min(newY, maxY));
          dragParent.style.left = clampedX + "px";
          dragParent.style.top = clampedY + "px";
    
          // update the last drag position
          lastDragX = clampedX;
          lastDragY = clampedY;
        }
    
        function endDrag(e) {
          document.removeEventListener("mousemove", drag);
          document.removeEventListener("mouseup", endDrag);
        }
    
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);
    
        e.preventDefault();
      });
    }
    
    // add a resize event listener to update the maximum position when the window is resized
    window.addEventListener("resize", function() {
      for (let i = 0; i < dragElems.length; i++) {
        const dragParent = dragElems[i].parentElement;
        const parentRect = dragParent.getBoundingClientRect();
        const maxX = window.innerWidth - parentRect.width;
        const maxY = window.innerHeight - parentRect.height;
        dragParent.style.left = Math.min(dragParent.offsetLeft, maxX) + "px";
        dragParent.style.top = Math.min(dragParent.offsetTop, maxY) + "px";
      }
    });
  }
  
  
  // Call the function on page load
  addDragListeners();
  
  // Create a MutationObserver to detect when new elements are added to the DOM
  const observer = new MutationObserver(function(mutationsList, observer) {
    // Loop through the mutations to see if any new elements were added
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Call the function again if new elements were added
        addDragListeners();
      }
    }
  });
  
  // Observe changes to the body element
  observer.observe(document.body, { childList: true, subtree: true });
  