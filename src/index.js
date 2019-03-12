import React, { useState, useEffect } from "react";

export default function(imageArray) {
  const [isComplete, setIsComplete] = useState(false);
  function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function() {
        reject(new Error("Could not load image at " + url));
      };
      image.src = url;
    });
  }
  function loading(arr) {
    const q = arr.map(item => loadImageAsync(item));
    return Promise.all(q);
  }

  function handleStatusChange() {
    setIsComplete(true);
  }
  useEffect(() => {
    loading(imageArray)
      .then(() => {
        handleStatusChange();
      })
      .catch(() => {
        handleStatusChange();
      });
  });

  return isComplete;
}
