(function () {
  const { h } = window.AtigEditor.utils;
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(h(React.StrictMode, null, h(window.AtigEditor.App)));
})();
