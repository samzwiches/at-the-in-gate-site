(function () {
  const { h, classNames } = window.AtigEditor.utils;

  function Button(props) {
    const { children, className, variant = "plain" } = props;
    const rest = { ...props };
    delete rest.children;
    delete rest.className;
    delete rest.variant;

    return h(
      "button",
      {
        ...rest,
        className: classNames("editor-button", `editor-button-${variant}`, className)
      },
      children
    );
  }

  function LinkButton(props) {
    const { children, className, variant = "plain" } = props;
    const rest = { ...props };
    delete rest.children;
    delete rest.className;
    delete rest.variant;

    return h(
      "a",
      {
        ...rest,
        className: classNames("editor-button", `editor-button-${variant}`, className)
      },
      children
    );
  }

  function Field({ label, children, hint }) {
    return h(
      "label",
      { className: "field" },
      h("span", { className: "field-label" }, label),
      children,
      hint ? h("small", { className: "field-hint" }, hint) : null
    );
  }

  function Input(props) {
    return h("input", { ...props, className: classNames("field-control", props.className) });
  }

  function Textarea(props) {
    return h("textarea", { ...props, className: classNames("field-control field-textarea", props.className) });
  }

  function Select(props) {
    const { children } = props;
    const rest = { ...props };
    delete rest.children;

    return h("select", { ...rest, className: classNames("field-control", props.className) }, children);
  }

  window.AtigEditor.components = window.AtigEditor.components || {};
  window.AtigEditor.components.ui = {
    Button,
    Field,
    Input,
    LinkButton,
    Select,
    Textarea
  };
})();
